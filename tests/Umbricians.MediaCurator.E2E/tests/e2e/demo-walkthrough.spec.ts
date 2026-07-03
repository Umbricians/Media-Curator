import { ConstantHelper } from '@umbraco-cms/acceptance-test-helpers';
import { expect, test } from './fixtures';
import { deleteRulesetsByPrefix } from './util';

const folderName = 'Demo Media Folder';
const imageName = 'Demo Photo';
const rulesetName = 'Demo Date Ruleset';
const base = () => process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264';

async function pause(ms = 1500) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

test.describe('MediaCurator demo walkthrough', () => {
  test('record backoffice demo video', async ({ umbracoUi, umbracoApi }) => {
    const page = umbracoUi.page;

    await deleteRulesetsByPrefix(umbracoApi, 'Demo ');
    await umbracoApi.media.ensureNameNotExists(imageName);
    await umbracoApi.media.ensureNameNotExists(folderName);

    const folderId = await umbracoApi.media.createDefaultMediaFolderAndParentId(folderName, null);
    await umbracoApi.media.createDefaultMediaWithImageAndParentId(imageName, folderId);
    const folder = await umbracoApi.media.getByName(folderName);

    await umbracoApi.put(`${base()}/umbraco/mediacurator/api/v1/rulesets`, {
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

    await umbracoUi.content.goToSection(ConstantHelper.sections.media);
    await pause(1500);

    await page.getByRole('tab', { name: 'Media Curator' }).click();
    await expect(page.locator('mediacurator-dashboard')).toBeVisible({ timeout: 15000 });
    await pause(2500);

    await page.getByLabel(`Edit ${rulesetName}`).click();
    await expect(page.getByTestId('mc:node')).toBeVisible({ timeout: 10000 });
    await pause(3000);

    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.locator('mediacurator-dashboard')).toBeVisible({ timeout: 10000 });
    await pause(1500);

    await page.getByLabel(`Curate now ${rulesetName}`).click();
    await expect(page.getByTestId('mc:plan')).toBeVisible({ timeout: 10000 });
    await pause(3000);

    await page.getByTestId('mc:plan-execute').click();
    await expect(page.getByTestId('mc:activity-log')).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId('mc:run-row').first().getByTestId('mc:run-moved')).toHaveText('1');
    await pause(4000);
  });
});
