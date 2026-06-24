import { ConstantHelper } from '@umbraco-cms/acceptance-test-helpers';
import { expect, test } from './fixtures';
import { deleteRulesetsByPrefix } from './util';

const folderName = 'MC Designer Folder';
const imageName = 'MC Designer Photo';
const rulesetName = 'MC Designer Ruleset';

test.describe('MediaCurator visual designer (nesting + conditions)', () => {
  test.beforeEach(async ({ umbracoApi }) => {
    await deleteRulesetsByPrefix(umbracoApi, 'MC ');
    await umbracoApi.media.ensureNameNotExists(imageName);
    await umbracoApi.media.ensureNameNotExists(folderName);
  });

  test.afterEach(async ({ umbracoApi }) => {
    await deleteRulesetsByPrefix(umbracoApi, 'MC ');
    await umbracoApi.media.ensureNameNotExists(imageName);
    await umbracoApi.media.ensureNameNotExists(folderName);
  });

  test('nested conditional ruleset built on the canvas drives curation', async ({ umbracoUi, umbracoApi }) => {
    const page = umbracoUi.page;
    const year = String(new Date().getFullYear());

    // Arrange: folder with one image
    const folderId = await umbracoApi.media.createDefaultMediaFolderAndParentId(folderName, null);
    await umbracoApi.media.createDefaultMediaWithImageAndParentId(imageName, folderId);

    // Build the ruleset in the designer
    await umbracoUi.goToBackOffice();
    await umbracoUi.content.goToSection(ConstantHelper.sections.media);
    await page.getByRole('tab', { name: 'Media Curator' }).click();
    await page.getByLabel('Create ruleset').click();
    await page.getByTestId('mc:name').locator('input').fill(rulesetName);

    // Scope picker
    await page.getByTestId('mc:scope').getByRole('button').first().click();
    const modal = page.locator('umb-backoffice-modal-container');
    const card = modal.locator('uui-card-media').filter({ hasText: folderName });
    await card.waitFor({ timeout: 10000 });
    await card.hover();
    await card.locator('#select-checkbox').click({ force: true });
    await modal.getByRole('button', { name: /^(Submit|Choose|Select)$/i }).last().click();

    // Canvas: root Date rule (yyyy)
    await page.getByTestId('mc:canvas-add').click();
    const rootNode = page.getByTestId('mc:node').first();
    await rootNode.getByTestId('mc:node-provider').locator('select').selectOption('Umbricians.MediaCurator.Date');
    await rootNode.getByTestId('mc:setting-format').locator('input').fill('yyyy');

    // Child Alphabetical rule, conditional on the year value
    await rootNode.getByTestId('mc:node-add-child').click();
    const childNode = page.getByTestId('mc:node').nth(1);
    await childNode.getByTestId('mc:node-provider').locator('select').selectOption('Umbricians.MediaCurator.Alphabetical');
    await childNode.getByTestId('mc:node-condition').locator('input').fill(year);

    // The conditional branch renders as a labelled edge, and the leaf shows an example path
    await expect(page.getByTestId('mc:edge-condition')).toContainText(year);
    await expect(page.getByTestId('mc:node-example')).toContainText(`${rulesetName}/${year}/A`);

    await page.getByTestId('mc:save').click();
    await expect(page.getByTestId('mc:ruleset-row').filter({ hasText: rulesetName })).toBeVisible({
      timeout: 10000,
    });

    // Curate: the image ("MC Designer Photo") should target year/M (condition matched)
    await page.getByLabel(`Curate now ${rulesetName}`).click();
    await expect(page.getByTestId('mc:plan')).toBeVisible({ timeout: 10000 });
    const moveRow = page.getByTestId('mc:plan-move').filter({ hasText: imageName });
    await expect(moveRow).toContainText(`${year}/M`);

    await page.getByTestId('mc:plan-execute').click();
    await expect(page.getByTestId('mc:activity-log')).toBeVisible({ timeout: 15000 });
    expect(await umbracoApi.media.doesNameExist(year)).toBeTruthy();
    expect(await umbracoApi.media.doesNameExist('M')).toBeTruthy();
  });
});
