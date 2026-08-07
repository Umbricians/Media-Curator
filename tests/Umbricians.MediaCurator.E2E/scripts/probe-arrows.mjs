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

try {
  await umbracoUi.goToBackOffice();
  await umbracoUi.login.enterEmail(login);
  await umbracoUi.login.enterPassword(password);
  await umbracoUi.login.clickLoginButton();
  await page.waitForTimeout(3000);
  await page.goto(`${baseUrl}/umbraco/section/media`);
  await page.waitForTimeout(3000);
  await page.getByRole("tab", { name: "Media Curator" }).click();
  await page.waitForSelector("mediacurator-dashboard", { timeout: 60000 });
  await page.getByLabel(/^Edit /).first().click();
  await page.waitForTimeout(4000);

  // Ensure 2+ root rules with distinct providers
  const setup = await page.locator("mediacurator-dashboard").evaluate(async (dashboard) => {
    const flow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    const root = flow?.shadowRoot;
    if (!flow || !root) return { error: "no flow" };

    const add = root.querySelector('[data-mark="mc:canvas-add"]');
    const rootRules = () =>
      [...root.querySelectorAll('[data-node-id^="rule:"]')].filter(
        (el) => !el.getAttribute("data-node-id")?.slice(5).includes("."),
      );

    while (rootRules().length < 2) {
      add?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await new Promise((r) => setTimeout(r, 300));
    }

    const nodes = rootRules();
    const select0 = nodes[0]?.querySelector('[data-mark="mc:node-provider"]');
    const select1 = nodes[1]?.querySelector('[data-mark="mc:node-provider"]');
    if (select0) {
      select0.value = "Umbricians.MediaCurator.Date";
      select0.dispatchEvent(new Event("change", { bubbles: true }));
    }
    if (select1) {
      select1.value = "Umbricians.MediaCurator.Alphabetical";
      select1.dispatchEvent(new Event("change", { bubbles: true }));
    }
    await new Promise((r) => setTimeout(r, 500));

    return {
      rulesBefore: structuredClone(flow.rules)?.map((r) => ({
        alias: r.providerAlias,
        children: (r.children ?? []).length,
      })),
      providers: rootRules().map((el) => ({
        id: el.getAttribute("data-node-id"),
        provider: el.querySelector('[data-mark="mc:node-provider"]')?.value,
      })),
    };
  });

  const arrowResult = await page.locator("mediacurator-dashboard").evaluate(async (dashboard) => {
    const flow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    const root = flow?.shadowRoot;
    if (!flow || !root) return { error: "no flow" };

    const first = root.querySelector('[data-node-id="rule:0"]');
    const btn = first?.querySelector('button[title="Move down"]');
    const before = structuredClone(flow.rules)?.map((r) => r.providerAlias);

    // Native click inside shadow
    btn?.click();
    await new Promise((r) => setTimeout(r, 500));
    const afterClick = structuredClone(flow.rules)?.map((r) => r.providerAlias);

    // Also try dispatching
    btn?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
    await new Promise((r) => setTimeout(r, 500));
    const afterDispatch = structuredClone(flow.rules)?.map((r) => r.providerAlias);

    // Inspect button and path data from react fiber if possible
    const nodeEl = first;
    const reactKeys = nodeEl ? Object.keys(nodeEl).filter((k) => k.startsWith("__react")) : [];

    return {
      before,
      afterClick,
      afterDispatch,
      btnExists: !!btn,
      btnClass: btn?.className ?? null,
      rulesProp: structuredClone(flow.rules)?.map((r) => ({
        alias: r.providerAlias,
        children: (r.children ?? []).length,
      })),
      reactKeys,
    };
  });

  // Measure estimated vs actual heights and gaps
  const layout = await page.locator("mediacurator-dashboard").evaluate((dashboard) => {
    const root = dashboard.shadowRoot?.querySelector("mc-rule-flow")?.shadowRoot;
    if (!root) return null;
    return [...root.querySelectorAll(".react-flow__node")].map((el) => {
      const rect = el.getBoundingClientRect();
      const style = el.style.transform;
      return {
        id: el.getAttribute("data-id"),
        transform: style,
        screenH: Math.round(rect.height),
        screenTop: Math.round(rect.top),
      };
    });
  });

  const result = { setup, arrowResult, layout };
  writeFileSync(join(outDir, "arrow-debug.json"), JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
