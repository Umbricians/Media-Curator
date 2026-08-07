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
  await page.getByLabel(/^Edit /).first().click();
  await page.waitForTimeout(4000);

  // Ensure two distinct root rules
  await flowEval(async (dashboard) => {
    const flow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    const root = flow?.shadowRoot;
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
    const nodes = roots();
    const s0 = nodes[0]?.querySelector('[data-mark="mc:node-provider"]');
    const s1 = nodes[1]?.querySelector('[data-mark="mc:node-provider"]');
    if (s0) {
      s0.value = "Umbricians.MediaCurator.Date";
      s0.dispatchEvent(new Event("change", { bubbles: true }));
    }
    if (s1) {
      s1.value = "Umbricians.MediaCurator.Alphabetical";
      s1.dispatchEvent(new Event("change", { bubbles: true }));
    }
    await new Promise((r) => setTimeout(r, 500));
  });

  const before = await flowEval((dashboard) => {
    const flow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    return {
      rules: structuredClone(flow?.rules)?.map((r) => r.providerAlias),
      dashboardRules: structuredClone(dashboard._editing?.rules)?.map((r) => r.providerAlias),
      bundleHint: [...(flow?.shadowRoot?.querySelectorAll("script") ?? [])].length,
      moveDownCount: flow?.shadowRoot?.querySelectorAll('[data-mark="mc:node-move-down"]').length ?? 0,
    };
  });

  // Real mouse click via coordinates + elementFromPoint diagnostics
  const hit = await flowEval((dashboard) => {
    const flow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    const root = flow?.shadowRoot;
    const btn = root?.querySelector('[data-node-id="rule:0"] [data-mark="mc:node-move-down"]');
    if (!btn) return { error: "no button" };
    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const topEl = document.elementFromPoint(x, y);
    const path = [];
    let cur = topEl;
    for (let i = 0; i < 8 && cur; i++) {
      path.push({
        tag: cur.tagName,
        id: cur.id || null,
        className: typeof cur.className === "string" ? cur.className.slice(0, 80) : null,
        mark: cur.getAttribute?.("data-mark") ?? null,
      });
      cur = cur.parentElement;
    }
    return {
      x,
      y,
      btnRect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      topTag: topEl?.tagName ?? null,
      topMark: topEl?.getAttribute?.("data-mark") ?? null,
      topClass: typeof topEl?.className === "string" ? topEl.className.slice(0, 100) : null,
      path,
      btnDisabled: btn.disabled,
      btnPointerEvents: getComputedStyle(btn).pointerEvents,
    };
  });

  // Click with Playwright at those coordinates (goes through real hit testing)
  if (hit.x != null) {
    await page.mouse.click(hit.x, hit.y);
    await page.waitForTimeout(800);
  }

  const afterMouse = await flowEval((dashboard) => {
    const flow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    return {
      flowRules: structuredClone(flow?.rules)?.map((r) => r.providerAlias),
      dashboardRules: structuredClone(dashboard._editing?.rules)?.map((r) => r.providerAlias),
      providersOnNodes: [...(flow?.shadowRoot?.querySelectorAll('[data-node-id^="rule:"]') ?? [])]
        .filter((el) => !el.getAttribute("data-node-id")?.slice(5).includes("."))
        .map((el) => ({
          id: el.getAttribute("data-node-id"),
          provider: el.querySelector('[data-mark="mc:node-provider"]')?.value,
        })),
    };
  });

  // Also try Playwright locator click (no force)
  await page.locator('[data-mark="mc:node-move-up"]').first().click({ timeout: 5000 }).catch((e) => ({ error: String(e) }));
  await page.waitForTimeout(800);

  const afterLocator = await flowEval((dashboard) => {
    const flow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    return {
      flowRules: structuredClone(flow?.rules)?.map((r) => r.providerAlias),
      dashboardRules: structuredClone(dashboard._editing?.rules)?.map((r) => r.providerAlias),
    };
  });

  // Direct React props invoke if available
  const direct = await flowEval((dashboard) => {
    const flow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    const root = flow?.shadowRoot;
    const btn = root?.querySelector('[data-node-id="rule:0"] [data-mark="mc:node-move-down"]');
    const beforeRules = structuredClone(flow?.rules)?.map((r) => r.providerAlias);
    btn?.click();
    return { beforeRules, afterRules: structuredClone(flow?.rules)?.map((r) => r.providerAlias) };
  });
  await page.waitForTimeout(500);
  const afterDirect = await flowEval((dashboard) => {
    const flow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    return {
      flowRules: structuredClone(flow?.rules)?.map((r) => r.providerAlias),
      dashboardRules: structuredClone(dashboard._editing?.rules)?.map((r) => r.providerAlias),
    };
  });

  const result = { before, hit, afterMouse, afterLocator, direct, afterDirect };
  writeFileSync(join(outDir, "arrow-hit.json"), JSON.stringify(result, null, 2));
  await page.screenshot({ path: join(outDir, "arrow-hit.png"), fullPage: true });
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
