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

const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push(err.message));

async function nodeSnapshot(label) {
  return page.locator("mediacurator-dashboard").evaluate((dashboard, label) => {
    const ruleFlow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    const root = ruleFlow?.shadowRoot;
    if (!root) return { label, error: "no shadow" };

    const nodes = [...root.querySelectorAll(".react-flow__node")].map((el) => {
      const rect = el.getBoundingClientRect();
      const provider = el.querySelector('[data-mark="mc:node-provider"]');
      return {
        id: el.getAttribute("data-id"),
        className: el.className,
        top: Math.round(rect.top),
        left: Math.round(rect.left),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        provider: provider?.value ?? null,
        transform: el.style.transform || getComputedStyle(el).transform,
      };
    });

    return { label, nodes };
  }, label);
}

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

  const editButton = page.getByLabel(/^Edit /).first();
  await editButton.click();
  await page.waitForTimeout(4000);

  const before = await nodeSnapshot("before");

  // Ensure at least 2 root rules for reorder tests
  const addBtn = page.locator('[data-mark="mc:canvas-add"]');
  const ruleCount = before.nodes.filter((n) => n.id?.startsWith("rule:") && !n.id.includes(".")).length;
  for (let i = ruleCount; i < 2; i++) {
    await addBtn.click();
    await page.waitForTimeout(500);
  }

  const ready = await nodeSnapshot("ready");

  // Click Move down on first root rule
  const firstRule = page.locator('[data-node-id="rule:0"]').first();
  await firstRule.waitFor({ timeout: 10000 });
  const firstProviderBefore = await firstRule.locator('[data-mark="mc:node-provider"]').inputValue();
  const providersBefore = await page.locator("mediacurator-dashboard").evaluate((dashboard) => {
    const root = dashboard.shadowRoot?.querySelector("mc-rule-flow")?.shadowRoot;
    if (!root) return [];
    return [...root.querySelectorAll('[data-node-id^="rule:"]')]
      .filter((el) => !el.getAttribute("data-node-id")?.includes(".", 5))
      .map((el) => ({
        id: el.getAttribute("data-node-id"),
        provider: el.querySelector('[data-mark="mc:node-provider"]')?.value ?? null,
        top: Math.round(el.getBoundingClientRect().top),
        height: Math.round(el.getBoundingClientRect().height),
      }));
  });

  await firstRule.locator('button[title="Move down"]').click({ force: true });
  await page.waitForTimeout(800);
  const afterArrow = await nodeSnapshot("after-arrow-down");
  const providersAfterArrow = await page.locator("mediacurator-dashboard").evaluate((dashboard) => {
    const root = dashboard.shadowRoot?.querySelector("mc-rule-flow")?.shadowRoot;
    if (!root) return [];
    return [...root.querySelectorAll('[data-node-id^="rule:"]')]
      .filter((el) => !el.getAttribute("data-node-id")?.includes(".", 5))
      .map((el) => ({
        id: el.getAttribute("data-node-id"),
        provider: el.querySelector('[data-mark="mc:node-provider"]')?.value ?? null,
        top: Math.round(el.getBoundingClientRect().top),
        height: Math.round(el.getBoundingClientRect().height),
      }));
  });
  const firstProviderAfterArrow = providersAfterArrow[0]?.provider ?? null;

  // Drag second root rule upward by ~250px via drag handle
  const second = page.locator('[data-node-id="rule:1"]').first();
  const handle = second.locator(".mc-rule-flow-drag-handle");
  const box = await handle.boundingBox();
  const midDrag = { x: 0, y: 0, providers: [] };
  if (box) {
    const start = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
    await page.mouse.move(start.x, start.y - 120, { steps: 12 });
    midDrag.x = start.x;
    midDrag.y = start.y - 120;
    const mid = await nodeSnapshot("mid-drag");
    midDrag.providers = mid.nodes.map((n) => ({ id: n.id, top: n.top, provider: n.provider }));
    await page.mouse.move(start.x, start.y - 280, { steps: 16 });
    await page.mouse.up();
    await page.waitForTimeout(800);
  }

  const afterDrag = await nodeSnapshot("after-drag");

  // Drag again without crossing reorder threshold — expect snap back
  const dragTarget = page.locator('[data-node-id="rule:0"]').first();
  const handle2 = dragTarget.locator(".mc-rule-flow-drag-handle");
  const box2 = await handle2.boundingBox();
  let afterSmallDrag = null;
  if (box2) {
    const start = { x: box2.x + box2.width / 2, y: box2.y + box2.height / 2 };
    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
    await page.mouse.move(start.x + 80, start.y + 40, { steps: 10 });
    await page.mouse.up();
    await page.waitForTimeout(600);
    afterSmallDrag = await nodeSnapshot("after-small-drag");
  }

  const result = {
    firstProviderBefore,
    firstProviderAfterArrow,
    providersBefore,
    providersAfterArrow,
    arrowChangedOrder: firstProviderBefore !== firstProviderAfterArrow,
    before,
    ready,
    afterArrow,
    midDrag,
    afterDrag,
    afterSmallDrag,
    consoleErrors,
  };

  writeFileSync(join(outDir, "reorder.json"), JSON.stringify(result, null, 2));
  await page.screenshot({ path: join(outDir, "reorder.png"), fullPage: true });
  console.log(JSON.stringify(result, null, 2));
} finally {
  await browser.close();
}
