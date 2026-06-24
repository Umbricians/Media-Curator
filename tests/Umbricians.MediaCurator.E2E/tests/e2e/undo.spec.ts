import { ConstantHelper } from '@umbraco-cms/acceptance-test-helpers';
import { expect, test } from './fixtures';
import { deleteRulesetsByPrefix } from './util';

const folderName = 'MC Undo Folder';
const imageName = 'MC Undo Photo';
const rulesetName = 'MC Undo Ruleset';
const base = () => process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264';

test.describe('MediaCurator undo', () => {
  test.beforeEach(async ({ umbracoApi }) => {
    await deleteRulesetsByPrefix(umbracoApi, 'MC ');
    await umbracoApi.media.ensureNameNotExists(imageName);
    await umbracoApi.media.ensureNameNotExists(folderName);
  });

  test.afterEach(async ({ umbracoApi }) => {
    await deleteRulesetsByPrefix(umbracoApi, 'MC ');
    await umbracoApi.media.ensureNameNotExists(imageName);
    await umbracoApi.media.ensureNameNotExists(folderName);
  });

  test('curate then undo restores the original tree', async ({ umbracoUi, umbracoApi }) => {
    const page = umbracoUi.page;

    const folderId = await umbracoApi.media.createDefaultMediaFolderAndParentId(folderName, null);
    await umbracoApi.media.createDefaultMediaWithImageAndParentId(imageName, folderId);
    const folder = await umbracoApi.media.getByName(folderName);

    await umbracoApi.put(`${base()}/umbraco/mediacurator/api/v1/rulesets`, {
      scopeRootKey: folder.id,
      name: rulesetName,
      enabled: true,
      rules: [
        { providerAlias: 'Umbricians.MediaCurator.Date', settings: { format: 'yyyy/MM' }, fallback: 'skip', children: [] },
      ],
    });

    // Curate
    await umbracoUi.goToBackOffice();
    await umbracoUi.content.goToSection(ConstantHelper.sections.media);
    await page.getByRole('tab', { name: 'Media Curator' }).click();
    await page.getByLabel(`Curate now ${rulesetName}`).click();
    await expect(page.getByTestId('mc:plan')).toBeVisible({ timeout: 10000 });
    await page.getByTestId('mc:plan-execute').click();
    await expect(page.getByTestId('mc:activity-log')).toBeVisible({ timeout: 15000 });

    // The image moved into the date tree
    const imageAfterCurate = await umbracoApi.media.getByName(imageName);
    expect(imageAfterCurate).toBeTruthy();

    // Undo from the activity log
    await page.getByTestId('mc:run-undo').first().click();

    // A new undo run appears with 1 moved, and a fresh dry-run would move the item again
    await expect(
      page.getByTestId('mc:run-row').filter({ hasText: 'undo:' }).first().getByTestId('mc:run-moved'),
    ).toHaveText('1', { timeout: 15000 });

    await page.getByLabel(`Curate now ${rulesetName}`).click();
    await expect(page.getByTestId('mc:plan')).toBeVisible({ timeout: 10000 });
    const moveRow = page.getByTestId('mc:plan-move').filter({ hasText: imageName });
    await expect(moveRow).toContainText('will move'); // back at original location ⇒ would move again
  });
});
