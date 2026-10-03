import { expect, test } from './fixtures';
import {
  deleteRulesetsByPrefix,
  executePlan,
  openMediaCuratorRoot,
  openRulesetFromTree,
  runDryRun,
  createTestFolder,
  createTestImage,
  removeTestMedia,
} from './util';

const folderName = 'MC Classify Folder';
const imageName = 'NA MC modern building'; // leading LCC code "NA" = Fine Arts / Architecture; "MC" marks it test-owned
const rulesetName = 'MC Classify Ruleset';
const base = () => process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264';

test.describe('MediaCurator classification', () => {
  test.beforeEach(async ({ umbracoApi }) => {
    await deleteRulesetsByPrefix(umbracoApi, 'MC ');
    await removeTestMedia(umbracoApi, imageName);
    await removeTestMedia(umbracoApi, folderName);
  });

  test.afterEach(async ({ umbracoApi }) => {
    await deleteRulesetsByPrefix(umbracoApi, 'MC ');
    await removeTestMedia(umbracoApi, imageName);
    await removeTestMedia(umbracoApi, folderName);
  });

  test('curates an image into nested LCC outline folders from its filename code', async ({
    umbracoUi,
    umbracoApi,
  }) => {
    const page = umbracoUi.page;

    const folderId = await createTestFolder(umbracoApi, folderName, null);
    await createTestImage(umbracoApi, imageName, folderId);
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
    await openRulesetFromTree(page, rulesetName, 'curate');
    await runDryRun(page);

    const moveRow = page.getByTestId('mc:plan-move').filter({ hasText: imageName });
    await expect(moveRow).toContainText('Fine Arts/Architecture');

    await executePlan(page);
    await openMediaCuratorRoot(page, 'activity');

    expect(await umbracoApi.media.doesNameExist('Fine Arts')).toBeTruthy();
    expect(await umbracoApi.media.doesNameExist('Architecture')).toBeTruthy();
  });
});
