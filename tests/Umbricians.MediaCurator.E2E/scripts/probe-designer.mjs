import { chromium } from "@playwright/test";
import { UiHelpers } from "@umbraco-cms/acceptance-test-helpers";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../probe-output");
mkdirSync(outDir, { recursive: true });

const login = process.env.UMBRACO_USER_LOGIN ?? "admin@test.com";
const password = process.env.UMBRACO_USER_PASSWORD ?? "SecurePass1234";

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const umbracoUi = new UiHelpers(page);

const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push(err.message));

try {
  await umbracoUi.goToBackOffice();
  await umbracoUi.login.enterEmail(login);
  await umbracoUi.login.enterPassword(password);
  await umbracoUi.login.clickLoginButton();
  await page.waitForTimeout(3000);
  await page.goto("http://localhost:40264/umbraco/section/media");
  await page.waitForTimeout(3000);
  await page.getByRole("tab", { name: "Media Curator" }).click();
  await page.waitForSelector("mediacurator-dashboard", { timeout: 60000 });

  const editButton = page.getByLabel(/^Edit /).first();
  await editButton.click();
  await page.waitForTimeout(4000);

  const diagnostics = await page.locator("mediacurator-dashboard").evaluate((dashboard) => {
    const roots = [dashboard.shadowRoot].filter(Boolean);
    const ruleFlow = dashboard.shadowRoot?.querySelector("mc-rule-flow");
    if (ruleFlow?.shadowRoot) roots.push(ruleFlow.shadowRoot);

    const queryAll = (selector) => {
      const hits = [];
      for (const root of roots) {
        hits.push(...root.querySelectorAll(selector));
      }
      return hits;
    };

    const pick = (selector) => {
      const el = queryAll(selector)[0];
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return {
        selector,
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
        display: style.display,
        heightComputed: style.height,
        overflow: style.overflow,
        transform: style.transform,
      };
    };

    return {
      mcRuleFlowExists: queryAll("mc-rule-flow").length,
      ruleFlowHasShadow: !!ruleFlow?.shadowRoot,
      adoptedStyleSheets: ruleFlow?.shadowRoot?.adoptedStyleSheets.length ?? 0,
      flowNodeCount: queryAll(".react-flow__node").length,
      scope: pick(".mc-rule-flow-scope"),
      node: pick(".mc-rule-flow-node"),
      viewport: pick(".mc-rule-flow-viewport"),
      reactFlow: pick(".react-flow"),
      flowNodes: queryAll(".react-flow__node").map((el) => ({
        className: el.className,
        width: el.getBoundingClientRect().width,
        height: el.getBoundingClientRect().height,
        text: el.textContent?.slice(0, 60) ?? "",
      })),
      nodeText: queryAll(".mc-rule-flow-scope strong")[0]?.textContent ?? null,
      providerOptions: queryAll('[data-mark="mc:node-provider"] option').length,
    };
  });

  writeFileSync(join(outDir, "diagnostics.json"), JSON.stringify({ ...diagnostics, consoleErrors }, null, 2));

  const firstNode = page.locator('[data-node-id="rule:0"]').first();
  await firstNode.waitFor({ timeout: 10000 });

  const providerSelect = firstNode.locator('[data-mark="mc:node-provider"]');
  const beforeProvider = await providerSelect.inputValue();
  const options = await providerSelect.locator("option").allTextContents();
  const dateOption = options.find((text) => text.includes("Date")) ? "Umbricians.MediaCurator.Date" : await providerSelect.locator("option").first().getAttribute("value");
  await providerSelect.selectOption(dateOption ?? { index: 0 });
  await page.waitForTimeout(300);

  const formatInput = firstNode.locator('[data-mark="mc:setting-format"]');
  await formatInput.waitFor({ timeout: 5000 });
  await formatInput.click();
  await formatInput.fill("yyyy");
  await page.waitForTimeout(500);

  const afterEdit = await formatInput.inputValue();
  const dragHandles = await page.locator(".mc-rule-flow-drag-handle").count();

  writeFileSync(
    join(outDir, "interaction.json"),
    JSON.stringify(
      {
        beforeProvider,
        selectedProvider: await providerSelect.inputValue(),
        formatValue: afterEdit,
        dragHandleCount: dragHandles,
      },
      null,
      2,
    ),
  );

  await page.screenshot({ path: join(outDir, "designer.png"), fullPage: true });
  console.log(
    JSON.stringify(
      {
        ...diagnostics,
        interaction: {
          beforeProvider,
          selectedProvider: await providerSelect.inputValue(),
          formatValue: afterEdit,
          dragHandleCount: dragHandles,
        },
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
