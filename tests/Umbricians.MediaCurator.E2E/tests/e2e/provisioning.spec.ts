import { expect, test } from './fixtures';
import {
  addRuleViaPanel,
  deleteRulesetFromTree,
  deleteRulesetsByPrefix,
  expandMediaCuratorTree,
  openRulesetTab,
  removeProvisionedProperty,
  rulesetTreeItem,
  saveRuleset,
  startNewRuleset,
  createTestRootFolder,
  removeTestMedia,
} from './util';

const folderName = 'MC Exif Folder';
const rulesetName = 'MC Exif Ruleset';
const exifPropertyAlias = 'mediaCuratorExifData';

test.describe('MediaCurator property provisioning', () => {
  test.beforeEach(async ({ umbracoApi }) => {
    await removeTestMedia(umbracoApi, folderName);
    await createTestRootFolder(umbracoApi, folderName);
    await deleteRulesetsByPrefix(umbracoApi, 'MC ');
    await removeProvisionedProperty(umbracoApi, 'Image', exifPropertyAlias);
  });

  test.afterEach(async ({ umbracoApi }) => {
    await removeTestMedia(umbracoApi, folderName);
    await deleteRulesetsByPrefix(umbracoApi, 'MC ');
    await removeProvisionedProperty(umbracoApi, 'Image', exifPropertyAlias);
  });

  test('EXIF rule requirement: consent dialog provisions the property', async ({ umbracoUi, umbracoApi }) => {
    const page = umbracoUi.page;

    // The Image media type must not have the property yet (fresh check)
    const imageTypeBefore = await umbracoApi.mediaType.getByName('Image');
    expect(JSON.stringify(imageTypeBefore.properties.map((p: { alias: string }) => p.alias))).not.toContain(
      exifPropertyAlias,
    );

    await umbracoUi.goToBackOffice();

    // Create a ruleset with an EXIF rule (Settings section > Media Curator)
    await startNewRuleset(page, { name: rulesetName, scopeFolderName: folderName });
    await addRuleViaPanel(page, { providerAlias: 'Umbricians.MediaCurator.Exif' });
    await saveRuleset(page);
    await expandMediaCuratorTree(page);
    await expect(rulesetTreeItem(page, rulesetName)).toBeVisible({ timeout: 10000 });

    // Open the requirements (consent) view: the EXIF cache property is missing
    await openRulesetTab(page, 'requirements');
    await expect(page.getByTestId('mc:requirements')).toBeVisible({ timeout: 10000 });
    const row = page.getByTestId('mc:requirement-row').filter({ hasText: exifPropertyAlias });
    await expect(row.getByTestId('mc:requirement-status')).toHaveText('missing');

    // Approve the default action (create) and apply
    await page.getByTestId('mc:requirements-apply').click();

    // The dialog re-checks and reports satisfied
    await expect(row.getByTestId('mc:requirement-status')).toHaveText('satisfied', { timeout: 10000 });

    // The property now exists on the Image media type, in the Media Curator group
    const imageTypeAfter = await umbracoApi.mediaType.getByName('Image');
    const property = imageTypeAfter.properties.find((p: { alias: string }) => p.alias === exifPropertyAlias);
    expect(property).toBeTruthy();
    const group = imageTypeAfter.containers.find((c: { id: string }) => c.id === property.container.id);
    expect(group.name).toBe('Media Curator');

    // Cleanup the ruleset via UI
    await deleteRulesetFromTree(page, rulesetName);
    await expect(rulesetTreeItem(page, rulesetName)).toHaveCount(0, { timeout: 10000 });
  });
});
