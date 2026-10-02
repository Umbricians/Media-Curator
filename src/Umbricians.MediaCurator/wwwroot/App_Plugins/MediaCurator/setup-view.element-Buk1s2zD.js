import { html as v, state as m, customElement as C } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as M } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT as k } from "@umbraco-cms/backoffice/notification";
import { M as f } from "./sdk.gen-BsXwShFH.js";
import { n as l, r as E } from "./root-view.styles-zhTrEhZY.js";
var O = Object.defineProperty, I = Object.getOwnPropertyDescriptor, S = (t) => {
  throw TypeError(t);
}, u = (t, e, i, n) => {
  for (var s = n > 1 ? void 0 : n ? I(e, i) : e, c = t.length - 1, d; c >= 0; c--)
    (d = t[c]) && (s = (n ? d(e, i, s) : d(s)) || s);
  return n && s && O(e, i, s), s;
}, g = (t, e, i) => e.has(t) || S("Cannot " + i), p = (t, e, i) => (g(t, e, "read from private field"), i ? i.call(t) : e.get(t)), h = (t, e, i) => e.has(t) ? S("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), b = (t, e, i, n) => (g(t, e, "write to private field"), e.set(t, i), i), _ = (t, e, i) => (g(t, e, "access private method"), i), a, o, w, y;
let r = class extends M {
  constructor() {
    super(), h(this, o), this._saving = !1, h(this, a), this.consumeContext(k, (t) => {
      b(this, a, t);
    });
  }
  connectedCallback() {
    super.connectedCallback(), _(this, o, w).call(this);
  }
  render() {
    const t = this._settings;
    return t ? v`
      <uui-box headline="Setup" data-mark="mc:settings">
        <p>
          When AI recognition is enabled, Media Curator can store the image description on each media
          item so classification can run again without re-sending the image to the vision model.
        </p>
        <div class="form">
          <uui-label for="mc-persist-description">Save image description</uui-label>
          <uui-toggle
            id="mc-persist-description"
            data-mark="mc:persist-description"
            label="Save image description"
            .checked=${t.persistImageDescription}
            @change=${(e) => {
      this._settings = {
        ...t,
        persistImageDescription: e.target.checked
      };
    }}
          ></uui-toggle>
        </div>
        <div class="actions">
          <uui-button
            data-mark="mc:settings-save"
            label="Save settings"
            look="primary"
            color="positive"
            .state=${this._saving ? "waiting" : void 0}
            @click=${_(this, o, y)}
          ></uui-button>
        </div>
      </uui-box>
    ` : v`<uui-loader></uui-loader>`;
  }
};
a = /* @__PURE__ */ new WeakMap();
o = /* @__PURE__ */ new WeakSet();
w = async function() {
  try {
    const t = await f.getSettings();
    this._settings = t.data ?? { persistImageDescription: !0 };
  } catch {
    l(p(this, a), "danger", "Could not load Media Curator settings. Check the server log and reload.");
  }
};
y = async function() {
  if (this._settings) {
    this._saving = !0;
    try {
      const t = await f.saveSettings({ body: this._settings });
      if (t.error || !t.data) {
        l(p(this, a), "danger", `Could not save settings: ${JSON.stringify(t.error ?? "no data")}`);
        return;
      }
      this._settings = t.data, l(p(this, a), "positive", "Settings saved.");
    } finally {
      this._saving = !1;
    }
  }
};
r.styles = [E];
u([
  m()
], r.prototype, "_settings", 2);
u([
  m()
], r.prototype, "_saving", 2);
r = u([
  C("mc-root-setup-view")
], r);
const P = r;
export {
  r as McRootSetupViewElement,
  P as default
};
//# sourceMappingURL=setup-view.element-Buk1s2zD.js.map
