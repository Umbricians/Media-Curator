import { ConstantHelper } from '@umbraco-cms/acceptance-test-helpers';
import { expect, test } from './fixtures';
import { mediaCuratorTreeRoot } from './util';

test.describe('MediaCurator smoke', () => {
  test('backoffice loads and the Media Curator settings area renders', { tag: '@smoke' }, async ({ umbracoUi, umbracoApi }) => {
    // Requesting umbracoApi validates (and if needed renews) the shared admin session before the UI loads.
    // UI-only tests otherwise reuse a refresh token earlier tests already rotated, and the backoffice
    // renders blank after a 400 from /security/back-office/token.
    void umbracoApi;
    const page = umbracoUi.page;
    await umbracoUi.goToBackOffice();
    await umbracoUi.content.goToSection(ConstantHelper.sections.settings);

    // The Settings sidebar lists the Media Curator tree root
    const root = mediaCuratorTreeRoot(page);
    await expect(root).toBeVisible({ timeout: 15000 });

    // Opening it renders the Media Curator root workspace (Setup tab by default)
    await root.locator('#label-button').first().click();
    await page.waitForURL(/\/workspace\/umbricians-media-curator-root\/edit\/null/, { timeout: 15000 });
    await expect(page.getByTestId('mc:settings')).toBeVisible({ timeout: 15000 });

    // The root's actions menu offers "Create ruleset"
    await root.locator('#menu-item').first().hover();
    await root.locator('#action-modal').first().click({ force: true });
    await expect(page.getByRole('button', { name: 'Create ruleset' })).toBeVisible({ timeout: 15000 });
  });
});
