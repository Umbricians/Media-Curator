import { expect, test } from './fixtures';
import { createFolderUnder, deleteRulesetsByPrefix, purgeRecycleBinByPrefix, createTestFile, createTestFolder, createTestImage, removeTestMedia } from './util';

const rootName = 'MC Cleanup Root';
const oldName = 'MC Cleanup Old';
const deeperName = 'MC Cleanup Deeper';
const alreadyEmptyName = 'MC Cleanup Already Empty';
const keptName = 'MC Cleanup Has File';
const fileName = 'MC Cleanup Doc';
const imageName = 'MC Cleanup Photo';
const rulesetName = 'MC Cleanup Ruleset';
const names = [imageName, fileName, deeperName, oldName, alreadyEmptyName, keptName, rootName];
const base = () => process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264';

type Api = {
  media: {
    ensureNameNotExists(name: string): Promise<unknown>;
    createDefaultMediaFolderAndParentId(name: string, parentId: string | null): Promise<string>;
    createDefaultMediaWithImageAndParentId(name: string, parentId: string): Promise<string>;
    createDefaultMediaFileAndParentId(name: string, parentId: string): Promise<string>;
    doesMediaItemHaveChildName(mediaId: string, childName: string): Promise<boolean>;
    doesMediaItemExistInRecycleBin(name: string): Promise<boolean>;
    getByName(name: string): Promise<{ id: string } | undefined>;
  };
  put(url: string, data?: object): Promise<unknown>;
  get(url: string): Promise<{ json(): Promise<unknown> }>;
  post(url: string, data?: object): Promise<{ status(): number }>;
};

/** Root (ruleset scope) / Old / Deeper / photo, plus an already-empty folder and a folder with a file. */
async function arrange(umbracoApi: Api) {
  const rootId = await createTestFolder(umbracoApi, rootName, null);
  const oldId = await createTestFolder(umbracoApi, oldName, rootId);
  const deeperId = await createTestFolder(umbracoApi, deeperName, oldId);
  await createTestImage(umbracoApi, imageName, deeperId);
  await createTestFolder(umbracoApi, alreadyEmptyName, rootId);
  const keptId = await createTestFolder(umbracoApi, keptName, rootId);
  await createTestFile(umbracoApi, fileName, keptId);
  const response = await umbracoApi.put(`${base()}/umbraco/umbriciansmediacurator/api/v1/rulesets`, {
    scopeRootKey: rootId,
    name: rulesetName,
    enabled: true,
    rules: [{ providerAlias: 'Umbricians.MediaCurator.Date', settings: { format: 'yyyy' }, fallback: 'skip', children: [] }],
  });
  expect((response as { status(): number }).status()).toBe(200);
  return { rootId, oldId, deeperId };
}

async function undoLatestRun(umbracoApi: Api, rootId: string) {
  const runs = (await (await umbracoApi.get(`${base()}/umbraco/umbriciansmediacurator/api/v1/curation/runs`)).json()) as Array<{
    key: string;
    scopeFolderKey: string;
    trigger: string;
  }>;
  const run = runs.find((r) => r.scopeFolderKey === rootId && !r.trigger.startsWith('undo:'));
  expect(run).toBeTruthy();
  const undo = await umbracoApi.post(`${base()}/umbraco/umbriciansmediacurator/api/v1/curation/runs/${run!.key}/undo`);
  expect(undo.status()).toBe(200);
}

test.describe('MediaCurator empty folder cleanup', () => {
  test.beforeEach(async ({ umbracoApi }) => {
    await deleteRulesetsByPrefix(umbracoApi, 'MC ');
    for (const name of names) await removeTestMedia(umbracoApi, name);
    await purgeRecycleBinByPrefix(umbracoApi, 'MC Cleanup');
  });

  test.afterEach(async ({ umbracoApi }) => {
    await deleteRulesetsByPrefix(umbracoApi, 'MC ');
    for (const name of names) await removeTestMedia(umbracoApi, name);
    await purgeRecycleBinByPrefix(umbracoApi, 'MC Cleanup');
  });

  async function curateRoot(page: import('@playwright/test').Page, rootId: string, permanentlyDelete: boolean) {
    await page.goto(`${base()}/umbraco/section/media/workspace/media/edit/${rootId}`);
    await page.locator('umb-workspace-entity-action-menu').getByRole('button').first().click();
    await page.getByRole('button', { name: 'Curate images' }).click();
    const confirm = page.locator('umb-confirm-modal');
    await expect(confirm).toContainText('1 image in');
    await expect(confirm).toContainText('moved to the Recycle Bin');
    if (permanentlyDelete) {
      await confirm.getByTestId('mc:delete-empty-folders').click();
      await expect(confirm).toContainText('deleted permanently');
    }
    await confirm.getByRole('button', { name: 'Move 1' }).click();
  }

  test('empty sub-folders go to the Recycle Bin and undo restores them', async ({ umbracoUi, umbracoApi }) => {
    const page = umbracoUi.page;
    const { rootId, oldId, deeperId } = await arrange(umbracoApi as unknown as Api);

    await umbracoUi.goToBackOffice();
    await curateRoot(page, rootId, false);

    await expect(
      page.locator('uui-toast-notification').filter({ hasText: '3 empty folders moved to the Recycle Bin' }),
    ).toBeVisible({ timeout: 15000 });
    const year = String(new Date().getFullYear());
    expect(await umbracoApi.media.doesMediaItemHaveChildName(rootId, year)).toBeTruthy();
    expect(await umbracoApi.media.doesMediaItemHaveChildName(rootId, oldName)).toBeFalsy();
    expect(await umbracoApi.media.doesMediaItemHaveChildName(rootId, alreadyEmptyName)).toBeFalsy();
    expect(await umbracoApi.media.doesMediaItemHaveChildName(rootId, keptName)).toBeTruthy();
    expect(await umbracoApi.media.doesMediaItemExistInRecycleBin(oldName)).toBeTruthy();

    // Undo restores the recycled folders (same keys) before moving the image back.
    await undoLatestRun(umbracoApi as unknown as Api, rootId);
    expect(await umbracoApi.media.doesMediaItemHaveChildName(rootId, oldName)).toBeTruthy();
    expect(await umbracoApi.media.doesMediaItemHaveChildName(oldId, deeperName)).toBeTruthy();
    expect(await umbracoApi.media.doesMediaItemHaveChildName(deeperId, imageName)).toBeTruthy();
    expect(await umbracoApi.media.doesMediaItemExistInRecycleBin(oldName)).toBeFalsy();
  });

  test('ticking the option deletes empty sub-folders permanently and undo recreates them', async ({
    umbracoUi,
    umbracoApi,
  }) => {
    const page = umbracoUi.page;
    const { rootId } = await arrange(umbracoApi as unknown as Api);

    await umbracoUi.goToBackOffice();
    await curateRoot(page, rootId, true);

    await expect(
      page.locator('uui-toast-notification').filter({ hasText: '3 empty folders deleted permanently' }),
    ).toBeVisible({ timeout: 15000 });
    expect(await umbracoApi.media.doesMediaItemHaveChildName(rootId, oldName)).toBeFalsy();
    expect(await umbracoApi.media.doesMediaItemExistInRecycleBin(oldName)).toBeFalsy();

    // Undo recreates the deleted folders by name and puts the image back inside them.
    await undoLatestRun(umbracoApi as unknown as Api, rootId);
    expect(await umbracoApi.media.doesMediaItemHaveChildName(rootId, oldName)).toBeTruthy();
    const recreatedOld = await umbracoApi.media.getByName(oldName);
    expect(await umbracoApi.media.doesMediaItemHaveChildName(recreatedOld!.id, deeperName)).toBeTruthy();
    const recreatedDeeper = await umbracoApi.media.getByName(deeperName);
    expect(await umbracoApi.media.doesMediaItemHaveChildName(recreatedDeeper!.id, imageName)).toBeTruthy();
  });

  // Regression: with nothing to move, Curate images showed no dialog and never cleaned up.
  test('with nothing to move, the tree menu still offers to remove empty sub-folders', async ({ umbracoUi, umbracoApi }) => {
    const page = umbracoUi.page;
    const api = umbracoApi as unknown as Api;
    const year = String(new Date().getFullYear());
    const rootId = await createTestFolder(umbracoApi, rootName, null);
    // A generic name: never via createDefaultMediaFolder*, which deletes same-named media library-wide.
    const yearId = await createFolderUnder(umbracoApi, year, rootId);
    await createTestImage(umbracoApi, imageName, yearId);
    await createTestFolder(umbracoApi, oldName, rootId);
    await api.put(`${base()}/umbraco/umbriciansmediacurator/api/v1/rulesets`, {
      scopeRootKey: rootId,
      name: rulesetName,
      enabled: true,
      rules: [{ providerAlias: 'Umbricians.MediaCurator.Date', settings: { format: 'yyyy' }, fallback: 'skip', children: [] }],
    });

    await umbracoUi.goToBackOffice();
    await page.goto(`${base()}/umbraco/section/media`);
    const treeItem = page.locator(`umb-tree-item uui-menu-item[label="${rootName}"]`).first();
    await treeItem.hover();
    await treeItem.locator('uui-button[label*="ctions"], #action-modal').first().click();
    await page.getByRole('button', { name: 'Curate images' }).first().click();

    const confirm = page.locator('umb-confirm-modal');
    await expect(confirm).toContainText(`No images in "${rootName}" need moving (1 already in place). 1 empty sub-folder will be removed.`);
    await confirm.getByRole('button', { name: 'Remove 1 empty folder' }).click();

    await expect(
      page.locator('uui-toast-notification').filter({ hasText: '1 empty folder moved to the Recycle Bin' }),
    ).toBeVisible({ timeout: 15000 });
    expect(await api.media.doesMediaItemHaveChildName(rootId, oldName)).toBeFalsy();
    expect(await api.media.doesMediaItemHaveChildName(yearId, imageName)).toBeTruthy();
    // The year folder lives under the test root, which afterEach removes. Never delete by a
    // generic name like the year: ensureNameNotExists matches media anywhere in the library.
  });
});
