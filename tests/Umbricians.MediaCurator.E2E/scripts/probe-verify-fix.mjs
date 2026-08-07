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

function parseY(transform) {
  const match = /translate\([^,]+,\s*([-0-9.]+)px\)/.exec(transform ?? "");
  return match ? Number(match[1]) : null;
}

async function snapshot(label) {
  return page.locator("mediacurator-dashboard").evaluate((dashboard, label) => {
    const flow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    const root = flow?.shadowRoot;
    if (!root) return { label, error: "no shadow" };
    const nodes = [...root.querySelectorAll(".react-flow__node")].map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        id: el.getAttribute("data-id"),
        transform: el.style.transform,
        height: Math.round(rect.height),
        top: Math.round(rect.top),
        provider: el.querySelector('[data-mark="mc:node-provider"]')?.value ?? null,
      };
    });
    return {
      label,
      rules: structuredClone(flow.rules)?.map((r) => r.providerAlias),
      nodes,
    };
  }, label);
}

try {
  await umbracoUi.goToBackOffice();
  await umbracoUi.login.enterEmail(login);
  await umbracoUi.login.enterPassword(password);
  await umbracoUi.login.clickLoginButton();
  await page.waitForTimeout(2000);
  // Bust cache so rebuilt App_Plugins load
  await page.goto(`${baseUrl}/umbraco/section/media?v=${Date.now()}`);
  await page.waitForTimeout(3000);
  await page.getByRole("tab", { name: "Media Curator" }).click();
  await page.waitForSelector("mediacurator-dashboard", { timeout: 60000 });
  await page.getByLabel(/^Edit /).first().click();
  await page.waitForTimeout(4000);

  // Distinct providers on two root rules
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
      await new Promise((r) => setTimeout(r, 300));
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
    await new Promise((r) => setTimeout(r, 400));
  });

  const before = await snapshot("before");

  // Arrow: Playwright click without force (should work after overlay fix)
  const moveDown = page.locator('[data-mark="mc:node-move-down"]').first();
  await moveDown.click({ timeout: 10000 });
  await page.waitForTimeout(700);
  const afterArrow = await snapshot("after-arrow");

  // Small free drag — should keep position, not snap back
  const target = page.locator('[data-node-id="rule:0"]').first();
  const handle = target.locator(".mc-rule-flow-drag-handle");
  const box = await handle.boundingBox();
  let afterSmallDrag = null;
  let midSmall = null;
  if (box) {
    const start = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
    await page.mouse.move(start.x + 100, start.y + 60, { steps: 12 });
    midSmall = await snapshot("mid-small-drag");
    await page.mouse.up();
    await page.waitForTimeout(700);
    afterSmallDrag = await snapshot("after-small-drag");
  }

  // Large reorder drag of second root upward
  const second = page.locator('[data-node-id="rule:1"]').first();
  const handle2 = second.locator(".mc-rule-flow-drag-handle");
  const box2 = await handle2.boundingBox();
  let afterReorderDrag = null;
  if (box2) {
    const start = { x: box2.x + box2.width / 2, y: box2.y + box2.height / 2 };
    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
    await page.mouse.move(start.x, start.y - 320, { steps: 20 });
    await page.mouse.up();
    await page.waitForTimeout(800);
    afterReorderDrag = await snapshot("after-reorder-drag");
  }

  const yBefore = before.nodes.find((n) => n.id === "rule:0");
  const yMid = midSmall?.nodes.find((n) => n.id === "rule:0");
  const yAfter = afterSmallDrag?.nodes.find((n) => n.id === "rule:0");

  const result = {
    arrowChangedOrder: JSON.stringify(before.rules) !== JSON.stringify(afterArrow.rules),
    beforeRules: before.rules,
    afterArrowRules: afterArrow.rules,
    smallDragKeptOffset:
      yAfter && yBefore
        ? Math.abs((parseY(yAfter.transform) ?? 0) - (parseY(yBefore.transform) ?? 0)) > 20
        : false,
    smallDragY: {
      before: parseY(yBefore?.transform),
      mid: parseY(yMid?.transform),
      after: parseY(yAfter?.transform),
    },
    before,
    afterArrow,
    midSmall,
    afterSmallDrag,
    afterReorderDrag,
  };

  writeFileSync(join(outDir, "verify-fix.json"), JSON.stringify(result, null, 2));
  await page.screenshot({ path: join(outDir, "verify-fix.png"), fullPage: true });
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
