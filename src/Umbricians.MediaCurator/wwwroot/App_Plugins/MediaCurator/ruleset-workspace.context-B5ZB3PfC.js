import { UmbArrayState as p } from "@umbraco-cms/backoffice/observable-api";
import { tryExecute as c } from "@umbraco-cms/backoffice/resources";
import { UmbEntityNamedDetailWorkspaceContextBase as l, UmbWorkspaceIsNewRedirectController as m } from "@umbraco-cms/backoffice/workspace";
import { M as u } from "./sdk.gen-DBpJrjP9.js";
import { e as d, f as h, M as y, g as b } from "./bundle.manifests-Cd7jemzI.js";
import { html as _, css as E, customElement as O } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as R } from "@umbraco-cms/backoffice/lit-element";
var v = Object.getOwnPropertyDescriptor, w = (i, t, e, r) => {
  for (var a = r > 1 ? void 0 : r ? v(t, e) : t, s = i.length - 1, n; s >= 0; s--)
    (n = i[s]) && (a = n(a) || a);
  return a;
};
let o = class extends R {
  render() {
    return _`
      <umb-entity-detail-workspace-editor .backPath=${d}>
        <umb-workspace-header-name-editable slot="header"></umb-workspace-header-name-editable>
      </umb-entity-detail-workspace-editor>
    `;
  }
};
o.styles = [
  E`
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `
];
o = w([
  O("mc-ruleset-workspace-editor")
], o);
class U extends l {
  constructor(t) {
    super(t, {
      workspaceAlias: b,
      entityType: y,
      detailRepositoryAlias: h
    }), this.rules = this._data.createObservablePartOfCurrent((e) => e?.rules ?? []), this.scopeRootKey = this._data.createObservablePartOfCurrent((e) => e?.scopeRootKey), this.enabled = this._data.createObservablePartOfCurrent((e) => e?.enabled ?? !0), this.#e = new p([], (e) => e.alias), this.providers = this.#e.asObservable(), this.routes.setRoutes([
      {
        path: "create/parent/:parentEntityType/:parentUnique",
        component: o,
        setup: async (e, r) => {
          const a = r.match.params.parentEntityType, s = r.match.params.parentUnique === "null" ? null : r.match.params.parentUnique;
          await this.createScaffold({ parent: { entityType: a, unique: s } }), new m(
            this,
            this,
            this.getHostElement().shadowRoot.querySelector("umb-router-slot")
          );
        }
      },
      {
        path: "edit/:unique",
        component: o,
        setup: (e, r) => {
          this.load(r.match.params.unique);
        }
      }
    ]), this.#t();
  }
  #e;
  async #t() {
    const { data: t } = await c(this, u.getProviders());
    t && this.#e.setValue(t);
  }
  updateProperty(t, e) {
    this._data.updateCurrent({ [t]: e });
  }
}
export {
  U as McRulesetWorkspaceContext,
  U as api
};
//# sourceMappingURL=ruleset-workspace.context-B5ZB3PfC.js.map
