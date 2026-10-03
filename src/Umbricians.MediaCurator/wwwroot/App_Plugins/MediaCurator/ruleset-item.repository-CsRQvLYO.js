import { UmbItemServerDataSourceBase as m, UmbItemRepositoryBase as i } from "@umbraco-cms/backoffice/repository";
import { M as c } from "./sdk.gen-LMy3RyM3.js";
import { t as p } from "./ruleset.mapper-BGaYOYYC.js";
import { b as n } from "./bundle.manifests-DU2jrn2u.js";
class u extends m {
  constructor(e) {
    super(e, { mapper: p });
  }
  async getItems(e) {
    if (!e) throw new Error("Uniques are missing");
    const { data: r, error: s } = await c.getRulesets(), o = r?.filter((a) => e.includes(a.key));
    return { data: this._getMappedItems(o), error: s };
  }
}
class R extends i {
  constructor(e) {
    super(e, u, n);
  }
}
export {
  R as McRulesetItemRepository,
  R as api
};
//# sourceMappingURL=ruleset-item.repository-CsRQvLYO.js.map
