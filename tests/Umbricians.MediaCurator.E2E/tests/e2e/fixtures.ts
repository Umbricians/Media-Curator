import { test as base } from '@umbraco-cms/acceptance-test-helpers';
import { chromium, test as pwBase, type Browser } from '@playwright/test';

/**
 * When PW_CDP_ENDPOINT is set, connect to an already-running Chrome over CDP
 * instead of launching one. Used on machines where the test runner is sandboxed
 * and cannot spawn Chrome itself (e.g. Claude Code's sandbox); normal machines
 * and CI leave the variable unset and get Playwright's default launcher.
 */
const cdpEndpoint = process.env.PW_CDP_ENDPOINT;

function cdpBrowserFixture() {
  return [
    async ({}, use: (b: Browser) => Promise<void>) => {
      const browser = await chromium.connectOverCDP(cdpEndpoint!);
      await use(browser);
      await browser.close();
    },
    { scope: 'worker' as const },
  ] as const;
}

/** Test base with Umbraco testhelpers fixtures (umbracoApi / umbracoUi). */
export const test = cdpEndpoint
  ? base.extend({ browser: cdpBrowserFixture() as never })
  : base;

/** Plain Playwright test base (for setup projects). */
export const plainTest = cdpEndpoint
  ? pwBase.extend({ browser: cdpBrowserFixture() as never })
  : pwBase;

export { expect } from '@playwright/test';
