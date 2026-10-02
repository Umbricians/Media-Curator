import type { RulesetModel } from "../api/index.js";
import { MC_EMPTY_GUID, MC_RULESET_ENTITY_TYPE } from "./entity.js";
import type { McRulesetDetailModel, McRulesetItemModel } from "./types.js";

export function toDetailModel(model: RulesetModel): McRulesetDetailModel {
  const { key, ...rest } = model;
  return { ...rest, entityType: MC_RULESET_ENTITY_TYPE, unique: key, rules: model.rules ?? [] };
}

export function toRulesetModel(detail: McRulesetDetailModel): RulesetModel {
  const { unique, entityType: _entityType, dateUpdated, ...rest } = detail;
  return { ...rest, key: unique, dateUpdated: dateUpdated ?? new Date().toISOString() };
}

export function toItemModel(model: RulesetModel): McRulesetItemModel {
  return { entityType: MC_RULESET_ENTITY_TYPE, unique: model.key, name: model.name };
}

export function scaffoldRuleset(unique: string, preset: Partial<McRulesetDetailModel> = {}): McRulesetDetailModel {
  return {
    entityType: MC_RULESET_ENTITY_TYPE,
    unique,
    name: "",
    scopeRootKey: MC_EMPTY_GUID,
    cultureName: null,
    enabled: true,
    rules: [],
    ...preset,
  };
}
