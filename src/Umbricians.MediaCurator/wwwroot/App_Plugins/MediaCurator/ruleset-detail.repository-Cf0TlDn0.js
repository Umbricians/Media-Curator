import { UmbDetailRepositoryBase as n } from "@umbraco-cms/backoffice/repository";
import { tryExecute as a } from "@umbraco-cms/backoffice/resources";
import { UmbId as c } from "@umbraco-cms/backoffice/id";
import { M as s } from "./sdk.gen-Bq8ZVkDW.js";
import { s as u, a as o, b as l } from "./ruleset.mapper-B7mZF1kB.js";
import { MC_RULESET_DETAIL_STORE_CONTEXT as d } from "./ruleset-detail.store-CPa94nJU.js";
class m {
  #e;
  constructor(e) {
    this.#e = e;
  }
  async createScaffold(e = {}) {
    return { data: u(c.new(), e) };
  }
  async read(e) {
    if (!e) throw new Error("Unique is missing");
    const { data: t, error: r } = await a(this.#e, s.getRuleset({ path: { key: e } }));
    return r || !t ? { error: r } : { data: o(t) };
  }
  async create(e) {
    return this.#t(e);
  }
  async update(e) {
    return this.#t(e);
  }
  async delete(e) {
    if (!e) throw new Error("Unique is missing");
    return a(this.#e, s.deleteRuleset({ path: { key: e } }));
  }
  // The API saves with PUT for both create and update; the key comes from the model.
  async #t(e) {
    const { data: t, error: r } = await a(this.#e, s.saveRuleset({ body: l(e) }));
    return r || !t ? { error: r } : { data: o(t) };
  }
}
class w extends n {
  constructor(e) {
    super(e, m, d);
  }
}
export {
  w as McRulesetDetailRepository,
  w as api
};
//# sourceMappingURL=ruleset-detail.repository-Cf0TlDn0.js.map
