import { ConstantHelper } from '@umbraco-cms/acceptance-test-helpers';
import { expect, test } from './fixtures';
import { deleteRulesetsByPrefix, removeProvisionedProperty } from './util';

const folderName = 'MC Exif Folder';
const rulesetName = 'MC Exif Ruleset';
const exifPropertyAlias = 'mediaCuratorExifData';

test.describe('MediaCurator property provisioning', () => {
  test.beforeEach(async ({ umbracoApi }) => {
    await umbracoApi.media.ensureNameNotExists(folderName);
    await umbracoApi.media.createDefaultMediaFolder(folderName);
    await deleteRulesetsByPrefix(umbracoApi, 'MC ');
    await removeProvisionedProperty(umbracoApi, 'Image', exifPropertyAlias);
  });

  test.afterEach(async ({ umbracoApi }) => {
    await umbracoApi.media.ensureNameNotExists(folderName);
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
    await umbracoUi.content.goToSection(ConstantHelper.sections.media);
    await page.getByRole('tab', { name: 'Media Curator' }).click();
    await expect(page.locator('mediacurator-dashboard')).toBeVisible({ timeout: 15000 });

    // Create a ruleset with an EXIF rule
    await page.getByLabel('Create ruleset').click();
    await page.getByTestId('mc:name').locator('input').fill(rulesetName);
    await page.getByTestId('mc:scope').getByRole('button').first().click();
    const modal = page.locator('umb-backoffice-modal-container');
    const card = modal.locator('uui-card-media').filter({ hasText: folderName });
    await card.waitFor({ timeout: 10000 });
    await card.hover();
    await card.locator('#select-checkbox').click({ force: true });
    await modal.getByRole('button', { name: /^(Submit|Choose|Select)$/i }).last().click();
    await expect(page.getByTestId('mc:scope')).toContainText(folderName, { timeout: 10000 });

    await page.getByTestId('mc:canvas-add').click();
    await page.getByTestId('mc:node-provider').locator('select').selectOption('Umbricians.MediaCurator.Exif');
    await page.getByTestId('mc:save').click();
    await expect(page.getByTestId('mc:ruleset-row')).toContainText(rulesetName, { timeout: 10000 });

    // Open the requirements (consent) view: the EXIF cache property is missing
    await page.getByLabel(`Requirements for ${rulesetName}`).click();
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
    await page.getByTestId('mc:requirements').getByLabel('Close').click();
    await page.getByLabel(`Delete ${rulesetName}`).click();
    await page
      .locator('umb-backoffice-modal-container')
      .getByRole('button', { name: 'Delete' })
      .click();
    await expect(page.getByTestId('mc:ruleset-row').filter({ hasText: rulesetName })).toHaveCount(0, {
      timeout: 10000,
    });
  });
});
