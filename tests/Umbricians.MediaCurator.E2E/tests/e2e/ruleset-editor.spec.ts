import { expect, test } from './fixtures';
import {
  addRuleViaPanel,
  deleteRulesetFromTree,
  deleteRulesetsByPrefix,
  expandMediaCuratorTree,
  rulesetTreeItem,
  saveRuleset,
  startNewRuleset,
} from './util';

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

  test('create, persist, and delete a ruleset in the Settings section', async ({ umbracoUi }) => {
    const page = umbracoUi.page;
    await umbracoUi.goToBackOffice();

    // Create a new ruleset: name in the header, scope folder on the Settings tab (asserted in the helper)
    await startNewRuleset(page, { name: rulesetName, scopeFolderName: folderName });

    // Add a rule, switch it to the Date provider, and tweak its format setting
    await addRuleViaPanel(page, {
      providerAlias: 'Umbricians.MediaCurator.Date',
      settings: { format: 'yyyy/MM/dd' },
    });
    const rootNode = page.locator('[data-node-id="rule:0"]');
    await expect(rootNode.getByTestId('mc:node-summary').first()).toHaveText('yyyy/MM/dd');

    // Save and verify it appears in the Media Curator tree
    await saveRuleset(page);
    await expandMediaCuratorTree(page);
    const item = rulesetTreeItem(page, rulesetName);
    await expect(item).toBeVisible({ timeout: 10000 });

    // Reload to prove persistence
    await page.reload();
    await expandMediaCuratorTree(page);
    await expect(item).toBeVisible({ timeout: 15000 });

    // Delete it (tree item actions > Delete, confirm via the Umbraco modal)
    await deleteRulesetFromTree(page, rulesetName);
    await expect(item).toHaveCount(0, { timeout: 10000 });
  });
});
