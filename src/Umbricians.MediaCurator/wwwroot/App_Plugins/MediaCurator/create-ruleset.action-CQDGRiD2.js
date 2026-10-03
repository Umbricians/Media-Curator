import { UmbEntityActionBase as e } from "@umbraco-cms/backoffice/entity-action";
import { c as a, a as n } from "./bundle.manifests-Bs7oDyPq.js";
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
//# sourceMappingURL=create-ruleset.action-CQDGRiD2.js.map
