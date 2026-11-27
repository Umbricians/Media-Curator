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

const folderName = 'MC Color Folder';
const imageName = 'MC Color Photo';
const rulesetName = 'MC Color Ruleset';
const base = () => process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264';

test.describe('MediaCurator color provider (deterministic)', () => {
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

  test('curates a red fixture image into the Red palette folder', async ({ umbracoUi, umbracoApi }) => {
    const page = umbracoUi.page;

    // Arrange: folder with the solid-red fixture image, Color ruleset attached via API
    const folderId = await createTestFolder(umbracoApi, folderName, null);
    await createTestImage(umbracoApi, imageName, folderId);
    const folder = await umbracoApi.media.getByName(folderName);

    await umbracoApi.put(`${base()}/umbraco/umbriciansmediacurator/api/v1/rulesets`, {
      scopeRootKey: folder.id,
      name: rulesetName,
      enabled: true,
      rules: [{ providerAlias: 'Umbricians.MediaCurator.Color', settings: {}, fallback: 'skip', children: [] }],
    });

    // Act: curate from the ruleset's Curate tab (Settings section > Media Curator)
    await umbracoUi.goToBackOffice();
    await openRulesetFromTree(page, rulesetName, 'curate');
    await runDryRun(page);

    // Assert: plan resolves the red pixel image into "Red"
    const moveRow = page.getByTestId('mc:plan-move').filter({ hasText: imageName });
    await expect(moveRow).toContainText('Red');

    await executePlan(page);
    await openMediaCuratorRoot(page, 'activity');

    // The Red folder exists in the media tree
    expect(await umbracoApi.media.doesNameExist('Red')).toBeTruthy();
  });
});
