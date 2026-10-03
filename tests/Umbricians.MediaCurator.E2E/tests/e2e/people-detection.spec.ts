import { expect, test } from './fixtures';
import { createFolderUnder, createTestFolder, createTestImage, openMediaCuratorRoot, removeTestMedia } from './util';

const rootFolderName = 'MC People Root';
const subFolderName = 'MC People Sub';
const imageName = 'MC People Photo';
const base = () => process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264';

type Settings = Record<string, unknown> & { detectPeople: boolean };

// The badges themselves need an AI decision, which the test site cannot make without an AI connection;
// the flag provider's rollup and the path upkeep are covered by unit tests.
test.describe('MediaCurator people detection', () => {
  let original: Settings | undefined;

  test.beforeEach(async ({ umbracoApi }) => {
    original = (await (await umbracoApi.get(`${base()}/umbraco/mediacurator/api/v1/settings`)).json()) as Settings;
    await removeTestMedia(umbracoApi, imageName);
    await removeTestMedia(umbracoApi, subFolderName);
    await removeTestMedia(umbracoApi, rootFolderName);
  });

  test.afterEach(async ({ umbracoApi }) => {
    if (original) await umbracoApi.put(`${base()}/umbraco/mediacurator/api/v1/settings`, original);
    await removeTestMedia(umbracoApi, imageName);
    await removeTestMedia(umbracoApi, subFolderName);
    await removeTestMedia(umbracoApi, rootFolderName);
  });

  test('the Detect people setting is saved from the setup', async ({ umbracoUi, umbracoApi }) => {
    const page = umbracoUi.page;
    await umbracoApi.put(`${base()}/umbraco/mediacurator/api/v1/settings`, { ...original, detectPeople: false });

    await umbracoUi.goToBackOffice();
    await openMediaCuratorRoot(page, 'setup');
    await page.getByTestId('mc:detect-people').click();
    await page.getByTestId('mc:settings-save').click();

    await expect
      .poll(async () => ((await (await umbracoApi.get(`${base()}/umbraco/mediacurator/api/v1/settings`)).json()) as Settings).detectPeople)
      .toBe(true);
  });

  test('every folder above an image is reloaded to refresh badges', async ({ umbracoApi }) => {
    const rootId = await createTestFolder(umbracoApi, rootFolderName, null);
    const subId = await createFolderUnder(umbracoApi, subFolderName, rootId);
    const imageId = await createTestImage(umbracoApi, imageName, subId);

    const response = await umbracoApi.post(`${base()}/umbraco/mediacurator/api/v1/people/ancestor-folders`, {
      mediaKeys: [imageId],
    });
    const { folderKeys } = (await response.json()) as { folderKeys: string[] };

    expect(folderKeys.sort()).toEqual(['00000000-0000-0000-0000-000000000000', rootId, subId].sort());
  });
});
