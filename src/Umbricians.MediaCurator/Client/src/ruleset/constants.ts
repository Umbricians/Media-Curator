import { UmbPathPattern } from "@umbraco-cms/backoffice/router";
import { UMB_WORKSPACE_PATH_PATTERN } from "@umbraco-cms/backoffice/workspace";

/** Shared identifiers for the Media Curator area of the Settings section. */

import { MC_ROOT_ENTITY_TYPE, MC_RULESET_ENTITY_TYPE } from "./entity.js";

export { MC_EMPTY_GUID, MC_ROOT_ENTITY_TYPE, MC_RULESET_ENTITY_TYPE } from "./entity.js";

export const MC_SECTION_PATHNAME = "settings";

// Sidebar
export const MC_MENU_ALIAS = "Umbricians.MediaCurator.Menu";
export const MC_MENU_ITEM_ALIAS = "Umbricians.MediaCurator.MenuItem.Rulesets";

// Tree
export const MC_TREE_ALIAS = "Umbricians.MediaCurator.Tree.Rulesets";
export const MC_TREE_REPOSITORY_ALIAS = "Umbricians.MediaCurator.Repository.Ruleset.Tree";

// Repositories
export const MC_RULESET_DETAIL_REPOSITORY_ALIAS = "Umbricians.MediaCurator.Repository.Ruleset.Detail";
export const MC_RULESET_DETAIL_STORE_ALIAS = "Umbricians.MediaCurator.Store.Ruleset.Detail";
export const MC_RULESET_ITEM_REPOSITORY_ALIAS = "Umbricians.MediaCurator.Repository.Ruleset.Item";
export const MC_RULESET_ITEM_STORE_ALIAS = "Umbricians.MediaCurator.Store.Ruleset.Item";

// Workspaces
export const MC_ROOT_WORKSPACE_ALIAS = "Umbricians.MediaCurator.Workspace.Root";
export const MC_RULESET_WORKSPACE_ALIAS = "Umbricians.MediaCurator.Workspace.Ruleset";

export const MC_ROOT_WORKSPACE_PATH = UMB_WORKSPACE_PATH_PATTERN.generateAbsolute({
  sectionName: MC_SECTION_PATHNAME,
  entityType: MC_ROOT_ENTITY_TYPE,
});

export const MC_RULESET_WORKSPACE_PATH = UMB_WORKSPACE_PATH_PATTERN.generateAbsolute({
  sectionName: MC_SECTION_PATHNAME,
  entityType: MC_RULESET_ENTITY_TYPE,
});

export const MC_RULESET_CREATE_PATH_PATTERN = new UmbPathPattern<{
  parentEntityType: string;
  parentUnique: string | null;
}>("create/parent/:parentEntityType/:parentUnique", MC_RULESET_WORKSPACE_PATH);

export const MC_RULESET_EDIT_PATH_PATTERN = new UmbPathPattern<{ unique: string }>(
  "edit/:unique",
  MC_RULESET_WORKSPACE_PATH,
);
