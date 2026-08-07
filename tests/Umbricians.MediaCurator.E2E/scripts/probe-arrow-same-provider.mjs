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

const baseUrl = process.env.UMBRACO_URL ?? process.env.URL ?? "http://localhost:40264";
const login = process.env.UMBRACO_USER_LOGIN ?? "admin@test.com";
const password = process.env.UMBRACO_USER_PASSWORD ?? "SecurePass1234";
process.env.URL = baseUrl;
process.env.UMBRACO_URL = baseUrl;

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const umbracoUi = new UiHelpers(page);

async function flowEval(fn) {
  return page.locator("mediacurator-dashboard").evaluate(fn);
}

try {
  await umbracoUi.goToBackOffice();
  await umbracoUi.login.enterEmail(login);
  await umbracoUi.login.enterPassword(password);
  await umbracoUi.login.clickLoginButton();
  await page.waitForTimeout(2000);
  await page.goto(`${baseUrl}/umbraco/section/media?v=${Date.now()}`);
  await page.waitForTimeout(3000);
  await page.getByRole("tab", { name: "Media Curator" }).click();
  await page.waitForSelector("mediacurator-dashboard", { timeout: 60000 });

  // Create a fresh ruleset so we control the tree
  await page.getByLabel("Create ruleset").click();
  await page.waitForTimeout(1000);
  await page.locator('[data-mark="mc:name"]').locator("input, #mc-name").first().fill("Arrow Probe");
  await page.waitForTimeout(500);

  // Add three root rules, set distinct settings so we can tell them apart even with same provider
  await flowEval(async (dashboard) => {
    const flow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    const root = flow?.shadowRoot;
    if (!root) return;
    const add = root.querySelector('[data-mark="mc:canvas-add"]');
    for (let i = 0; i < 3; i++) {
      add?.click();
      await new Promise((r) => setTimeout(r, 300));
    }
  });
  await page.waitForTimeout(1000);

  // Set all to Date with different formats so structureKey may or may not change
  await flowEval((dashboard) => {
    const root = dashboard.shadowRoot?.querySelector("mc-rule-flow")?.shadowRoot;
    if (!root) return;
    const roots = [...root.querySelectorAll('[data-node-id^="rule:"]')].filter(
      (el) => !el.getAttribute("data-node-id")?.slice(5).includes("."),
    );
    const formats = ["yyyy", "yyyy/MM", "yyyy/MM/dd"];
    roots.forEach((el, i) => {
      const provider = el.querySelector('[data-mark="mc:node-provider"]');
      if (provider) {
        provider.value = "Umbricians.MediaCurator.Date";
        provider.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  });
  await page.waitForTimeout(800);

  await flowEval((dashboard) => {
    const root = dashboard.shadowRoot?.querySelector("mc-rule-flow")?.shadowRoot;
    if (!root) return;
    const roots = [...root.querySelectorAll('[data-node-id^="rule:"]')].filter(
      (el) => !el.getAttribute("data-node-id")?.slice(5).includes("."),
    );
    const formats = ["yyyy", "yyyy/MM", "yyyy/MM/dd"];
    roots.forEach((el, i) => {
      const format = el.querySelector('[data-mark="mc:setting-format"]');
      if (format) {
        format.value = formats[i];
        format.dispatchEvent(new Event("input", { bubbles: true }));
        format.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  });
  await page.waitForTimeout(800);

  const before = await flowEval((dashboard) => {
    const flow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    const root = flow?.shadowRoot;
    const roots = [...(root?.querySelectorAll('[data-node-id^="rule:"]') ?? [])].filter(
      (el) => !el.getAttribute("data-node-id")?.slice(5).includes("."),
    );
    return {
      rules: structuredClone(flow?.rules)?.map((r) => ({
        alias: r.providerAlias,
        format: r.settings?.format,
      })),
      ui: roots.map((el) => ({
        id: el.getAttribute("data-node-id"),
        format: el.querySelector('[data-mark="mc:setting-format"]')?.value,
        transform: el.closest(".react-flow__node")?.style?.transform,
      })),
    };
  });

  // Click move-down on first root via Playwright locator (user-like)
  const btn = page.locator('[data-node-id="rule:0"] [data-mark="mc:node-move-down"]').first();
  const clickResult = await btn.click({ timeout: 10000 }).then(() => ({ ok: true })).catch((e) => ({ ok: false, error: String(e) }));
  await page.waitForTimeout(1000);

  const after = await flowEval((dashboard) => {
    const flow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    const root = flow?.shadowRoot;
    const roots = [...(root?.querySelectorAll('[data-node-id^="rule:"]') ?? [])].filter(
      (el) => !el.getAttribute("data-node-id")?.slice(5).includes("."),
    );
    return {
      rules: structuredClone(flow?.rules)?.map((r) => ({
        alias: r.providerAlias,
        format: r.settings?.format,
      })),
      ui: roots.map((el) => ({
        id: el.getAttribute("data-node-id"),
        format: el.querySelector('[data-mark="mc:setting-format"]')?.value,
        transform: el.closest(".react-flow__node")?.style?.transform,
      })),
    };
  });

  // Second click via native button.click inside shadow
  await flowEval((dashboard) => {
    const btn = dashboard.shadowRoot
      ?.querySelector("mc-rule-flow")
      ?.shadowRoot?.querySelector('[data-node-id="rule:0"] [data-mark="mc:node-move-down"]');
    btn?.click();
  });
  await page.waitForTimeout(800);

  const afterNative = await flowEval((dashboard) => {
    const flow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    return {
      rules: structuredClone(flow?.rules)?.map((r) => ({
        alias: r.providerAlias,
        format: r.settings?.format,
      })),
    };
  });

  const result = {
    clickResult,
    before,
    after,
    afterNative,
    dataChanged: JSON.stringify(before.rules) !== JSON.stringify(after.rules),
    uiFormatOrderChanged: JSON.stringify(before.ui.map((u) => u.format)) !== JSON.stringify(after.ui.map((u) => u.format)),
  };
  writeFileSync(join(outDir, "arrow-same-provider.json"), JSON.stringify(result, null, 2));
  await page.screenshot({ path: join(outDir, "arrow-same-provider.png"), fullPage: true });
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
