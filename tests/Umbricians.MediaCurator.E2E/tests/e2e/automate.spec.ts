import { expect, test } from './fixtures';

const base = () => process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264';

/**
 * Verifies the Umbricians.MediaCurator.Automate package registers its triggers and actions, with their settings
 * and outputs, in Umbraco.Automate's catalogue.
 */
test.describe('Umbricians.MediaCurator.Automate companion', () => {
  test('triggers and actions are registered in the Automate catalogs', async ({ umbracoApi }) => {
    const actions = await umbracoApi.get(`${base()}/umbraco/automate/management/api/v1/catalogue/actions`);
    expect(actions.status()).toBe(200);
    const actionsBody = JSON.stringify(await actions.json());
    expect(actionsBody).toContain('umbriciansMediaCurator.analyzeImage');
    expect(actionsBody).toContain('umbriciansMediaCurator.categorizeMedia');
    expect(actionsBody).toContain('umbriciansMediaCurator.curateFolder');

    const triggers = await umbracoApi.get(`${base()}/umbraco/automate/management/api/v1/catalogue/triggers`);
    expect(triggers.status()).toBe(200);
    const triggersBody = JSON.stringify(await triggers.json());
    expect(triggersBody).toContain('umbriciansMediaCurator.curated');
    expect(triggersBody).toContain('umbriciansMediaCurator.curationFailed');

    // The settings and output classes are internal, so check Automate still reads each one's fields.
    type Entry = { alias: string; settingsSchema: { fields: { key: string }[] }; outputSchema: { properties: object } };
    const entries = [...((await actions.json()) as Entry[]), ...((await triggers.json()) as Entry[])];
    const expected: Record<string, { settings: string[]; output: string[] }> = {
      'umbriciansMediaCurator.analyzeImage': { settings: ['mediaKey', 'force', 'scheme'], output: ['analyzed', 'tags'] },
      'umbriciansMediaCurator.categorizeMedia': { settings: ['mediaKey', 'dryRun'], output: ['moved', 'targetPath'] },
      'umbriciansMediaCurator.curateFolder': {
        settings: ['scopeFolderKey', 'recursive', 'dryRun', 'permanentlyDeleteEmptyFolders'],
        output: ['planned', 'moved', 'runKey'],
      },
      'umbriciansMediaCurator.curated': { settings: ['scopeFolderKey'], output: ['runKey', 'moved', 'failed'] },
      'umbriciansMediaCurator.curationFailed': { settings: ['scopeFolderKey'], output: ['runKey', 'moved', 'failed'] },
    };
    for (const [alias, { settings, output }] of Object.entries(expected)) {
      const entry = entries.find((candidate) => candidate.alias === alias);
      expect(entry?.settingsSchema.fields.map((field) => field.key), alias).toEqual(settings);
      expect(Object.keys(entry?.outputSchema.properties ?? {}), alias).toEqual(expect.arrayContaining(output));
    }
  });
});
