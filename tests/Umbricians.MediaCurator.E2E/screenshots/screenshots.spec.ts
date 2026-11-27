import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Locator, Page } from '@playwright/test';
import { expect, test } from '../tests/e2e/fixtures';
import { openMediaCuratorRoot, openRuleset } from '../tests/e2e/util';

// Takes every screenshot in docs/images from a fresh demo site (see scripts/screenshots.mjs). The AI decides the
// subjects and people, so which folders and photos are shown is chosen from its results, never written in here.

const here = dirname(fileURLToPath(import.meta.url));
const photosDir = join(here, 'photos');
const imagesDir = resolve(here, '../../../docs/images');
const base = () => process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264';
const api = (path: string) => `${base()}/umbraco/umbriciansmediacurator/api/v1/${path}`;
const aiApi = (path: string) => `${base()}/umbraco/ai/management/api/v1/${path}`;
const managementApi = (path: string) => `${base()}/umbraco/management/api/v1/${path}`;

const libraryFolder = 'Uploads';
const rulesetName = 'Photo library';
const subjectScheme = 'demo-photo-subject';
const connectionAlias = 'screenshots-openai';
const profileAlias = 'screenshots-chat';
// Any OpenAI chat model that accepts images; the first of these the connection offers is used.
const preferredModels = (process.env.SCREENSHOTS_OPENAI_MODEL || 'gpt-4.1-mini,gpt-4o-mini,gpt-5-mini').split(',');

type Api = Parameters<Parameters<typeof test>[2]>[0]['umbracoApi'];
type MediaItem = { id: string; name: string; isFolder: boolean; hasChildren: boolean };

test('screenshots', async ({ umbracoApi, umbracoUi }) => {
  const page = umbracoUi.page;

  await test.step('connect the demo to OpenAI', async () => {
    await connectOpenAi(umbracoApi);
    const settings = await (await umbracoApi.get(api('settings'))).json();
    await umbracoApi.put(api('settings'), {
      ...settings,
      aiEnabled: true,
      descriptionProfileAlias: profileAlias,
      decisionProfileAlias: profileAlias,
      detectPeople: true,
    });
  });

  const folderId = await test.step('upload the photos into one folder', () => uploadPhotos(umbracoApi));

  const rulesetKey = await test.step('create the ruleset', async () => {
    const response = await umbracoApi.put(api('rulesets'), {
      scopeRootKey: folderId,
      name: rulesetName,
      enabled: true,
      rules: [
        {
          providerAlias: 'Umbricians.MediaCurator.Date',
          settings: { format: 'yyyy/MMMM', source: 'dateTaken' },
          fallback: 'skip',
          children: [
            {
              providerAlias: 'Umbricians.MediaCurator.Classification',
              settings: { scheme: subjectScheme, source: 'property', naming: 'name' },
              fallback: 'unsorted',
              children: [{ providerAlias: 'Umbricians.MediaCurator.Color', settings: { mode: 'dominant' }, fallback: 'skip', children: [] }],
            },
          ],
        },
      ],
    });
    expect(response.ok(), await response.text()).toBe(true);
    return ((await response.json()) as { key: string }).key;
  });

  await umbracoUi.goToBackOffice();

  await test.step('the properties it asks to add', async () => {
    await openRuleset(page, rulesetKey, 'requirements');
    const requirements = page.getByTestId('mc:requirements');
    await expect(requirements.getByTestId('mc:requirement-row').first()).toBeVisible();
    await shot(requirements, 'requirements');
    // A demo that ran the script before already has the properties, and offers nothing to apply.
    const apply = requirements.getByTestId('mc:requirements-apply');
    if (await apply.isEnabled().catch(() => false)) await apply.click({ timeout: 30000 });
    await expect(page.getByTestId('mc:requirements-ok')).toBeVisible();
  });

  await test.step('the rule designer', async () => {
    // Opened again, so the rules no longer show the properties they needed before they were approved.
    await openRuleset(page, rulesetKey, 'design');
    const canvas = page.getByTestId('mc:canvas');
    await expect(canvas.getByTestId('mc:node')).toHaveCount(3);
    await settle(page);
    await shot(page.locator('umb-workspace-editor'), 'rule-designer');
  });

  const before = await test.step('the folder before curating', async () => {
    await openMedia(page, folderId);
    await expect(page.locator('umb-media-collection uui-card-media').first()).toBeVisible();
    await settle(page);
    return page.screenshot({ animations: 'disabled' });
  });

  await test.step('Curate images on the folder', async () => {
    const item = mediaTreeItem(page, libraryFolder);
    await item.locator('#menu-item').first().hover();
    await item.getByRole('button', { name: `View actions for '${libraryFolder}'` }).click();
    const menu = page.locator('umb-entity-action-list');
    await menu.getByRole('button', { name: 'Curate images' }).hover();
    await shot(page.locator('umb-section-sidebar').locator('..'), 'curate-action', { clipTo: menu, pad: 220 });
    await page.keyboard.press('Escape');
  });

  await test.step('analyse the photos with AI', async () => {
    const images = (await children(umbracoApi, folderId)).filter((item) => !item.isFolder);
    const results: { mediaName?: string; classificationCode?: string; containsPeople?: boolean; error?: string }[] = [];
    for (let at = 0; at < images.length; at += 8) {
      // An AI call now and then fails or times out, so a batch gets two more tries. Slow batches can outlast the
      // backoffice token, so it's refreshed before each one.
      let response;
      for (let attempt = 1; attempt <= 3; attempt++) {
        await umbracoApi.isLoginStateValid();
        response = await umbracoApi.post(api('recognition/reanalyze'), {
          mediaKeys: images.slice(at, at + 8).map((image) => image.id),
          classificationSchemeAlias: subjectScheme,
        });
        if (response.ok()) break;
        console.log(`  Analysing photos ${at + 1}-${at + 8} failed (HTTP ${response.status()}); attempt ${attempt} of 3.`);
      }
      expect(response!.ok(), `HTTP ${response!.status()}: ${(await response!.text()).slice(0, 300)}`).toBe(true);
      results.push(...((await response!.json()) as { results: typeof results }).results);
    }
    const failed = results.filter((result) => result.error || !result.classificationCode);
    console.log(
      `Analysed ${results.length} photos: ${results.length - failed.length} with a subject, ` +
        `${results.filter((result) => result.containsPeople).length} showing people.`,
    );
    for (const result of failed) console.log(`  ${result.mediaName}: ${result.error ?? 'no subject'}`);
    expect(failed.length, 'Most photos should get a subject from the AI.').toBeLessThan(results.length / 5);
  });

  await test.step('the preview before anything moves', async () => {
    await openRuleset(page, rulesetKey, 'curate');
    await page.getByTestId('mc:dry-run').click();
    // The plan resolves every rule for every photo, so it takes a while.
    await expect(page.getByTestId('mc:plan-summary')).toBeVisible({ timeout: 10 * 60 * 1000 });
    await settle(page);
    await shot(page.getByTestId('mc:plan'), 'preview');
    await page.getByTestId('mc:plan-execute').click();
    await expect(page.getByTestId('mc:plan-summary')).toHaveCount(0, { timeout: 10 * 60 * 1000 });
    await expect(page.getByTestId('mc:ruleset-run').first()).toBeVisible();
  });

  await test.step('the activity log', async () => {
    await openMediaCuratorRoot(page, 'activity');
    await expect(page.getByTestId('mc:run-row').first()).toBeVisible();
    await settle(page);
    await shot(page.getByTestId('mc:activity-log'), 'activity-log');
  });

  const tree = await test.step('read the sorted folders', async () => {
    await umbracoApi.isLoginStateValid(); // planning and moving can outlast the token
    return folderTree(umbracoApi, folderId);
  });

  await test.step('before and after', async () => {
    // The fullest path, so the tree shows every level with something in it.
    const path = fullestPath(tree);
    await openMedia(page, path.at(-1)!.id);
    await expandTreeTo(page, path);
    await settle(page);
    await expect(page.locator('umb-media-collection uui-card-media').first()).toBeVisible();
    await settle(page);
    const after = await page.screenshot({ animations: 'disabled' });
    await sideBySide(page, before, after);
  });

  await test.step('what the AI says about a few photos', async () => {
    const picks: MediaItem[] = [];
    for (const subject of ['Food', 'Nature', 'People', 'Places', 'Products']) {
      const photo = await firstPhotoIn(umbracoApi, tree, subject);
      if (photo && picks.length < 3) picks.push(photo);
    }
    expect(picks.length).toBeGreaterThan(0);
    await openMediaCuratorRoot(page, 'reanalyze');
    const view = page.getByTestId('mc:reanalyze');
    for (const photo of picks) await pickImage(page, view.getByTestId('mc:reanalyze-media'), photo.name);
    await view.getByTestId('mc:reanalyze-run').click();
    await expect(view.getByTestId('mc:reanalyze-result')).toHaveCount(picks.length, { timeout: 5 * 60 * 1000 });
    await settle(page);
    await shot(view, 'ai-analysis');
  });

  await test.step('people in the media tree', async () => {
    // The folder with the most photos under a People folder, opened so its photos show their badges too.
    const people = tree
      .filter((node) => node.photos > 0 && node.path.some((step) => step.name === 'People'))
      .sort((a, b) => b.photos - a.photos)[0];
    test.skip(!people, 'The AI put no photo in a People folder.');
    await openMedia(page, people!.path.at(-1)!.id);
    await expandTreeTo(page, people!.path);
    const folder = mediaTreeItem(page, people!.path.at(-1)!.name);
    if ((await folder.getAttribute('show-children')) === null) await folder.locator('#caret-button').first().click();
    await expect(folder.locator('uui-menu-item').first()).toBeVisible();
    await settle(page);
    await shot(page.locator('umb-section-sidebar'), 'people-in-tree');
  });
});

// ---------- Setup ----------

async function connectOpenAi(umbracoApi: Api) {
  const existing = await umbracoApi.get(aiApi(`connections/${connectionAlias}`));
  let connectionId: string;
  if (existing.ok()) {
    connectionId = ((await existing.json()) as { id: string }).id;
  } else {
    const created = await umbracoApi.post(aiApi('connections'), {
      alias: connectionAlias,
      name: 'OpenAI (screenshots)',
      providerId: 'openai',
      // Resolved on the server from the demo's configuration, so the key never passes through here.
      settings: { apiKey: '$Umbraco:AI:Secrets:OpenAIApiKey' },
      isActive: true,
    });
    expect(created.ok(), await created.text()).toBe(true);
    connectionId = ((await (await umbracoApi.get(aiApi(`connections/${connectionAlias}`))).json()) as { id: string }).id;
  }

  const modelsResponse = await umbracoApi.get(aiApi(`connections/${connectionId}/models?capability=Chat`));
  const modelsText = await modelsResponse.text();
  expect(modelsResponse.ok(), `Listing the OpenAI models failed: ${modelsText.slice(0, 500)}`).toBe(true);
  const ids = [...modelsText.matchAll(/"(?:modelId|id)"\s*:\s*"([^"]+)"/g)].map((match) => match[1]);
  const modelId = preferredModels.find((model) => ids.includes(model));
  expect(modelId, `None of ${preferredModels.join(', ')} is offered (${ids.slice(0, 30).join(', ')}); set SCREENSHOTS_OPENAI_MODEL.`)
    .toBeTruthy();

  if (!(await umbracoApi.get(aiApi(`profiles/${profileAlias}`))).ok()) {
    const profile = await umbracoApi.post(aiApi('profiles'), {
      alias: profileAlias,
      name: 'Screenshots',
      capability: 'Chat',
      model: { providerId: 'openai', modelId },
      connectionId,
      settings: { $type: 'chat', contextIds: [], guardrailIds: [] },
      tags: [],
    });
    expect(profile.ok(), await profile.text()).toBe(true);
  }
}

async function uploadPhotos(umbracoApi: Api): Promise<string> {
  await umbracoApi.media.ensureNameNotExists(libraryFolder);
  const folderId = await umbracoApi.media.createDefaultMediaFolder(libraryFolder);
  const imageType = await umbracoApi.mediaType.getByName('Image');
  // Downloaded by scripts/download-photos.mjs; named by what they show, as an editor would.
  const photos = JSON.parse(readFileSync(join(here, 'photos.json'), 'utf8')) as { file: string; subject: string }[];
  for (const photo of photos) {
    const path = join(photosDir, photo.file);
    expect(existsSync(path), `${photo.file} is missing: run node scripts/download-photos.mjs`).toBe(true);
    const temporaryFileId = crypto.randomUUID();
    await umbracoApi.temporaryFile.create(temporaryFileId, photo.file, 'image/jpeg', path);
    await umbracoApi.media.createDefaultMediaItemWithParentId(photo.subject, folderId, {
      mediaTypeId: imageType.id,
      temporaryFileId,
    });
  }
  return folderId;
}

// ---------- Reading the sorted folders ----------

type TreeNode = { path: MediaItem[]; photos: number };

async function children(umbracoApi: Api, parentId: string): Promise<MediaItem[]> {
  const response = await umbracoApi.get(managementApi(`tree/media/children?parentId=${parentId}&skip=0&take=500`));
  const body = (await response.json()) as {
    items: { id: string; hasChildren: boolean; mediaType: { icon?: string }; variants: { name: string }[] }[];
  };
  // Tree items don't say which are folders; folders are the ones with children or the folder icon.
  return body.items.map((item) => ({
    id: item.id,
    name: item.variants[0].name,
    hasChildren: item.hasChildren,
    isFolder: item.hasChildren || (item.mediaType.icon ?? '').startsWith('icon-folder'),
  }));
}

/** Every folder under the library, with its path from the library and how many photos it holds directly. */
async function folderTree(umbracoApi: Api, rootId: string): Promise<TreeNode[]> {
  const nodes: TreeNode[] = [];
  const visit = async (path: MediaItem[]) => {
    const items = await children(umbracoApi, path.at(-1)!.id);
    nodes.push({ path, photos: items.filter((item) => !item.isFolder).length });
    for (const folder of items.filter((item) => item.isFolder)) await visit([...path, folder]);
  };
  await visit([{ id: rootId, name: libraryFolder, isFolder: true, hasChildren: true }]);
  return nodes;
}

/**
 * The path to show expanded in the "after" shot: down to a folder at the deepest level with the most photos, from
 * an early year so the expanded tree stays near the top of the window.
 */
function fullestPath(tree: TreeNode[]): MediaItem[] {
  const depth = Math.max(...tree.map((node) => node.path.length));
  const years = [...new Set(tree.filter((node) => node.path.length > 1).map((node) => node.path[1].name))].sort();
  const earlyYears = years.slice(0, Math.ceil(years.length / 2));
  const leaves = tree.filter((node) => node.path.length === depth && node.photos > 0);
  const early = leaves.filter((node) => earlyYears.includes(node.path[1].name));
  return [...(early.length ? early : leaves)].sort((a, b) => b.photos - a.photos)[0].path;
}

async function firstPhotoIn(umbracoApi: Api, tree: TreeNode[], subject?: string): Promise<MediaItem | undefined> {
  const folders = tree.filter((node) => node.photos > 0 && (!subject || node.path.some((step) => step.name === subject)));
  for (const folder of folders) {
    const photo = (await children(umbracoApi, folder.path.at(-1)!.id)).find((item) => !item.isFolder);
    if (photo) return photo;
  }
  return undefined;
}

// ---------- Backoffice ----------

/** Picks an image in a media picker by searching for its name. */
async function pickImage(page: Page, input: Locator, name: string) {
  // Explicit timeouts: without them a click on something that never appears waits for the whole test timeout.
  const timeout = 30000;
  // The "+ Choose" button, not the cards of photos already picked.
  await input.getByRole('button', { name: 'Choose', exact: true }).click({ timeout });
  const modal = page.locator('umb-backoffice-modal-container');
  await modal.locator('input[placeholder="Type to search..."]').first().fill(name, { timeout });
  const card = modal.locator('uui-card-media').filter({ hasText: name.slice(0, 20) }).first();
  await card.hover({ timeout });
  await card.locator('#select-checkbox').click({ force: true, timeout });
  await modal.getByRole('button', { name: 'Choose', exact: true }).click({ timeout });
  await expect(modal.locator('uui-card-media')).toHaveCount(0);
}

async function openMedia(page: Page, id: string) {
  await page.goto(`${base()}/umbraco/section/media/workspace/media/edit/${id}`);
  await expect(page.locator('umb-section-sidebar')).toBeVisible();
}

function mediaTreeItem(page: Page, name: string): Locator {
  return page.locator('umb-section-sidebar').locator(`uui-menu-item[label="${name}"]`).first();
}

/** Expands the media tree down a path, so the screenshot shows each level. */
async function expandTreeTo(page: Page, path: MediaItem[]) {
  for (const folder of path.slice(0, -1)) {
    const item = mediaTreeItem(page, folder.name);
    await expect(item).toBeVisible();
    if ((await item.getAttribute('show-children')) === null) await item.locator('#caret-button').first().click();
  }
  await expect(mediaTreeItem(page, path.at(-1)!.name)).toBeVisible();
}

/** Waits for images, the network and notifications to finish, so nothing is half-loaded or covered in a screenshot. */
async function settle(page: Page) {
  await page.waitForLoadState('networkidle');
  await expect(page.locator('uui-toast-notification')).toHaveCount(0, { timeout: 30000 });
  await page.evaluate(async () => {
    const images = [...document.querySelectorAll('img')].filter((image) => !image.complete);
    await Promise.all(images.map((image) => new Promise((done) => image.addEventListener('load', done, { once: true }))));
  });
  await page.mouse.move(0, 0);
}

// ---------- Saving ----------

/**
 * Saves the part of the window an element covers (or another element plus some padding), cut off at the window's
 * edges: elements inside the backoffice's scrolling areas are often taller than what is visible.
 */
async function shot(target: Locator, name: string, options?: { clipTo?: Locator; pad?: number }) {
  const page = target.page();
  await (options?.clipTo ?? target).scrollIntoViewIfNeeded();
  const box = (await (options?.clipTo ?? target).boundingBox())!;
  const pad = options?.clipTo ? (options.pad ?? 24) : 0;
  const viewport = page.viewportSize()!;
  const left = Math.max(0, box.x - pad);
  const top = Math.max(0, box.y - pad);
  const right = Math.min(viewport.width, box.x + box.width + pad);
  const bottom = Math.min(viewport.height, box.y + box.height + pad);
  await page.screenshot({
    path: join(imagesDir, `media-curator-${name}.png`),
    animations: 'disabled',
    clip: { x: left, y: top, width: right - left, height: bottom - top },
  });
}

/** Puts the two captures next to each other on one page, labelled, and saves that. */
async function sideBySide(page: Page, before: Buffer, after: Buffer) {
  const sheet = await page.context().newPage();
  const image = (png: Buffer) => `data:image/png;base64,${png.toString('base64')}`;
  await sheet.setContent(`<!doctype html>
    <style>
      body { margin: 0; padding: 24px; display: flex; gap: 24px; align-items: flex-start; background: #f3f3f5;
             font: 600 20px/1.2 system-ui, sans-serif; color: #1b264f; width: max-content; }
      figure { margin: 0; } figcaption { margin: 0 0 10px 4px; }
      img { display: block; width: auto; height: 640px; border-radius: 6px; box-shadow: 0 1px 6px #0002; }
    </style>
    <figure><figcaption>Before</figcaption><img src="${image(before)}"></figure>
    <figure><figcaption>After</figcaption><img src="${image(after)}"></figure>`);
  await sheet.locator('body').screenshot({ path: join(imagesDir, 'media-curator-before-and-after.png') });
  await sheet.close();
}
