import { expect, test } from './fixtures';
import {
  addRuleViaPanel,
  deleteRulesetsByPrefix,
  executePlan,
  expandMediaCuratorTree,
  openMediaCuratorRoot,
  rulesetTreeItem,
  runDryRun,
  saveRuleset,
  startNewRuleset,
  createTestFolder,
  createTestImage,
  removeTestMedia,
} from './util';

const folderName = 'MC Designer Folder';
const imageName = 'MC Designer Photo';
const rulesetName = 'MC Designer Ruleset';

test.describe('MediaCurator visual designer (nesting + conditions)', () => {
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

  test('nested conditional ruleset built on the canvas drives curation', async ({ umbracoUi, umbracoApi }) => {
    const page = umbracoUi.page;
    const year = String(new Date().getFullYear());

    // Arrange: folder with one image
    const folderId = await createTestFolder(umbracoApi, folderName, null);
    await createTestImage(umbracoApi, imageName, folderId);

    // Build the ruleset in the designer (Settings section > Media Curator > create ruleset)
    await umbracoUi.goToBackOffice();
    await startNewRuleset(page, { name: rulesetName, scopeFolderName: folderName });

    // Canvas: root Date rule (yyyy), then a child Alphabetical rule conditional on the year
    await addRuleViaPanel(page, {
      providerAlias: 'Umbricians.MediaCurator.Date',
      settings: { format: 'yyyy' },
    });
    await addRuleViaPanel(page, {
      parent: 'rule:0',
      providerAlias: 'Umbricians.MediaCurator.Alphabetical',
      condition: year,
    });

    // Read-only blocks summarise the saved settings and the child's condition
    const rootNode = page.locator('[data-node-id="rule:0"]');
    const childNode = page.locator('[data-node-id="rule:0.0"]');
    await expect(rootNode.getByTestId('mc:node-provider')).toHaveText('Date Folders');
    await expect(rootNode.getByTestId('mc:node-summary').first()).toHaveText('yyyy');
    await expect(childNode.getByTestId('mc:node-provider')).toHaveText('Alphabetical');
    await expect(childNode.getByTestId('mc:node-condition')).toHaveText(`when ${year}`);

    await saveRuleset(page);
    await expandMediaCuratorTree(page);
    await expect(rulesetTreeItem(page, rulesetName)).toBeVisible({ timeout: 10000 });

    // Curate: the image ("MC Designer Photo") should target year/M (condition matched)
    await runDryRun(page);
    const moveRow = page.getByTestId('mc:plan-move').filter({ hasText: imageName });
    await expect(moveRow).toContainText(`${year}/M`);

    await executePlan(page);
    await openMediaCuratorRoot(page, 'activity');
    expect(await umbracoApi.media.doesNameExist(year)).toBeTruthy();
    expect(await umbracoApi.media.doesNameExist('M')).toBeTruthy();
  });
});
