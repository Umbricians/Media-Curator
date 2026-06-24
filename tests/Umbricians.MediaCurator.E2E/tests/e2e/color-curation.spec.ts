import { ConstantHelper } from '@umbraco-cms/acceptance-test-helpers';
import { expect, test } from './fixtures';
import { deleteRulesetsByPrefix } from './util';

const folderName = 'MC Color Folder';
const imageName = 'MC Color Photo';
const rulesetName = 'MC Color Ruleset';
const base = () => process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264';

test.describe('MediaCurator color provider (deterministic)', () => {
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

  test('curates a red fixture image into the Red palette folder', async ({ umbracoUi, umbracoApi }) => {
    const page = umbracoUi.page;

    // Arrange: folder with the solid-red fixture image, Color ruleset attached via API
    const folderId = await umbracoApi.media.createDefaultMediaFolderAndParentId(folderName, null);
    await umbracoApi.media.createDefaultMediaWithImageAndParentId(imageName, folderId);
    const folder = await umbracoApi.media.getByName(folderName);

    await umbracoApi.put(`${base()}/umbraco/mediacurator/api/v1/rulesets`, {
      scopeRootKey: folder.id,
      name: rulesetName,
      enabled: true,
      rules: [{ providerAlias: 'Umbricians.MediaCurator.Color', settings: {}, fallback: 'skip', children: [] }],
    });

    // Act: curate via dashboard
    await umbracoUi.goToBackOffice();
    await umbracoUi.content.goToSection(ConstantHelper.sections.media);
    await page.getByRole('tab', { name: 'Media Curator' }).click();
    await page.getByLabel(`Curate now ${rulesetName}`).click();

    // Assert: plan resolves the red pixel image into "Red"
    await expect(page.getByTestId('mc:plan')).toBeVisible({ timeout: 10000 });
    const moveRow = page.getByTestId('mc:plan-move').filter({ hasText: imageName });
    await expect(moveRow).toContainText('Red');

    await page.getByTestId('mc:plan-execute').click();
    await expect(page.getByTestId('mc:activity-log')).toBeVisible({ timeout: 15000 });

    // The Red folder exists in the media tree
    expect(await umbracoApi.media.doesNameExist('Red')).toBeTruthy();
  });
});
