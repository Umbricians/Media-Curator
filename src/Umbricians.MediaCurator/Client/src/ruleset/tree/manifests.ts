import { MC_ROOT_ENTITY_TYPE, MC_RULESET_ENTITY_TYPE } from "../entity.js";
import { MC_TREE_ALIAS, MC_TREE_REPOSITORY_ALIAS } from "../constants.js";

export const manifests: Array<UmbExtensionManifest> = [
  {
    type: "repository",
    alias: MC_TREE_REPOSITORY_ALIAS,
    name: "Media Curator Ruleset Tree Repository",
    api: () => import("./ruleset-tree.repository.js"),
  },
  {
    type: "tree",
    kind: "default",
    alias: MC_TREE_ALIAS,
    name: "Media Curator Ruleset Tree",
    meta: { repositoryAlias: MC_TREE_REPOSITORY_ALIAS },
  },
  {
    type: "treeItem",
    kind: "default",
    alias: "Umbricians.MediaCurator.TreeItem.Ruleset",
    name: "Media Curator Ruleset Tree Item",
    forEntityTypes: [MC_ROOT_ENTITY_TYPE, MC_RULESET_ENTITY_TYPE],
  },
  {
    type: "entityAction",
    kind: "reloadTreeItemChildren",
    alias: "Umbricians.MediaCurator.EntityAction.Root.ReloadChildren",
    name: "Reload Media Curator Tree Children Entity Action",
    forEntityTypes: [MC_ROOT_ENTITY_TYPE],
  },
];
