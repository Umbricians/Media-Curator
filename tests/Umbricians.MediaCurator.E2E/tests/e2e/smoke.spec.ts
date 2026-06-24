import { ConstantHelper } from '@umbraco-cms/acceptance-test-helpers';
import { expect, test } from './fixtures';

test.describe('MediaCurator smoke', () => {
  test('backoffice loads and the Media Curator dashboard renders', { tag: '@smoke' }, async ({ umbracoUi }) => {
    await umbracoUi.goToBackOffice();
    await umbracoUi.content.goToSection(ConstantHelper.sections.media);

    const dashboardTab = umbracoUi.page.getByRole('tab', { name: 'Media Curator' });
    await expect(dashboardTab).toBeVisible({ timeout: 15000 });
    await dashboardTab.click();

    await expect(umbracoUi.page.locator('mediacurator-dashboard')).toBeVisible({ timeout: 15000 });
    await expect(umbracoUi.page.getByLabel('Create ruleset')).toBeVisible({ timeout: 15000 });
  });
});
