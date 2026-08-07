import { chromium } from "@playwright/test";
import { UiHelpers } from "@umbraco-cms/acceptance-test-helpers";
import { config as loadEnv } from "dotenv";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
loadEnv({ path: join(__dirname, "../.env") });
const outDir = join(__dirname, "../probe-output");
mkdirSync(outDir, { recursive: true });

const baseUrl = process.env.UMBRACO_URL ?? "http://localhost:40264";
const login = process.env.UMBRACO_USER_LOGIN ?? "admin@test.com";
const password = process.env.UMBRACO_USER_PASSWORD ?? "SecurePass1234";
process.env.URL = baseUrl;
process.env.UMBRACO_URL = baseUrl;

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const umbracoUi = new UiHelpers(page);

async function rootUi() {
  return page.locator("mediacurator-dashboard").evaluate((dashboard) => {
    const flow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    const root = flow?.shadowRoot;
    const roots = [...(root?.querySelectorAll('[data-node-id^="rule:"]') ?? [])].filter(
      (el) => !el.getAttribute("data-node-id")?.slice(5).includes("."),
    );
    return {
      rules: structuredClone(flow?.rules)?.map((r) => r.providerAlias),
      uiProviders: roots.map((el) => el.querySelector('[data-mark="mc:node-provider"]')?.value),
      uiLabels: roots.map((el) => {
        const sel = el.querySelector('[data-mark="mc:node-provider"]');
        return sel?.selectedOptions?.[0]?.textContent ?? sel?.value;
      }),
      transforms: roots.map((el) => el.closest(".react-flow__node")?.style?.transform),
    };
  });
}

try {
  await umbracoUi.goToBackOffice();
  await umbracoUi.login.enterEmail(login);
  await umbracoUi.login.enterPassword(password);
  await umbracoUi.login.clickLoginButton();
  await page.waitForTimeout(2000);
  await page.goto(`${baseUrl}/umbraco/section/media?cb=${Date.now()}`);
  await page.waitForTimeout(2500);
  await page.getByRole("tab", { name: "Media Curator" }).click();
  await page.waitForSelector("mediacurator-dashboard", { timeout: 60000 });

  // Fresh ruleset
  await page.getByLabel("Create ruleset").click();
  await page.waitForTimeout(1000);
  const nameHost = page.locator('[data-mark="mc:name"]');
  await nameHost.evaluate((el, value) => {
    el.value = value;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }, "Arrow Chrome Verify");
  await page.waitForTimeout(400);

  // Add two rules via canvas button
  const add = page.locator('[data-mark="mc:canvas-add"]');
  await add.click();
  await page.waitForTimeout(500);
  await add.click();
  await page.waitForTimeout(800);

  // Set providers via React-controlled selects using Playwright selectOption
  const first = page.locator('[data-node-id="rule:0"] [data-mark="mc:node-provider"]');
  const second = page.locator('[data-node-id="rule:1"] [data-mark="mc:node-provider"]');
  await first.selectOption("Umbricians.MediaCurator.Date");
  await page.waitForTimeout(300);
  await second.selectOption("Umbricians.MediaCurator.Alphabetical");
  await page.waitForTimeout(500);

  const before = await rootUi();

  // Click move down with real mouse
  const down = page.locator('[data-node-id="rule:0"] [data-mark="mc:node-move-down"]');
  await down.scrollIntoViewIfNeeded();
  const box = await down.boundingBox();
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(1000);
  const afterDown = await rootUi();

  // Click move up on second
  const up = page.locator('[data-node-id="rule:1"] [data-mark="mc:node-move-up"]');
  await up.scrollIntoViewIfNeeded();
  const upBox = await up.boundingBox();
  await page.mouse.click(upBox.x + upBox.width / 2, upBox.y + upBox.height / 2);
  await page.waitForTimeout(1000);
  const afterUp = await rootUi();

  const result = {
    before,
    afterDown,
    afterUp,
    downDataOk: JSON.stringify(before.rules) !== JSON.stringify(afterDown.rules),
    downUiOk: JSON.stringify(before.uiProviders) !== JSON.stringify(afterDown.uiProviders),
    downUiMatchesData: JSON.stringify(afterDown.rules) === JSON.stringify(afterDown.uiProviders),
    upDataOk: JSON.stringify(afterDown.rules) !== JSON.stringify(afterUp.rules),
    upUiOk: JSON.stringify(afterDown.uiProviders) !== JSON.stringify(afterUp.uiProviders),
    upUiMatchesData: JSON.stringify(afterUp.rules) === JSON.stringify(afterUp.uiProviders),
  };

  writeFileSync(join(outDir, "arrow-fresh.json"), JSON.stringify(result, null, 2));
  await page.screenshot({ path: join(outDir, "arrow-fresh.png"), fullPage: true });
  console.log(JSON.stringify(result, null, 2));

  if (!result.downDataOk || !result.downUiOk || !result.downUiMatchesData || !result.upDataOk || !result.upUiOk || !result.upUiMatchesData) {
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}
