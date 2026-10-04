import { UmbEntityActionBase as e } from "@umbraco-cms/backoffice/entity-action";
import { c as a, a as n } from "./bundle.manifests-jPVwANZA.js";
class r extends e {
  async execute() {
    const t = a.generateAbsolute({
      parentEntityType: n,
      parentUnique: "null"
    });
    history.pushState({}, "", t);
  }
}
export {
  r as McCreateRulesetEntityAction,
  r as api
};
//# sourceMappingURL=create-ruleset.action-lrx9B1eF.js.map
