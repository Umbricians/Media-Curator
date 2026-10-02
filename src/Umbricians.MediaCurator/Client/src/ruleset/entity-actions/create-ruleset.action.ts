import { UmbEntityActionBase } from "@umbraco-cms/backoffice/entity-action";
import { MC_RULESET_CREATE_PATH_PATTERN, MC_ROOT_ENTITY_TYPE } from "../constants.js";

export class McCreateRulesetEntityAction extends UmbEntityActionBase<never> {
  override async execute() {
    const path = MC_RULESET_CREATE_PATH_PATTERN.generateAbsolute({
      parentEntityType: MC_ROOT_ENTITY_TYPE,
      parentUnique: "null",
    });
    history.pushState({}, "", path);
  }
}

export { McCreateRulesetEntityAction as api };
