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

const browser = await chromium.launch({ channel: "chrome", headless: false, args: ["--window-size=1440,900"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const umbracoUi = new UiHelpers(page);

async function snap(label) {
  return page.locator("mediacurator-dashboard").evaluate((dashboard, label) => {
    const flow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    const root = flow?.shadowRoot;
    const roots = [...(root?.querySelectorAll('[data-node-id^="rule:"]') ?? [])].filter(
      (el) => !el.getAttribute("data-node-id")?.slice(5).includes("."),
    );
    const scripts = [...document.querySelectorAll("script")].map((s) => s.src).filter((s) => s.includes("MediaCurator"));
    return {
      label,
      scripts,
      rules: structuredClone(flow?.rules)?.map((r) => ({
        alias: r.providerAlias,
        fallback: r.fallback,
      })),
      ui: roots.map((el) => ({
        id: el.getAttribute("data-node-id"),
        provider: el.querySelector('[data-mark="mc:node-provider"]')?.value,
        fallback: el.querySelector('[data-mark="mc:node-fallback"]')?.value,
        transform: el.closest(".react-flow__node")?.style?.transform,
      })),
    };
  }, label);
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
  await page.getByLabel(/^Edit /).first().click();
  await page.waitForTimeout(4000);

  // Two distinct root rules
  await page.locator("mediacurator-dashboard").evaluate(async (dashboard) => {
    const root = dashboard.shadowRoot?.querySelector("mc-rule-flow")?.shadowRoot;
    if (!root) return;
    const add = root.querySelector('[data-mark="mc:canvas-add"]');
    const roots = () =>
      [...root.querySelectorAll('[data-node-id^="rule:"]')].filter(
        (el) => !el.getAttribute("data-node-id")?.slice(5).includes("."),
      );
    while (roots().length < 2) {
      add?.click();
      await new Promise((r) => setTimeout(r, 250));
    }
    const aliases = ["Umbricians.MediaCurator.Date", "Umbricians.MediaCurator.Alphabetical"];
    roots().forEach((el, i) => {
      const sel = el.querySelector('[data-mark="mc:node-provider"]');
      if (sel && aliases[i]) {
        sel.value = aliases[i];
        sel.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  });
  await page.waitForTimeout(1000);

  const before = await snap("before");

  // Scroll first move-down into view and click with real mouse
  const btn = page.locator('[data-node-id="rule:0"] [data-mark="mc:node-move-down"]').first();
  await btn.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const box = await btn.boundingBox();
  if (!box) throw new Error("move-down button has no box");
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(1000);
  const afterDown = await snap("after-down");

  const upBtn = page.locator('[data-node-id="rule:1"] [data-mark="mc:node-move-up"]').first();
  await upBtn.scrollIntoViewIfNeeded();
  const upBox = await upBtn.boundingBox();
  if (!upBox) throw new Error("move-up button has no box");
  await page.mouse.click(upBox.x + upBox.width / 2, upBox.y + upBox.height / 2);
  await page.waitForTimeout(1000);
  const afterUp = await snap("after-up");

  // Same-provider case
  await page.locator("mediacurator-dashboard").evaluate((dashboard) => {
    const root = dashboard.shadowRoot?.querySelector("mc-rule-flow")?.shadowRoot;
    if (!root) return;
    const roots = [...root.querySelectorAll('[data-node-id^="rule:"]')].filter(
      (el) => !el.getAttribute("data-node-id")?.slice(5).includes("."),
    );
    roots.forEach((el) => {
      const sel = el.querySelector('[data-mark="mc:node-provider"]');
      if (sel) {
        sel.value = "Umbricians.MediaCurator.Alphabetical";
        sel.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  });
  await page.waitForTimeout(600);
  await page.locator("mediacurator-dashboard").evaluate((dashboard) => {
    const root = dashboard.shadowRoot?.querySelector("mc-rule-flow")?.shadowRoot;
    if (!root) return;
    const roots = [...root.querySelectorAll('[data-node-id^="rule:"]')].filter(
      (el) => !el.getAttribute("data-node-id")?.slice(5).includes("."),
    );
    const fallbacks = ["unsorted", "stop"];
    roots.forEach((el, i) => {
      const fb = el.querySelector('[data-mark="mc:node-fallback"]');
      if (fb) {
        fb.value = fallbacks[i] ?? "skip";
        fb.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  });
  await page.waitForTimeout(600);
  const sameBefore = await snap("same-before");
  const sameDown = page.locator('[data-node-id="rule:0"] [data-mark="mc:node-move-down"]').first();
  const sameBox = await sameDown.boundingBox();
  await page.mouse.click(sameBox.x + sameBox.width / 2, sameBox.y + sameBox.height / 2);
  await page.waitForTimeout(1000);
  const sameAfter = await snap("same-after");

  const result = {
    beforeAliases: before.rules?.map((r) => r.alias),
    afterDownAliases: afterDown.rules?.map((r) => r.alias),
    afterUpAliases: afterUp.rules?.map((r) => r.alias),
    downWorked: JSON.stringify(before.rules?.map((r) => r.alias)) !== JSON.stringify(afterDown.rules?.map((r) => r.alias)),
    upWorked: JSON.stringify(afterDown.rules?.map((r) => r.alias)) !== JSON.stringify(afterUp.rules?.map((r) => r.alias)),
    sameBeforeFallbacks: sameBefore.rules?.map((r) => r.fallback),
    sameAfterFallbacks: sameAfter.rules?.map((r) => r.fallback),
    sameProviderWorked:
      JSON.stringify(sameBefore.rules?.map((r) => r.fallback)) !==
      JSON.stringify(sameAfter.rules?.map((r) => r.fallback)),
    scripts: afterDown.scripts,
    uiAfterDown: afterDown.ui,
    uiSameAfter: sameAfter.ui,
  };

  writeFileSync(join(outDir, "arrow-chrome.json"), JSON.stringify({ ...result, before, afterDown, afterUp, sameBefore, sameAfter }, null, 2));
  await page.screenshot({ path: join(outDir, "arrow-chrome.png"), fullPage: true });
  console.log(JSON.stringify(result, null, 2));

  if (!result.downWorked || !result.upWorked || !result.sameProviderWorked) {
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}
