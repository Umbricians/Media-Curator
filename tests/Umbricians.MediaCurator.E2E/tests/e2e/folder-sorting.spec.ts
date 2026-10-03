import { expect, test } from './fixtures';
import { createFolderUnder, deleteRulesetsByPrefix, createTestFile, createTestFolder, createTestImage, removeTestMedia } from './util';

// Only "MC Sort" names are ever deleted: removing the root takes its month folders with it.
// Never delete by a month (or any generic) name: ensureNameNotExists matches the whole library,
// and the helpers' createDefaultMediaFolder*(name) call it first — use createFolderUnder instead.
const rootName = 'MC Sort Root';
const imageName = 'MC Sort Photo';
const fileName = 'MC Sort Zz Notes';
const decDocName = 'MC Sort Dec Doc';
const janDocName = 'MC Sort Jan Doc';
const rulesetName = 'MC Sort Ruleset';
const owned = [imageName, fileName, decDocName, janDocName, rootName];
const base = () => process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

test.describe('MediaCurator folder sorting', () => {
  test.beforeEach(async ({ umbracoApi }) => {
    await deleteRulesetsByPrefix(umbracoApi, 'MC ');
    for (const name of owned) await removeTestMedia(umbracoApi, name);
  });

  test.afterEach(async ({ umbracoApi }) => {
    await deleteRulesetsByPrefix(umbracoApi, 'MC ');
    for (const name of owned) await removeTestMedia(umbracoApi, name);
  });

  test('a run sorts month folders in calendar order, folders before other media', async ({ umbracoApi }) => {
    const rootId = await createTestFolder(umbracoApi, rootName, null);
    // Created out of calendar (and alphabetical) order; each holds a file so cleanup keeps it.
    const decId = await createFolderUnder(umbracoApi, 'December', rootId);
    await createTestFile(umbracoApi, decDocName, decId);
    const janId = await createFolderUnder(umbracoApi, 'January', rootId);
    await createTestFile(umbracoApi, janDocName, janId);
    await createTestFile(umbracoApi, fileName, rootId);
    await createTestImage(umbracoApi, imageName, rootId);

    const saved = await umbracoApi.put(`${base()}/umbraco/mediacurator/api/v1/rulesets`, {
      scopeRootKey: rootId,
      name: rulesetName,
      enabled: true,
      rules: [{ providerAlias: 'Umbricians.MediaCurator.Date', settings: { format: 'MMMM' }, fallback: 'skip', children: [] }],
    });
    expect((saved as { status(): number }).status()).toBe(200);

    const run = await umbracoApi.post(`${base()}/umbraco/mediacurator/api/v1/curation/execute`, {
      scopeFolderKey: rootId,
      recursive: true,
      permanentlyDeleteEmptyFolders: false,
    });
    expect(run.status()).toBe(200);

    // The image lands in the current month's folder (it may already have been moved by an
    // automation; either way the run sorts the scope afterwards).
    const current = months[new Date().getMonth()];
    const expectedFolders = months.filter((m) => ['January', 'December', current].includes(m));
    const children = (await umbracoApi.media.getChildren(rootId)) as Array<{ variants: Array<{ name: string }> }>;
    expect(children.map((c) => c.variants[0].name)).toEqual([...expectedFolders, fileName]);
  });
});
