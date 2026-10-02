import type { RulesetModel } from "../../api/index.js";
import { MC_ROOT_ENTITY_TYPE, MC_RULESET_ENTITY_TYPE } from "../entity.js";

export const MC_RULESET_TREE_ICON = "icon-mindmap";

export type McRulesetTreeItemModel = {
  unique: string;
  parent: { unique: null; entityType: typeof MC_ROOT_ENTITY_TYPE };
  name: string;
  entityType: typeof MC_RULESET_ENTITY_TYPE;
  hasChildren: false;
  isFolder: false;
  icon: string;
};

/** Maps a ruleset from the API to a flat child of the tree root. */
export function toTreeItem(ruleset: Pick<RulesetModel, "key" | "name">): McRulesetTreeItemModel {
  return {
    unique: ruleset.key,
    parent: { unique: null, entityType: MC_ROOT_ENTITY_TYPE },
    name: ruleset.name,
    entityType: MC_RULESET_ENTITY_TYPE,
    hasChildren: false,
    isFolder: false,
    icon: MC_RULESET_TREE_ICON,
  };
}

/** Sorts rulesets by name (case-insensitive) without mutating the input. */
export function sortRulesetsByName<T extends { name: string }>(rulesets: ReadonlyArray<T>): T[] {
  return [...rulesets].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
}
