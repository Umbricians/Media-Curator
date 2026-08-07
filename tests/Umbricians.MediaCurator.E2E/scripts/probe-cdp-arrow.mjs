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

// Connect to the Chrome instance with remote debugging (Chrome MCP stand-in)
const browser = await chromium.connectOverCDP("http://127.0.0.1:9222");
const context = browser.contexts()[0] ?? (await browser.newContext());
const page = context.pages().find((p) => p.url() !== "about:blank") ?? (await context.newPage());
await page.setViewportSize({ width: 1440, height: 900 });

const umbracoUi = new UiHelpers(page);

async function snap(label) {
  return page.locator("mediacurator-dashboard").evaluate((dashboard, label) => {
    const flow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    const root = flow?.shadowRoot;
    const scriptSrc = [...document.querySelectorAll("script")]
      .map((s) => s.src)
      .find((s) => s.includes("mediacurator-dashboard"));
    const roots = [...(root?.querySelectorAll('[data-node-id^="rule:"]') ?? [])].filter(
      (el) => !el.getAttribute("data-node-id")?.slice(5).includes("."),
    );
    return {
      label,
      bundle: scriptSrc ?? null,
      mediaCuratorJs: [...document.querySelectorAll("script")].map((s) => s.src).filter((s) => s.includes("MediaCurator")),
      rules: structuredClone(flow?.rules)?.map((r) => ({
        alias: r.providerAlias,
        fallback: r.fallback,
        children: (r.children ?? []).length,
      })),
      ui: roots.map((el) => ({
        id: el.getAttribute("data-node-id"),
        provider: el.querySelector('[data-mark="mc:node-provider"]')?.value,
        fallback: el.querySelector('[data-mark="mc:node-fallback"]')?.value,
        y: el.closest(".react-flow__node")?.style?.transform,
      })),
      moveDownButtons: root?.querySelectorAll('[data-mark="mc:node-move-down"]').length ?? 0,
    };
  }, label);
}

try {
  await umbracoUi.goToBackOffice();
  await umbracoUi.login.enterEmail(login);
  await umbracoUi.login.enterPassword(password);
  await umbracoUi.login.clickLoginButton();
  await page.waitForTimeout(2000);
  await page.goto(`${baseUrl}/umbraco/section/media?cb=${Date.now()}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  await page.getByRole("tab", { name: "Media Curator" }).click();
  await page.waitForSelector("mediacurator-dashboard", { timeout: 60000 });
  await page.getByLabel(/^Edit /).first().click();
  await page.waitForTimeout(4000);

  // Instrument React click path
  await page.locator("mediacurator-dashboard").evaluate((dashboard) => {
    const flow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    window.__mcArrowLog = [];
    if (!flow) return;
    const original = flow.rules;
    Object.defineProperty(flow, "__probe", { value: true, configurable: true });
  });

  // Make two distinct root siblings
  await page.locator("mediacurator-dashboard").evaluate(async (dashboard) => {
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
    // Distinct providers so order is obvious
    const aliases = ["Umbricians.MediaCurator.Date", "Umbricians.MediaCurator.Alphabetical"];
    nodes.forEach((el, i) => {
      const sel = el.querySelector('[data-mark="mc:node-provider"]');
      if (sel && aliases[i]) {
        sel.value = aliases[i];
        sel.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  });
  await page.waitForTimeout(1000);

  const before = await snap("before");

  // Real mouse click at button center through Chrome
  const coords = await page.locator("mediacurator-dashboard").evaluate((dashboard) => {
    const btn = dashboard.shadowRoot
      ?.querySelector("mc-rule-flow")
      ?.shadowRoot?.querySelector('[data-node-id="rule:0"] [data-mark="mc:node-move-down"]');
    if (!btn) return null;
    const r = btn.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height };
  });

  let hit = null;
  if (coords) {
    hit = await page.evaluate(({ x, y }) => {
      const el = document.elementFromPoint(x, y);
      return {
        tag: el?.tagName,
        mark: el?.getAttribute?.("data-mark"),
        className: typeof el?.className === "string" ? el.className.slice(0, 120) : null,
      };
    }, coords);
    await page.mouse.click(coords.x, coords.y);
    await page.waitForTimeout(1000);
  }

  const afterClick = await snap("after-mouse-click");

  // Also click via locator piercing shadow
  await page.locator('[data-mark="mc:node-move-up"]').nth(1).click({ timeout: 5000 }).catch((e) => e.message);
  await page.waitForTimeout(1000);
  const afterUp = await snap("after-up-on-second");

  const result = {
    coords,
    hit,
    before,
    afterClick,
    afterUp,
    orderChanged:
      JSON.stringify(before.rules?.map((r) => r.alias)) !==
      JSON.stringify(afterClick.rules?.map((r) => r.alias)),
    restored:
      JSON.stringify(before.rules?.map((r) => r.alias)) ===
      JSON.stringify(afterUp.rules?.map((r) => r.alias)),
  };
  writeFileSync(join(outDir, "cdp-arrow.json"), JSON.stringify(result, null, 2));
  await page.screenshot({ path: join(outDir, "cdp-arrow.png"), fullPage: true });
  console.log(JSON.stringify(result, null, 2));
} catch (err) {
  console.error("FAIL", err);
  await page.screenshot({ path: join(outDir, "cdp-arrow-fail.png"), fullPage: true }).catch(() => {});
  throw err;
} finally {
  // Keep Chrome open; just disconnect
  await browser.close();
}
