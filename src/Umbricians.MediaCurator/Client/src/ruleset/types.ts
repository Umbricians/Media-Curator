import type { RulesetModel } from "../api/index.js";
import type { MC_RULESET_ENTITY_TYPE } from "./entity.js";

/** A ruleset as the backoffice workspace and repositories see it. */
export type McRulesetDetailModel = Omit<RulesetModel, "key" | "dateUpdated"> & {
  entityType: typeof MC_RULESET_ENTITY_TYPE;
  unique: string;
  dateUpdated?: string;
};

/** Minimal ruleset shape for the tree and item lookups (e.g. delete confirmation). */
export type McRulesetItemModel = {
  entityType: typeof MC_RULESET_ENTITY_TYPE;
  unique: string;
  name: string;
};
