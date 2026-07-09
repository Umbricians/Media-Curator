import { ConstantHelper } from '@umbraco-cms/acceptance-test-helpers';
import { expect, test } from './fixtures';
import { deleteRulesetsByPrefix } from './util';

const folderName = 'MC Test Folder';
const rulesetName = 'MC Date Ruleset';

test.describe('MediaCurator ruleset editor', () => {
  test.beforeEach(async ({ umbracoApi }) => {
    await umbracoApi.media.ensureNameNotExists(folderName);
    await umbracoApi.media.createDefaultMediaFolder(folderName);
    await deleteRulesetsByPrefix(umbracoApi, 'MC ');
  });

  test.afterEach(async ({ umbracoApi }) => {
    await umbracoApi.media.ensureNameNotExists(folderName);
    await deleteRulesetsByPrefix(umbracoApi, 'MC ');
  });

  test('create, persist, and delete a ruleset through the dashboard', async ({ umbracoUi }) => {
    const page = umbracoUi.page;
    await umbracoUi.goToBackOffice();
    await umbracoUi.content.goToSection(ConstantHelper.sections.media);

    // Open the Media Curator dashboard tab
    await page.getByRole('tab', { name: 'Media Curator' }).click();
    await expect(page.locator('mediacurator-dashboard')).toBeVisible({ timeout: 15000 });

    // Create a new ruleset
    await page.getByLabel('Create ruleset').click();
    await page.getByTestId('mc:name').locator('input').fill(rulesetName);

    // Pick the scope folder via the media picker: select the card's checkbox (the
    // pattern Umbraco's own acceptance-test helpers use), then submit the modal.
    await page.getByTestId('mc:scope').getByRole('button').first().click();
    const modal = page.locator('umb-backoffice-modal-container');
    const card = modal.locator('uui-card-media').filter({ hasText: folderName });
    await card.waitFor({ timeout: 10000 });
    await card.hover();
    await card.locator('#select-checkbox').click({ force: true });
    await modal.getByRole('button', { name: /^(Submit|Choose|Select)$/i }).last().click();
    // The picked folder must now show in the scope input
    await expect(page.getByTestId('mc:scope')).toContainText(folderName, { timeout: 10000 });

    // Add a rule, switch it to the Date provider, and tweak its format setting
    await page.getByTestId('mc:canvas-add').click();
    const rootNode = page.locator('[data-node-id="rule:0"]');
    await expect(rootNode).toBeVisible();
    await rootNode.getByTestId('mc:node-provider').locator('select').selectOption('Umbricians.MediaCurator.Date');
    await rootNode.getByTestId('mc:setting-format').locator('input').fill('yyyy/MM/dd');

    // Save and verify it appears in the list
    await page.getByTestId('mc:save').click();
    const row = page.getByTestId('mc:ruleset-row').filter({ hasText: rulesetName });
    await expect(row).toBeVisible({ timeout: 10000 });

    // Reload to prove persistence
    await page.reload();
    await page.getByRole('tab', { name: 'Media Curator' }).click();
    await expect(row).toBeVisible({ timeout: 15000 });

    // Delete it (confirm via the Umbraco modal)
    await page.getByLabel(`Delete ${rulesetName}`).click();
    await page
      .locator('umb-backoffice-modal-container')
      .getByRole('button', { name: 'Delete' })
      .click();
    await expect(row).toHaveCount(0, { timeout: 10000 });
  });
});
