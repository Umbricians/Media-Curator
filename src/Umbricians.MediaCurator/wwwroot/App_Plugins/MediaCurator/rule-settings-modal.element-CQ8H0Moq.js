import { nothing as p, html as c, css as S, state as f, customElement as U } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as w } from "@umbraco-cms/backoffice/modal";
import { d as E } from "./rule-tree.logic-40nRL1No.js";
const k = /* @__PURE__ */ new Set(["mappings", "palette", "customTable"]);
function x(e) {
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
        editorUiAlias: k.has(e.alias) ? "Umb.PropertyEditorUi.TextArea" : "Umb.PropertyEditorUi.TextBox",
        config: []
      };
  }
}
function C(e, t) {
  const i = e?.[t.alias];
  return i ?? t.defaultValue ?? void 0;
}
function P(e, t) {
  const i = C(e, t);
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
function M(e, t) {
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
function D(e, t) {
  return (e?.settingsFields ?? []).map((i) => ({ alias: i.alias, value: P(t, i) }));
}
function F(e, t, i) {
  const r = { ...t ?? {} };
  for (const a of e?.settingsFields ?? []) {
    const o = i.find(($) => $.alias === a.alias);
    if (!o) continue;
    const n = M(a, o.value);
    n === void 0 ? delete r[a.alias] : r[a.alias] = n;
  }
  return r;
}
function T(e, t) {
  return e.providerAlias === t.alias ? e : { ...e, providerAlias: t.alias, settings: E(t) };
}
function L(e) {
  const t = e.condition?.trim();
  return { ...e, condition: t ? e.condition : void 0 };
}
var O = Object.defineProperty, R = Object.getOwnPropertyDescriptor, g = (e) => {
  throw TypeError(e);
}, h = (e, t, i, r) => {
  for (var a = r > 1 ? void 0 : r ? R(t, i) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (a = (r ? n(t, i, a) : n(a)) || a);
  return r && a && O(t, i, a), a;
}, b = (e, t, i) => t.has(e) || g("Cannot " + i), m = (e, t, i) => (b(e, t, "read from private field"), i ? i.call(e) : t.get(e)), N = (e, t, i) => t.has(e) ? g("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), u = (e, t, i) => (b(e, t, "access private method"), i), s, d, v, y, _, A;
const V = [
  { name: "Skip this level", value: "skip" },
  { name: "Use 'Unsorted' folder", value: "unsorted" },
  { name: "Leave item in place", value: "stop" }
];
let l = class extends w {
  constructor() {
    super(...arguments), N(this, s), this._dataset = [];
  }
  connectedCallback() {
    super.connectedCallback(), !(this._rule || !this.data) && (this._rule = { ...this.data.rule, settings: { ...this.data.rule.settings ?? {} } }, u(this, s, v).call(this));
  }
  render() {
    const e = this._rule, t = this.data;
    if (!e || !t) return p;
    const i = m(this, s, d), r = i?.settingsFields ?? [];
    return c`
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
                @change=${u(this, s, y)}></uui-select>
            </umb-property-layout>
            ${t.isChild ? c`<umb-property-layout
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
                </umb-property-layout>` : p}
            <umb-property-layout
              label="If unresolved"
              description="What happens when this rule can't produce a folder for an item."
              orientation="vertical">
              <uui-select
                slot="editor"
                data-mark="mc:settings-fallback"
                label="If unresolved"
                .options=${V.map((a) => ({ ...a, selected: a.value === e.fallback }))}
                @change=${(a) => {
      this._rule && (this._rule = { ...this._rule, fallback: a.target.value });
    }}></uui-select>
            </umb-property-layout>
          </uui-box>
          ${r.length ? c`<uui-box>
                <umb-property-dataset .value=${this._dataset} @change=${u(this, s, _)}>
                  ${r.map((a) => {
      const o = x(a);
      return c`<umb-property
                      label=${a.label}
                      description=${a.description ?? ""}
                      alias=${a.alias}
                      data-mark=${"mc:setting-" + a.alias}
                      property-editor-ui-alias=${o.editorUiAlias}
                      .config=${o.config}
                      .appearance=${{ labelOnTop: !0 }}></umb-property>`;
    })}
                </umb-property-dataset>
              </uui-box>` : p}
        </div>
        <div slot="actions">
          <uui-button data-mark="mc:settings-close" label="Close" @click=${() => this._rejectModal()}></uui-button>
          <uui-button data-mark="mc:settings-save" look="primary" color="positive" label="Save" @click=${() => u(this, s, A).call(this)}></uui-button>
        </div>
      </umb-body-layout>
    `;
  }
};
s = /* @__PURE__ */ new WeakSet();
d = function() {
  return this.data?.providers.find((e) => e.alias === this._rule?.providerAlias);
};
v = function() {
  this._dataset = D(m(this, s, d), this._rule?.settings);
};
y = function(e) {
  const t = e.target.value, i = this.data?.providers.find((r) => r.alias === t);
  !i || !this._rule || (this._rule = T(this._rule, i), u(this, s, v).call(this));
};
_ = function(e) {
  const t = e.target.value;
  !this._rule || !Array.isArray(t) || (this._rule = { ...this._rule, settings: F(m(this, s, d), this._rule.settings, t) });
};
A = function() {
  this._rule && (this.value = { rule: L(this._rule) }, this._submitModal());
};
l.styles = [
  S`
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
h([
  f()
], l.prototype, "_rule", 2);
h([
  f()
], l.prototype, "_dataset", 2);
l = h([
  U("mc-rule-settings-modal")
], l);
const W = l;
export {
  l as McRuleSettingsModalElement,
  W as default
};
//# sourceMappingURL=rule-settings-modal.element-CQ8H0Moq.js.map
