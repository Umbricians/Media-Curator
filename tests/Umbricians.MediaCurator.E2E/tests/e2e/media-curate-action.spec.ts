import { expect, test } from './fixtures';
import { deleteRulesetsByPrefix, createTestFolder, createTestImage, removeTestMedia } from './util';

const rootFolderName = 'MC Action Root';
const subFolderName = 'MC Action Sub';
const imageName = 'MC Action Photo';
const rulesetName = 'MC Action Ruleset';
const base = () => process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264';

test.describe('MediaCurator "Curate images" media action', () => {
  test.beforeEach(async ({ umbracoApi }) => {
    await deleteRulesetsByPrefix(umbracoApi, 'MC ');
    await removeTestMedia(umbracoApi, imageName);
    await removeTestMedia(umbracoApi, subFolderName);
    await removeTestMedia(umbracoApi, rootFolderName);
  });

  test.afterEach(async ({ umbracoApi }) => {
    await deleteRulesetsByPrefix(umbracoApi, 'MC ');
    await removeTestMedia(umbracoApi, imageName);
    await removeTestMedia(umbracoApi, subFolderName);
    await removeTestMedia(umbracoApi, rootFolderName);
  });

  test('curating a subfolder moves its images relative to the ruleset scope root', async ({
    umbracoUi,
    umbracoApi,
  }) => {
    const page = umbracoUi.page;

    // Arrange: ruleset scoped to the root folder; the image sits in a subfolder below it
    const rootId = await createTestFolder(umbracoApi, rootFolderName, null);
    const subId = await createTestFolder(umbracoApi, subFolderName, rootId);
    await createTestImage(umbracoApi, imageName, subId);
    const saveResponse = await umbracoApi.put(`${base()}/umbraco/umbriciansmediacurator/api/v1/rulesets`, {
      scopeRootKey: rootId,
      name: rulesetName,
      enabled: true,
      rules: [
        { providerAlias: 'Umbricians.MediaCurator.Date', settings: { format: 'yyyy' }, fallback: 'skip', children: [] },
      ],
    });
    expect((saveResponse as { status(): number }).status()).toBe(200);

    // Act: open the subfolder and run "Curate images" from its actions menu
    await umbracoUi.goToBackOffice();
    await page.goto(`${base()}/umbraco/section/media/workspace/media/edit/${subId}`);
    await page.locator('umb-workspace-entity-action-menu').getByRole('button').first().click();
    await page.getByRole('button', { name: 'Curate images' }).click();

    // Assert: the confirmation summarises the plan, then confirming moves the image
    const confirm = page.locator('umb-confirm-modal');
    await expect(confirm).toContainText(`1 image in "${subFolderName}" and its subfolders will be moved.`);
    await confirm.getByRole('button', { name: 'Move 1' }).click();
    await expect(page.locator('uui-toast-notification').filter({ hasText: 'Curated: 1 moved' })).toBeVisible({
      timeout: 15000,
    });

    // The year folder is created under the scope root, not under the clicked subfolder
    const year = String(new Date().getFullYear());
    expect(await umbracoApi.media.doesMediaItemHaveChildName(rootId, year)).toBeTruthy();
    expect(await umbracoApi.media.doesMediaItemHaveChildName(subId, imageName)).toBeFalsy();
    expect(await umbracoApi.media.doesMediaItemHaveChildName(subId, year)).toBeFalsy();
  });
});
