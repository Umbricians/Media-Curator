import { html as o, nothing as q, css as T, state as g, customElement as C } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as P } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT as E } from "@umbraco-cms/backoffice/notification";
import { M as w } from "./sdk.gen-DBpJrjP9.js";
import { M as S } from "./ruleset-workspace.context-token-CizKWrw5.js";
var O = Object.defineProperty, R = Object.getOwnPropertyDescriptor, A = (t) => {
  throw TypeError(t);
}, f = (t, e, i, s) => {
  for (var a = s > 1 ? void 0 : s ? R(e, i) : e, n = t.length - 1, v; n >= 0; n--)
    (v = t[n]) && (a = (s ? v(e, i, a) : v(a)) || a);
  return s && a && O(e, i, a), a;
}, b = (t, e, i) => e.has(t) || A("Cannot " + i), d = (t, e, i) => (b(t, e, "read from private field"), e.get(t)), y = (t, e, i) => e.has(t) ? A("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), $ = (t, e, i, s) => (b(t, e, "write to private field"), e.set(t, i), i), l = (t, e, i) => (b(t, e, "access private method"), i), c, p, r, h, _, m, k, M;
let u = class extends P {
  constructor() {
    super(), y(this, r), this._choices = /* @__PURE__ */ new Map(), this._loading = !1, y(this, c), y(this, p), this.consumeContext(E, (t) => $(this, p, t)), this.consumeContext(S, (t) => {
      t && this.observe(
        t.unique,
        (e) => {
          !e || e === d(this, c) || ($(this, c, e), l(this, r, m).call(this));
        },
        "_unique"
      );
    });
  }
  render() {
    const t = this._report;
    return o`
      <uui-box headline="Property requirements" data-mark="mc:requirements">
        <uui-button
          slot="header-actions"
          data-mark="mc:requirements-check"
          label="Check again"
          look="secondary"
          ?disabled=${this._loading}
          @click=${() => l(this, r, m).call(this)}
        ></uui-button>
        ${t ? o`
              <p class="intro">
                ${t.allSatisfied ? o`<span data-mark="mc:requirements-ok"
                      >All requirements are satisfied. Providers in this ruleset have everything they need.</span
                    >` : "The providers in this ruleset need the following media type properties. Nothing is changed without your approval — choose what to do per property."}
                Based on the last saved version of this ruleset.
              </p>
              ${(t.items ?? []).length > 0 ? l(this, r, M).call(this, t) : q}
              ${t.allSatisfied ? q : o`<div class="actions">
                    <uui-button
                      data-mark="mc:requirements-apply"
                      label="Apply approved changes"
                      look="primary"
                      color="positive"
                      @click=${() => l(this, r, k).call(this)}
                    ></uui-button>
                  </div>`}
            ` : o`<uui-loader></uui-loader>`}
      </uui-box>
    `;
  }
};
c = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakMap();
r = /* @__PURE__ */ new WeakSet();
h = function(t, e) {
  d(this, p)?.peek(t, { data: { message: e } });
};
_ = function(t, e) {
  return `${t}::${e}`;
};
m = async function() {
  if (!d(this, c)) return;
  this._loading = !0;
  const t = await w.checkRequirements({ path: { rulesetKey: d(this, c) } });
  if (this._loading = !1, !t.data) {
    l(this, r, h).call(this, "danger", "Could not check requirements.");
    return;
  }
  const e = /* @__PURE__ */ new Map();
  for (const i of t.data.items ?? [])
    i.status !== "satisfied" && e.set(l(this, r, _).call(this, i.requirementAlias, i.mediaTypeAlias), "create");
  this._choices = e, this._report = t.data;
};
k = async function() {
  const t = this._report;
  if (!t) return;
  const e = [];
  for (const a of t.items ?? []) {
    if (a.status === "satisfied") continue;
    const n = this._choices.get(l(this, r, _).call(this, a.requirementAlias, a.mediaTypeAlias));
    !n || n === "decline" || e.push({
      requirementAlias: a.requirementAlias,
      mediaTypeAlias: a.mediaTypeAlias,
      action: n,
      mapToPropertyAlias: n === "map" ? a.candidatePropertyAlias : void 0
    });
  }
  const i = await w.applyRequirements({ body: e });
  if (i.error) {
    l(this, r, h).call(this, "danger", `Could not apply: ${JSON.stringify(i.error)}`);
    return;
  }
  const s = i.data;
  (s.errors ?? []).length > 0 ? l(this, r, h).call(this, "danger", `Some changes failed: ${(s.errors ?? []).join("; ")}`) : l(this, r, h).call(this, "positive", `Provisioned ${(s.createdProperties ?? []).length} propert(y/ies), mapped ${(s.mappedProperties ?? []).length}.`), await l(this, r, m).call(this);
};
M = function(t) {
  return o`
      <uui-table>
        <uui-table-head>
          <uui-table-head-cell>Property</uui-table-head-cell>
          <uui-table-head-cell>Media type</uui-table-head-cell>
          <uui-table-head-cell>Status</uui-table-head-cell>
          <uui-table-head-cell>Action</uui-table-head-cell>
        </uui-table-head>
        ${(t.items ?? []).map((e) => {
    const i = l(this, r, _).call(this, e.requirementAlias, e.mediaTypeAlias), s = this._choices.get(i);
    return o`
            <uui-table-row data-mark="mc:requirement-row">
              <uui-table-cell>
                <strong>${e.requirementName}</strong><br />
                <small>${e.requirementAlias}${e.mandatory ? " (required)" : " (optional)"}</small>
              </uui-table-cell>
              <uui-table-cell>${e.mediaTypeAlias}</uui-table-cell>
              <uui-table-cell>
                <uui-tag
                  color=${e.status === "satisfied" ? "positive" : e.status === "partialMatch" ? "warning" : "danger"}
                  data-mark="mc:requirement-status"
                  >${e.status}</uui-tag
                >
              </uui-table-cell>
              <uui-table-cell>
                ${e.status === "satisfied" ? o`—` : o`<uui-select
                      data-mark="mc:requirement-action"
                      label="Action"
                      .options=${[
      { name: `Create '${e.requirementAlias}'`, value: "create", selected: s === "create" },
      ...e.candidatePropertyAlias ? [{ name: `Map onto '${e.candidatePropertyAlias}'`, value: "map", selected: s === "map" }] : [],
      { name: "Decline (provider degraded)", value: "decline", selected: s === "decline" }
    ]}
                      @change=${(a) => {
      this._choices = new Map(this._choices).set(i, a.target.value);
    }}
                    ></uui-select>`}
              </uui-table-cell>
            </uui-table-row>
          `;
  })}
      </uui-table>
    `;
};
u.styles = [
  T`
      :host {
        display: block;
        padding: var(--uui-size-layout-1);
      }
      .intro {
        margin-top: 0;
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        margin-top: var(--uui-size-space-5);
      }
    `
];
f([
  g()
], u.prototype, "_report", 2);
f([
  g()
], u.prototype, "_choices", 2);
f([
  g()
], u.prototype, "_loading", 2);
u = f([
  C("mc-ruleset-requirements-view")
], u);
const K = u;
export {
  u as McRulesetRequirementsViewElement,
  K as default
};
//# sourceMappingURL=ruleset-requirements-view.element-B8qh3WcV.js.map
