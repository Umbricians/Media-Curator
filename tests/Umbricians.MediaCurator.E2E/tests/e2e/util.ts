/* Shared cleanup utilities so MediaCurator specs are idempotent and re-runnable. */

import { expect, type Locator, type Page } from '@playwright/test';

const base = () => process.env.UMBRACO_URL || process.env.URL || 'http://localhost:40264';

type RawApi = {
  get(url: string): Promise<{ json(): Promise<unknown>; status(): number }>;
  put(url: string, body?: unknown): Promise<unknown>;
  delete(url: string): Promise<unknown>;
};

type UmbracoApi = RawApi & {
  mediaType: { getByName(name: string): Promise<MediaTypeModel> };
};

interface MediaTypeModel {
  id: string;
  properties: Array<{ alias: string; container?: { id: string } }>;
  containers: Array<{ id: string; name: string }>;
  [key: string]: unknown;
}

/** Deletes every MediaCurator ruleset whose name starts with the given prefix. */
export async function deleteRulesetsByPrefix(umbracoApi: UmbracoApi, prefix: string): Promise<void> {
  const response = await umbracoApi.get(`${base()}/umbraco/mediacurator/api/v1/rulesets`);
  const rulesets = (await response.json()) as Array<{ key: string; name: string }>;
  for (const ruleset of rulesets ?? []) {
    if (ruleset.name?.startsWith(prefix)) {
      await umbracoApi.delete(`${base()}/umbraco/mediacurator/api/v1/rulesets/${ruleset.key}`);
    }
  }
}

/** Removes a MediaCurator-provisioned property (and an emptied Media Curator group)
 * from a media type, restoring the pre-provisioning schema for test repeatability. */
export async function removeProvisionedProperty(
  umbracoApi: UmbracoApi,
  mediaTypeName: string,
  propertyAlias: string,
): Promise<void> {
  const mediaType = await umbracoApi.mediaType.getByName(mediaTypeName);
  if (!mediaType?.properties?.some((p) => p.alias === propertyAlias)) {
    return;
  }

  const properties = mediaType.properties.filter((p) => p.alias !== propertyAlias);
  const usedContainerIds = new Set(properties.map((p) => p.container?.id).filter(Boolean));
  const containers = mediaType.containers.filter(
    (c) => c.name !== 'Media Curator' || usedContainerIds.has(c.id),
  );

  const { id, ...rest } = mediaType;
  await umbracoApi.put(`${base()}/umbraco/management/api/v1/media-type/${id}`, {
    ...rest,
    properties,
    containers,
  });
}

type RuleInput = {
  /** Canvas node id of the parent rule (e.g. "rule:0"); omit to add a root rule. */
  parent?: string;
  providerAlias: string;
  /** Text settings keyed by setting alias. */
  settings?: Record<string, string>;
  condition?: string;
};

/**
 * Adds a rule on the designer canvas and fills in the rule settings sidebar that opens for it.
 * Closed sidebars linger in the DOM, so panel locators take the last match.
 */
export async function addRuleViaPanel(page: Page, rule: RuleInput): Promise<void> {
  if (rule.parent) {
    const parent = page.locator(`[data-node-id="${rule.parent}"]`);
    await parent.hover();
    await parent.getByTestId('mc:node-add-child').click();
  } else {
    await page.getByTestId('mc:canvas-add').click();
  }

  const panel = page.locator('mc-rule-settings-modal').last();
  await panel.getByTestId('mc:settings-provider').locator('select').selectOption(rule.providerAlias);
  for (const [alias, value] of Object.entries(rule.settings ?? {})) {
    await panel.getByTestId(`mc:setting-${alias}`).locator('input, textarea').first().fill(value);
  }
  if (rule.condition !== undefined) {
    await panel.getByTestId('mc:settings-condition').locator('input').fill(rule.condition);
  }
  await panel.getByTestId('mc:settings-save').click();
}

/* ---------- Navigation: Settings section > Media Curator ---------- */

const ROOT_PATH = '/umbraco/section/settings/workspace/mc-root/edit/null';
const RULESET_PATH = '/umbraco/section/settings/workspace/mc-ruleset';

export type RootTab = 'setup' | 'reanalyze' | 'activity';
const rootTabs: Record<RootTab, { label: string; mark: string }> = {
  setup: { label: 'Setup', mark: 'mc:settings' },
  reanalyze: { label: 'Re-analyze image', mark: 'mc:reanalyze' },
  activity: { label: 'Activity log', mark: 'mc:activity-log' },
};

/**
 * Opens the Media Curator root workspace (Settings section) and switches to the given tab, waiting for its box.
 * The tab is clicked rather than deep-linked: `.../mc-root/edit/null/view/<tab>` loads but always shows Setup.
 */
export async function openMediaCuratorRoot(page: Page, tab: RootTab = 'setup'): Promise<void> {
  await page.goto(ROOT_PATH);
  await expect(page.getByTestId(rootTabs.setup.mark)).toBeVisible({ timeout: 15000 });
  if (tab !== 'setup') {
    await page.locator('umb-workspace-editor').getByRole('tab', { name: rootTabs[tab].label, exact: true }).click();
    await expect(page.getByTestId(rootTabs[tab].mark)).toBeVisible({ timeout: 15000 });
  }
}

/** The "Media Curator" tree root in the Settings sidebar. */
export function mediaCuratorTreeRoot(page: Page): Locator {
  return page.locator('umb-section-sidebar uui-menu-item[label="Media Curator"]').first();
}

/** A ruleset's item in the Media Curator tree (under the root). Expand the root first with expandMediaCuratorTree. */
export function rulesetTreeItem(page: Page, name: string): Locator {
  return mediaCuratorTreeRoot(page).locator(`uui-menu-item[label="${name}"]`);
}

/** Expands the Media Curator tree root so rulesets are listed. */
export async function expandMediaCuratorTree(page: Page): Promise<void> {
  const root = mediaCuratorTreeRoot(page);
  await expect(root).toBeVisible({ timeout: 15000 });
  if ((await root.getAttribute('show-children')) === null) {
    await root.locator('#caret-button').first().click();
  }
}

/** Opens an existing ruleset by clicking it in the Media Curator tree. */
export async function openRulesetFromTree(page: Page, name: string, tab?: RulesetTab): Promise<void> {
  await openMediaCuratorRoot(page);
  await expandMediaCuratorTree(page);
  const item = rulesetTreeItem(page, name);
  await item.locator('#label-button').first().click();
  await page.waitForURL(/\/mc-ruleset\/edit\//, { timeout: 15000 });
  await expect(workspaceNameInput(page)).toHaveValue(name, { timeout: 15000 });
  if (tab) await openRulesetTab(page, tab);
}

function workspaceNameInput(page: Page): Locator {
  return page.locator('umb-workspace-header-name-editable').locator('input').first();
}

export type RulesetTab = 'design' | 'settings' | 'requirements' | 'curate';
const rulesetTabLabels: Record<RulesetTab, string> = {
  design: 'Design',
  settings: 'Settings',
  requirements: 'Requirements',
  curate: 'Curate',
};

/** Switches the ruleset workspace to a tab. Scoped to the workspace so "Settings" does not hit the section tab. */
export async function openRulesetTab(page: Page, tab: RulesetTab): Promise<void> {
  await page
    .locator('umb-workspace-editor')
    .getByRole('tab', { name: rulesetTabLabels[tab], exact: true })
    .click();
  if (tab === 'design') {
    await page.waitForURL(/\/view\/design|\/(edit\/[^/]+|create\/parent\/mc-root\/null)$/);
  } else {
    await page.waitForURL(new RegExp(`/view/${tab}$`));
  }
}

/** Picks a folder in a media picker input (umb-input-media) by the card's select checkbox, then submits. */
export async function pickMediaFolder(page: Page, input: Locator, folderName: string): Promise<void> {
  await input.getByRole('button').first().click();
  const modal = page.locator('umb-backoffice-modal-container');
  const card = modal.locator('uui-card-media').filter({ hasText: folderName });
  await card.waitFor({ timeout: 10000 });
  await card.hover();
  await card.locator('#select-checkbox').click({ force: true });
  await modal.getByRole('button', { name: /^(Submit|Choose|Select)$/i }).last().click();
  await expect(input).toContainText(folderName, { timeout: 10000 });
}

/**
 * Opens the create-ruleset workspace, names it, picks its scope folder on the Settings tab,
 * and returns to the Design tab (canvas) ready for rules.
 */
export async function startNewRuleset(
  page: Page,
  options: { name: string; scopeFolderName: string },
): Promise<void> {
  await page.goto(`${RULESET_PATH}/create/parent/mc-root/null`);
  await expect(page.locator('mc-rule-flow')).toBeVisible({ timeout: 15000 });
  await workspaceNameInput(page).fill(options.name);
  await openRulesetTab(page, 'settings');
  await pickMediaFolder(page, page.getByTestId('mc:scope'), options.scopeFolderName);
  await openRulesetTab(page, 'design');
  await expect(page.locator('mc-rule-flow')).toBeVisible();
}

/** The ruleset workspace's footer Save button. */
export function rulesetSaveButton(page: Page): Locator {
  return page.locator('umb-workspace-footer').getByRole('button', { name: 'Save', exact: true });
}

/** Clicks the footer Save and waits until the workspace is on edit/<key>; returns the ruleset key. */
export async function saveRuleset(page: Page): Promise<string> {
  await rulesetSaveButton(page).click();
  await page.waitForURL(/\/mc-ruleset\/edit\/[0-9a-f-]{36}/, { timeout: 15000 });
  return /\/mc-ruleset\/edit\/([0-9a-f-]{36})/.exec(page.url())![1];
}

/** Opens a ruleset by key directly via its edit route. */
export async function openRuleset(page: Page, key: string, tab?: RulesetTab): Promise<void> {
  await page.goto(`${RULESET_PATH}/edit/${key}`);
  await expect(page.locator('mc-rule-flow')).toBeVisible({ timeout: 15000 });
  if (tab) await openRulesetTab(page, tab);
}

/**
 * Deletes a ruleset through its tree item and the Umbraco confirm modal. Delete is the ruleset's only
 * entity action, so Umbraco renders it inline on the tree item rather than behind the "..." menu;
 * fall back to the menu if more actions are added later.
 */
export async function deleteRulesetFromTree(page: Page, name: string): Promise<void> {
  await expandMediaCuratorTree(page);
  const item = rulesetTreeItem(page, name);
  await item.locator('#menu-item').first().hover();
  const actionsMenu = item.getByRole('button', { name: `View actions for '${name}'` });
  if (await actionsMenu.count()) {
    await actionsMenu.first().click();
    await page.locator('umb-entity-action-list').getByRole('button', { name: 'Delete' }).click();
  } else {
    await item.getByRole('button', { name: 'Delete', exact: true }).first().click();
  }
  await page.locator('umb-backoffice-modal-container').getByRole('button', { name: 'Delete' }).click();
}

/* ---------- Curate tab ---------- */

/** On the ruleset's Curate tab: runs a dry run and waits for the plan summary. */
export async function runDryRun(page: Page): Promise<void> {
  if (!/\/view\/curate$/.test(page.url())) await openRulesetTab(page, 'curate');
  await expect(page.getByTestId('mc:plan')).toBeVisible({ timeout: 10000 });
  await page.getByTestId('mc:dry-run').click();
  await expect(page.getByTestId('mc:plan-summary')).toBeVisible({ timeout: 15000 });
}

/** Executes the current plan and waits until it has finished (plan cleared, run listed for the folder). */
export async function executePlan(page: Page): Promise<void> {
  await page.getByTestId('mc:plan-execute').click();
  await expect(page.getByTestId('mc:plan-summary')).toHaveCount(0, { timeout: 30000 });
  await expect(page.getByTestId('mc:ruleset-run').first()).toBeVisible({ timeout: 15000 });
}
