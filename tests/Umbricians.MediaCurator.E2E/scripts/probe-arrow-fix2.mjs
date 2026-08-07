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

async function rootSnapshot() {
  return flowEval((dashboard) => {
    const flow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    const root = flow?.shadowRoot;
    const roots = [...(root?.querySelectorAll('[data-node-id^="rule:"]') ?? [])].filter(
      (el) => !el.getAttribute("data-node-id")?.slice(5).includes("."),
    );
    return {
      rules: structuredClone(flow?.rules)?.map((r, i) => ({
        i,
        alias: r.providerAlias,
        fallback: r.fallback,
        format: r.settings?.format,
        children: (r.children ?? []).length,
      })),
      ui: roots.map((el) => ({
        id: el.getAttribute("data-node-id"),
        provider: el.querySelector('[data-mark="mc:node-provider"]')?.value,
        fallback: el.querySelector('[data-mark="mc:node-fallback"]')?.value,
        transform: el.closest(".react-flow__node")?.style?.transform,
      })),
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
  await page.waitForTimeout(3000);
  await page.getByRole("tab", { name: "Media Curator" }).click();
  await page.waitForSelector("mediacurator-dashboard", { timeout: 60000 });
  await page.getByLabel(/^Edit /).first().click();
  await page.waitForTimeout(4000);

  // Ensure two root rules with same provider but distinct fallbacks so order is observable
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
    for (const el of nodes) {
      const provider = el.querySelector('[data-mark="mc:node-provider"]');
      if (provider) {
        provider.value = "Umbricians.MediaCurator.Alphabetical";
        provider.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
    await new Promise((r) => setTimeout(r, 400));
    const refreshed = roots();
    const fallbacks = ["unsorted", "stop"];
    refreshed.forEach((el, i) => {
      const fallback = el.querySelector('[data-mark="mc:node-fallback"]');
      if (fallback) {
        fallback.value = fallbacks[i] ?? "skip";
        fallback.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  });
  await page.waitForTimeout(800);

  const before = await rootSnapshot();

  // User-like Playwright click on Move down
  await page.locator('[data-node-id="rule:0"] [data-mark="mc:node-move-down"]').first().click();
  await page.waitForTimeout(900);
  const afterDown = await rootSnapshot();

  // Move up on the new first (should restore)
  await page.locator('[data-node-id="rule:0"] [data-mark="mc:node-move-up"]').first().click();
  await page.waitForTimeout(900);
  const afterUp = await rootSnapshot();

  // Drag then arrow — catches stuck isDragging
  const handle = page.locator('[data-node-id="rule:1"] .mc-rule-flow-drag-handle').first();
  const box = await handle.boundingBox();
  if (box) {
    const start = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
    await page.mouse.move(start.x + 40, start.y - 40, { steps: 8 });
    await page.mouse.up();
    await page.waitForTimeout(500);
  }
  const afterDrag = await rootSnapshot();
  await page.locator('[data-node-id="rule:0"] [data-mark="mc:node-move-down"]').first().click();
  await page.waitForTimeout(900);
  const afterDragThenArrow = await rootSnapshot();

  const result = {
    beforeFallbacks: before.rules.map((r) => r.fallback),
    afterDownFallbacks: afterDown.rules.map((r) => r.fallback),
    afterUpFallbacks: afterUp.rules.map((r) => r.fallback),
    afterDragThenArrowFallbacks: afterDragThenArrow.rules.map((r) => r.fallback),
    downWorked: JSON.stringify(before.rules.map((r) => r.fallback)) !== JSON.stringify(afterDown.rules.map((r) => r.fallback)),
    upWorked: JSON.stringify(afterDown.rules.map((r) => r.fallback)) !== JSON.stringify(afterUp.rules.map((r) => r.fallback)),
    afterDragWorked:
      JSON.stringify(afterDrag.rules.map((r) => r.fallback)) !==
      JSON.stringify(afterDragThenArrow.rules.map((r) => r.fallback)),
    uiAfterDown: afterDown.ui.map((u) => ({ id: u.id, fallback: u.fallback, transform: u.transform })),
    uiAfterDragThenArrow: afterDragThenArrow.ui.map((u) => ({
      id: u.id,
      fallback: u.fallback,
      transform: u.transform,
    })),
    before,
    afterDown,
    afterUp,
    afterDrag,
    afterDragThenArrow,
  };

  writeFileSync(join(outDir, "arrow-fix2.json"), JSON.stringify(result, null, 2));
  await page.screenshot({ path: join(outDir, "arrow-fix2.png"), fullPage: true });
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
