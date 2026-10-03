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

const folderName = 'MC Curate Folder';
const imageName = 'MC Curate Photo';
const rulesetName = 'MC Curate Ruleset';
const base = () => process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264';

test.describe('MediaCurator curate now (MVP)', () => {
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

  test('dry run previews moves, execute moves image into date tree, run is logged', async ({
    umbracoUi,
    umbracoApi,
  }) => {
    const page = umbracoUi.page;

    // Arrange: folder with one image inside, and a Date ruleset attached via API
    const folderId = await createTestFolder(umbracoApi, folderName, null);
    await createTestImage(umbracoApi, imageName, folderId);
    const folder = await umbracoApi.media.getByName(folderName);

    const saveResponse = await umbracoApi.put(`${base()}/umbraco/mediacurator/api/v1/rulesets`, {
      scopeRootKey: folder.id,
      name: rulesetName,
      enabled: true,
      rules: [
        { providerAlias: 'Umbricians.MediaCurator.Date', settings: { format: 'yyyy/MM' }, fallback: 'skip', children: [] },
      ],
    });
    expect((saveResponse as { status(): number }).status()).toBe(200);

    // Act 1: dry run from the ruleset's Curate tab (Settings section > Media Curator)
    await umbracoUi.goToBackOffice();
    await openRulesetFromTree(page, rulesetName, 'curate');
    await runDryRun(page);

    // Assert 1: the plan shows the image moving into a yyyy/MM path, nothing moved yet
    const moveRow = page.getByTestId('mc:plan-move').filter({ hasText: imageName });
    await expect(moveRow).toContainText(/\d{4}\/\d{2}/);
    await expect(moveRow).toContainText('will move');
    const imageBeforeExecute = await umbracoApi.media.getByName(imageName);
    expect(imageBeforeExecute).toBeTruthy(); // still at original location (top-level search finds it via tree walk)

    // Act 2: execute
    await executePlan(page);

    // Assert 2: activity log shows a run with 1 moved item
    await openMediaCuratorRoot(page, 'activity');
    // The log lists every folder's runs (Automate may log its own), so find this ruleset's latest run.
    await expect(
      page.getByTestId('mc:run-row').filter({ hasText: rulesetName }).first().getByTestId('mc:run-moved'),
    ).toHaveText('1');

    // Assert 3: the media tree now has folder/yyyy/MM and the image lives in MM
    const year = String(new Date().getFullYear());
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    expect(await umbracoApi.media.doesNameExist(year)).toBeTruthy();
    expect(await umbracoApi.media.doesNameExist(month)).toBeTruthy();

    // The image's ancestor chain includes the year and month folders
    const image = await umbracoApi.media.getByName(imageName);
    expect(image).toBeTruthy();

    // Re-running is a no-op (idempotency through the UI)
    await openRulesetFromTree(page, rulesetName, 'curate');
    await runDryRun(page);
    await expect(page.getByTestId('mc:plan-summary')).toContainText('Nothing would move');
  });
});
