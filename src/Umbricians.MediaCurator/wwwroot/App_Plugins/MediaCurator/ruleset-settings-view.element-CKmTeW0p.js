import { html as g, css as E, state as _, customElement as R } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as C } from "@umbraco-cms/backoffice/lit-element";
import { d as m } from "./bundle.manifests-DGmFItzI.js";
import { M as S } from "./ruleset-workspace.context-token-IBg3RzgH.js";
var w = Object.defineProperty, K = Object.getOwnPropertyDescriptor, v = (e) => {
  throw TypeError(e);
}, c = (e, t, o, a) => {
  for (var s = a > 1 ? void 0 : a ? K(t, o) : t, l = e.length - 1, p; l >= 0; l--)
    (p = e[l]) && (s = (a ? p(t, o, s) : p(s)) || s);
  return a && s && w(t, o, s), s;
}, d = (e, t, o) => t.has(e) || v("Cannot " + o), y = (e, t, o) => (d(e, t, "read from private field"), t.get(e)), u = (e, t, o) => t.has(e) ? v("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, o), M = (e, t, o, a) => (d(e, t, "write to private field"), t.set(e, o), o), h = (e, t, o) => (d(e, t, "access private method"), o), i, n, f, b;
let r = class extends C {
  constructor() {
    super(), u(this, n), this._enabled = !0, u(this, i), this.consumeContext(S, (e) => {
      M(this, i, e), e && (this.observe(e.scopeRootKey, (t) => this._scopeRootKey = t, "_scopeRootKey"), this.observe(e.enabled, (t) => this._enabled = t, "_enabled"));
    });
  }
  render() {
    const e = !!this._scopeRootKey && this._scopeRootKey !== m;
    return g`
      <uui-box>
        <umb-property-layout
          label="Scope folder"
          description="The media folder this ruleset curates. Items in it (and its subfolders) are sorted into folders built by the rules. Each folder can have only one ruleset."
          orientation="vertical"
          mandatory
        >
          <umb-input-media
            slot="editor"
            data-mark="mc:scope"
            .max=${1}
            .selection=${e ? [this._scopeRootKey] : []}
            @change=${h(this, n, f)}
          ></umb-input-media>
        </umb-property-layout>
        <umb-property-layout
          label="Enabled"
          description="Whether this ruleset is active."
          orientation="vertical"
        >
          <uui-toggle
            slot="editor"
            data-mark="mc:enabled"
            label="Enabled"
            .checked=${this._enabled}
            @change=${h(this, n, b)}
          ></uui-toggle>
        </umb-property-layout>
      </uui-box>
    `;
  }
};
i = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
f = function(e) {
  const t = e.target.selection ?? [];
  y(this, i)?.updateProperty("scopeRootKey", t[0] ?? m);
};
b = function(e) {
  y(this, i)?.updateProperty("enabled", e.target.checked);
};
r.styles = [
  E`
      :host {
        display: block;
        padding: var(--uui-size-layout-1);
      }
    `
];
c([
  _()
], r.prototype, "_scopeRootKey", 2);
c([
  _()
], r.prototype, "_enabled", 2);
r = c([
  R("mc-ruleset-settings-view")
], r);
const $ = r;
export {
  r as McRulesetSettingsViewElement,
  $ as default
};
//# sourceMappingURL=ruleset-settings-view.element-CKmTeW0p.js.map
