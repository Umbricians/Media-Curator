import { css as h, state as _, customElement as d, html as u } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as v } from "@umbraco-cms/backoffice/lit-element";
import { k as f } from "./curate-media.summary-Daao9zsU.js";
var y = Object.defineProperty, E = Object.getOwnPropertyDescriptor, l = (e) => {
  throw TypeError(e);
}, i = (e, t, r, s) => {
  for (var a = s > 1 ? void 0 : s ? E(t, r) : t, o = e.length - 1, c; o >= 0; o--)
    (c = e[o]) && (a = (s ? c(t, r, a) : c(a)) || a);
  return s && a && y(t, r, a), a;
}, g = (e, t, r) => t.has(e) || l("Cannot " + r), k = (e, t, r) => t.has(e) ? l("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), O = (e, t, r) => (g(e, t, "access private method"), r), p, m;
let n = class extends v {
  constructor() {
    super(...arguments), k(this, p), this._permanent = !1;
  }
  get permanentlyDelete() {
    return this._permanent;
  }
  render() {
    return u`
      <uui-checkbox
        data-mark="mc:delete-empty-folders"
        label="Delete empty folders permanently"
        .checked=${this._permanent}
        @change=${O(this, p, m)}
      ></uui-checkbox>
      <small>${f(this._permanent)}</small>
    `;
  }
};
p = /* @__PURE__ */ new WeakSet();
m = function(e) {
  this._permanent = e.target.checked, this.dispatchEvent(new Event("change"));
};
n.styles = [
  h`
      :host {
        display: block;
      }
      small {
        display: block;
        margin: var(--uui-size-space-1) 0 0 calc(var(--uui-size-space-5) + var(--uui-size-space-2));
        color: var(--uui-color-text-alt);
      }
    `
];
i([
  _()
], n.prototype, "_permanent", 2);
n = i([
  d("mc-empty-folders-option")
], n);
//# sourceMappingURL=empty-folders-option.element-D3LkYZp1.js.map
