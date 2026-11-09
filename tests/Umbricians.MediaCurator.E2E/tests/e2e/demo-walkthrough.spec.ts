import { ConstantHelper } from '@umbraco-cms/acceptance-test-helpers';
import { expect, test } from './fixtures';
import {
  deleteRulesetsByPrefix,
  executePlan,
  expandMediaCuratorTree,
  openMediaCuratorRoot,
  openRulesetTab,
  rulesetTreeItem,
  runDryRun,
  createTestFolder,
  createTestImage,
  removeTestMedia,
} from './util';

const folderName = 'MC Demo Media Folder';
const imageName = 'MC Demo Photo';
const rulesetName = 'MC Demo Date Ruleset';
const base = () => process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264';

async function pause(ms = 1500) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

test.describe('MediaCurator demo walkthrough', () => {
  test('record backoffice demo video', async ({ umbracoUi, umbracoApi }) => {
    const page = umbracoUi.page;

    await deleteRulesetsByPrefix(umbracoApi, 'MC Demo ');
    await removeTestMedia(umbracoApi, imageName);
    await removeTestMedia(umbracoApi, folderName);

    const folderId = await createTestFolder(umbracoApi, folderName, null);
    await createTestImage(umbracoApi, imageName, folderId);
    const folder = await umbracoApi.media.getByName(folderName);

    await umbracoApi.put(`${base()}/umbraco/umbriciansmediacurator/api/v1/rulesets`, {
      scopeRootKey: folder.id,
      name: rulesetName,
      enabled: true,
      rules: [
        {
          providerAlias: 'Umbricians.MediaCurator.Date',
          settings: { format: 'yyyy/MM' },
          fallback: 'skip',
          children: [],
        },
      ],
    });

    await umbracoUi.goToBackOffice();
    await pause(2000);

    await umbracoUi.content.goToSection(ConstantHelper.sections.settings);
    await pause(1500);

    // Settings section > Media Curator root workspace
    await openMediaCuratorRoot(page);
    await pause(2500);

    // Open the ruleset from the tree: the Design tab shows its rule canvas
    await expandMediaCuratorTree(page);
    await rulesetTreeItem(page, rulesetName).locator('#label-button').first().click();
    await expect(page.getByTestId('mc:node')).toBeVisible({ timeout: 10000 });
    await pause(3000);

    // Curate tab: dry run, then execute
    await openRulesetTab(page, 'curate');
    await pause(1500);
    await runDryRun(page);
    await pause(3000);

    await executePlan(page);
    await openMediaCuratorRoot(page, 'activity');
    // The log lists every folder's runs (Automate may log its own), so find this ruleset's latest run.
    await expect(
      page.getByTestId('mc:run-row').filter({ hasText: rulesetName }).first().getByTestId('mc:run-moved'),
    ).toHaveText('1');
    await pause(4000);
  });
});
