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

const folderName = 'MC Undo Folder';
const imageName = 'MC Undo Photo';
const rulesetName = 'MC Undo Ruleset';
const base = () => process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264';

test.describe('MediaCurator undo', () => {
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

  test('curate then undo restores the original tree', async ({ umbracoUi, umbracoApi }) => {
    const page = umbracoUi.page;

    const folderId = await createTestFolder(umbracoApi, folderName, null);
    await createTestImage(umbracoApi, imageName, folderId);
    const folder = await umbracoApi.media.getByName(folderName);

    await umbracoApi.put(`${base()}/umbraco/umbriciansmediacurator/api/v1/rulesets`, {
      scopeRootKey: folder.id,
      name: rulesetName,
      enabled: true,
      rules: [
        { providerAlias: 'Umbricians.MediaCurator.Date', settings: { format: 'yyyy/MM' }, fallback: 'skip', children: [] },
      ],
    });

    // Curate from the ruleset's Curate tab (Settings section > Media Curator)
    await umbracoUi.goToBackOffice();
    await openRulesetFromTree(page, rulesetName, 'curate');
    await runDryRun(page);
    await executePlan(page);
    await openMediaCuratorRoot(page, 'activity');

    // The image moved into the date tree
    const imageAfterCurate = await umbracoApi.media.getByName(imageName);
    expect(imageAfterCurate).toBeTruthy();

    // Undo from the activity log, and wait for it: other tests' undo runs are in the log too, so the row
    // check below can pass before this undo has finished.
    const undone = page.waitForResponse((r) => r.url().includes('/undo') && r.request().method() === 'POST');
    await page.getByTestId('mc:run-undo').first().click();
    expect((await undone).status()).toBe(200);

    // A new undo run appears with 1 moved, and a fresh dry-run would move the item again
    await expect(
      page.getByTestId('mc:run-row').filter({ hasText: 'undo:' }).first().getByTestId('mc:run-moved'),
    ).toHaveText('1', { timeout: 15000 });

    await openRulesetFromTree(page, rulesetName, 'curate');
    await runDryRun(page);
    const moveRow = page.getByTestId('mc:plan-move').filter({ hasText: imageName });
    await expect(moveRow).toContainText('will move'); // back at original location ⇒ would move again
  });
});
