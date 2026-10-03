import { nothing as m, html as p, guard as _, css as k, state as b, customElement as E } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as x } from "@umbraco-cms/backoffice/modal";
import { d as C } from "./rule-tree.logic-40nRL1No.js";
const M = /* @__PURE__ */ new Set(["mappings", "palette", "customTable"]);
function P(e) {
  switch (e.type) {
    case "select":
      return {
        editorUiAlias: "Umb.PropertyEditorUi.Dropdown",
        config: [{ alias: "items", value: (e.options ?? []).map((t) => ({ name: t.label, value: t.value })) }]
      };
    case "toggle":
      return { editorUiAlias: "Umb.PropertyEditorUi.Toggle", config: [] };
    case "number":
      return { editorUiAlias: "Umb.PropertyEditorUi.Decimal", config: [] };
    default:
      return {
        editorUiAlias: M.has(e.alias) ? "Umb.PropertyEditorUi.TextArea" : "Umb.PropertyEditorUi.TextBox",
        config: []
      };
  }
}
function D(e, t) {
  const i = e?.[t.alias];
  return i ?? t.defaultValue ?? void 0;
}
function F(e, t) {
  const i = D(e, t);
  switch (t.type) {
    case "select":
      return i === void 0 ? [] : [String(i)];
    case "toggle":
      return typeof i == "boolean" ? i : String(i ?? "").toLowerCase() === "true";
    case "number": {
      if (i === void 0 || i === "") return;
      const r = typeof i == "number" ? i : Number(i);
      return Number.isFinite(r) ? r : void 0;
    }
    default:
      return i === void 0 ? "" : String(i);
  }
}
function T(e, t) {
  switch (e.type) {
    case "select": {
      const i = Array.isArray(t) ? t[0] : t;
      return i == null || i === "" ? void 0 : String(i);
    }
    case "toggle":
      return t === !0 || t === "true" ? "true" : "false";
    case "number":
      return t == null || t === "" || !Number.isFinite(Number(t)) ? void 0 : String(t);
    default:
      return t == null ? "" : String(t);
  }
}
function L(e, t) {
  return (e?.settingsFields ?? []).map((i) => ({ alias: i.alias, value: F(t, i) }));
}
function O(e, t, i) {
  const r = { ...t ?? {} };
  for (const a of e?.settingsFields ?? []) {
    const n = i.find((U) => U.alias === a.alias);
    if (!n) continue;
    const o = T(a, n.value);
    o === void 0 ? delete r[a.alias] : r[a.alias] = o;
  }
  return r;
}
function R(e, t) {
  return e.providerAlias === t.alias ? e : { ...e, providerAlias: t.alias, settings: C(t) };
}
function V(e) {
  const t = e.condition?.trim();
  return { ...e, condition: t ? e.condition : void 0 };
}
var N = Object.defineProperty, W = Object.getOwnPropertyDescriptor, A = (e) => {
  throw TypeError(e);
}, v = (e, t, i, r) => {
  for (var a = r > 1 ? void 0 : r ? W(t, i) : t, n = e.length - 1, o; n >= 0; n--)
    (o = e[n]) && (a = (r ? o(t, i, a) : o(a)) || a);
  return r && a && N(t, i, a), a;
}, f = (e, t, i) => t.has(e) || A("Cannot " + i), l = (e, t, i) => (f(e, t, "read from private field"), i ? i.call(e) : t.get(e)), y = (e, t, i) => t.has(e) ? A("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), z = (e, t, i, r) => (f(e, t, "write to private field"), t.set(e, i), i), c = (e, t, i) => (f(e, t, "access private method"), i), B = (e, t, i, r) => ({
  set _(a) {
    z(e, t, a);
  },
  get _() {
    return l(e, t, r);
  }
}), d, s, h, g, $, w, S;
const I = [
  { name: "Skip this level", value: "skip" },
  { name: "Use 'Unsorted' folder", value: "unsorted" },
  { name: "Leave item in place", value: "stop" }
];
let u = class extends x {
  constructor() {
    super(...arguments), y(this, s), this._dataset = [], y(this, d, 0);
  }
  connectedCallback() {
    super.connectedCallback(), !(this._rule || !this.data) && (this._rule = { ...this.data.rule, settings: { ...this.data.rule.settings ?? {} } }, c(this, s, g).call(this));
  }
  render() {
    const e = this._rule, t = this.data;
    if (!e || !t) return m;
    const i = l(this, s, h), r = i?.settingsFields ?? [];
    return p`
      <umb-body-layout headline=${t.isNew ? "Add rule" : i?.name ?? "Rule"}>
        <div id="content">
          <uui-box>
            <umb-property-layout label="Provider" orientation="vertical" mandatory>
              <uui-select
                slot="editor"
                data-mark="mc:settings-provider"
                label="Provider"
                .value=${e.providerAlias}
                .options=${t.providers.map((a) => ({ name: a.name, value: a.alias, selected: a.alias === e.providerAlias }))}
                @change=${c(this, s, $)}></uui-select>
            </umb-property-layout>
            ${t.isChild ? p`<umb-property-layout
                  label="Condition"
                  description="Only apply this rule when the parent rule's folder value equals this (case-insensitive). Leave empty to always apply."
                  orientation="vertical">
                  <uui-input
                    slot="editor"
                    data-mark="mc:settings-condition"
                    label="Condition"
                    placeholder="Always"
                    .value=${e.condition ?? ""}
                    @input=${(a) => {
      this._rule && (this._rule = { ...this._rule, condition: a.target.value || void 0 });
    }}></uui-input>
                </umb-property-layout>` : m}
            <umb-property-layout
              label="If unresolved"
              description="What happens when this rule can't produce a folder for an item."
              orientation="vertical">
              <uui-select
                slot="editor"
                data-mark="mc:settings-fallback"
                label="If unresolved"
                .options=${I.map((a) => ({ ...a, selected: a.value === e.fallback }))}
                @change=${(a) => {
      this._rule && (this._rule = { ...this._rule, fallback: a.target.value });
    }}></uui-select>
            </umb-property-layout>
          </uui-box>
          ${r.length ? p`<uui-box>
                <umb-property-dataset
                  .value=${_([l(this, d)], () => this._dataset)}
                  @change=${c(this, s, w)}>
                  ${r.map((a) => {
      const n = P(a);
      return p`<umb-property
                      label=${a.label}
                      description=${a.description ?? ""}
                      alias=${a.alias}
                      data-mark=${"mc:setting-" + a.alias}
                      property-editor-ui-alias=${n.editorUiAlias}
                      .config=${_([l(this, d), a.alias], () => n.config)}
                      .appearance=${{ labelOnTop: !0 }}></umb-property>`;
    })}
                </umb-property-dataset>
              </uui-box>` : m}
        </div>
        <div slot="actions">
          <uui-button data-mark="mc:settings-close" label="Close" @click=${() => this._rejectModal()}></uui-button>
          <uui-button data-mark="mc:settings-save" look="primary" color="positive" label="Save" @click=${() => c(this, s, S).call(this)}></uui-button>
        </div>
      </umb-body-layout>
    `;
  }
};
d = /* @__PURE__ */ new WeakMap();
s = /* @__PURE__ */ new WeakSet();
h = function() {
  return this.data?.providers.find((e) => e.alias === this._rule?.providerAlias);
};
g = function() {
  this._dataset = L(l(this, s, h), this._rule?.settings), B(this, d)._++;
};
$ = function(e) {
  const t = e.target.value, i = this.data?.providers.find((r) => r.alias === t);
  !i || !this._rule || (this._rule = R(this._rule, i), c(this, s, g).call(this));
};
w = function(e) {
  const t = e.target.value;
  !this._rule || !Array.isArray(t) || (this._rule = { ...this._rule, settings: O(l(this, s, h), this._rule.settings, t) });
};
S = function() {
  this._rule && (this.value = { rule: V(this._rule) }, this._submitModal());
};
u.styles = [
  k`
      #content {
        display: flex;
        flex-direction: column;
        gap: var(--uui-size-layout-1);
      }
      umb-property-layout {
        padding: var(--uui-size-space-3) 0;
      }
      uui-select,
      uui-input,
      uui-textarea {
        width: 100%;
      }
      umb-property {
        display: block;
        width: 100%;
        /* each umb-property carries 20px top/bottom padding internally; halve the gap */
        margin-block: calc(var(--uui-size-layout-1) / -2);
      }
    `
];
v([
  b()
], u.prototype, "_rule", 2);
v([
  b()
], u.prototype, "_dataset", 2);
u = v([
  E("mc-rule-settings-modal")
], u);
const X = u;
export {
  u as McRuleSettingsModalElement,
  X as default
};
//# sourceMappingURL=rule-settings-modal.element-BYD_cwSE.js.map
