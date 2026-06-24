import { ConstantHelper } from '@umbraco-cms/acceptance-test-helpers';
import { expect, test } from './fixtures';
import { deleteRulesetsByPrefix } from './util';

const folderName = 'MC Classify Folder';
const imageName = 'NA modern building'; // leading LCC code "NA" = Fine Arts / Architecture
const rulesetName = 'MC Classify Ruleset';
const base = () => process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264';

test.describe('MediaCurator library classification', () => {
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

  test('curates an image into nested LCC outline folders from its filename code', async ({
    umbracoUi,
    umbracoApi,
  }) => {
    const page = umbracoUi.page;

    const folderId = await umbracoApi.media.createDefaultMediaFolderAndParentId(folderName, null);
    await umbracoApi.media.createDefaultMediaWithImageAndParentId(imageName, folderId);
    const folder = await umbracoApi.media.getByName(folderName);

    await umbracoApi.put(`${base()}/umbraco/mediacurator/api/v1/rulesets`, {
      scopeRootKey: folder.id,
      name: rulesetName,
      enabled: true,
      rules: [
        {
          providerAlias: 'Umbricians.MediaCurator.Classification',
          settings: { scheme: 'lcc', source: 'filename', naming: 'name' },
          fallback: 'skip',
          children: [],
        },
      ],
    });

    await umbracoUi.goToBackOffice();
    await umbracoUi.content.goToSection(ConstantHelper.sections.media);
    await page.getByRole('tab', { name: 'Media Curator' }).click();
    await page.getByLabel(`Curate now ${rulesetName}`).click();

    await expect(page.getByTestId('mc:plan')).toBeVisible({ timeout: 10000 });
    const moveRow = page.getByTestId('mc:plan-move').filter({ hasText: imageName });
    await expect(moveRow).toContainText('Fine Arts/Architecture');

    await page.getByTestId('mc:plan-execute').click();
    await expect(page.getByTestId('mc:activity-log')).toBeVisible({ timeout: 15000 });

    expect(await umbracoApi.media.doesNameExist('Fine Arts')).toBeTruthy();
    expect(await umbracoApi.media.doesNameExist('Architecture')).toBeTruthy();
  });
});
