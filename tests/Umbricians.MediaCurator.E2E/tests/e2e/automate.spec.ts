import { expect, test } from './fixtures';

const base = () => process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264';

/**
 * Verifies the Umbricians.MediaCurator.Automate companion package registers its triggers and actions
 * with the Umbraco.Automate runtime (pre-release). Catalog endpoints are discovered
 * defensively because the Automate management API is still beta.
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
  });
});
