import { nothing as z, html as n, state as y, customElement as w } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as $ } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT as C } from "@umbraco-cms/backoffice/notification";
import { M as R } from "./sdk.gen-DBpJrjP9.js";
import { n as o, r as E } from "./root-view.styles-zhTrEhZY.js";
var K = Object.defineProperty, M = Object.getOwnPropertyDescriptor, g = (e) => {
  throw TypeError(e);
}, c = (e, a, t, i) => {
  for (var l = i > 1 ? void 0 : i ? M(a, t) : a, h = e.length - 1, m; h >= 0; h--)
    (m = e[h]) && (l = (i ? m(a, t, l) : m(l)) || l);
  return i && l && K(a, t, l), l;
}, _ = (e, a, t) => a.has(e) || g("Cannot " + t), u = (e, a, t) => (_(e, a, "read from private field"), t ? t.call(e) : a.get(e)), p = (e, a, t) => a.has(e) ? g("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(e) : a.set(e, t), I = (e, a, t, i) => (_(e, a, "write to private field"), a.set(e, t), t), f = (e, a, t) => (_(e, a, "access private method"), t), s, d, v, b;
let r = class extends $ {
  constructor() {
    super(), p(this, d), this._mediaKeys = [], this._results = [], this._reanalyzing = !1, p(this, s), this.consumeContext(C, (e) => {
      I(this, s, e);
    });
  }
  render() {
    return n`
      <uui-box headline="Re-analyze image" data-mark="mc:reanalyze">
        <p>
          Force a fresh AI vision pass on selected images. Cached descriptions and tags are ignored
          and replaced with new results.
        </p>
        <div class="form">
          <uui-label>Images</uui-label>
          <umb-input-media
            data-mark="mc:reanalyze-media"
            .max=${20}
            .selection=${this._mediaKeys}
            @change=${f(this, d, v)}
          ></umb-input-media>
        </div>
        <div class="actions">
          <uui-button
            data-mark="mc:reanalyze-run"
            label="Re-analyze selected"
            look="primary"
            color="positive"
            .state=${this._reanalyzing ? "waiting" : void 0}
            ?disabled=${this._mediaKeys.length === 0}
            @click=${f(this, d, b)}
          ></uui-button>
        </div>
        ${this._results.length > 0 ? n`
              <uui-table>
                <uui-table-head>
                  <uui-table-head-cell>Image</uui-table-head-cell>
                  <uui-table-head-cell>Description</uui-table-head-cell>
                  <uui-table-head-cell>Tags</uui-table-head-cell>
                  <uui-table-head-cell>Code</uui-table-head-cell>
                </uui-table-head>
                ${this._results.map(
      (e) => n`
                    <uui-table-row data-mark="mc:reanalyze-result">
                      <uui-table-cell>${e.mediaName ?? e.mediaKey}</uui-table-cell>
                      <uui-table-cell>
                        ${e.analyzed ? e.description ?? "—" : n`<em>${e.error ?? "Not analyzed"}</em>`}
                      </uui-table-cell>
                      <uui-table-cell>${(e.tags ?? []).join(", ") || "—"}</uui-table-cell>
                      <uui-table-cell>${e.classificationCode ?? "—"}</uui-table-cell>
                    </uui-table-row>
                  `
    )}
              </uui-table>
            ` : z}
      </uui-box>
    `;
  }
};
s = /* @__PURE__ */ new WeakMap();
d = /* @__PURE__ */ new WeakSet();
v = function(e) {
  const a = e.target.selection ?? [];
  this._mediaKeys = a, this._results = [];
};
b = async function() {
  if (this._mediaKeys.length === 0) {
    o(u(this, s), "danger", "Choose at least one image to re-analyze.");
    return;
  }
  this._reanalyzing = !0;
  try {
    const e = await R.reanalyzeImages({
      body: { mediaKeys: this._mediaKeys, keepExistingAnalysis: !1 }
    });
    if (e.error || !e.data) {
      o(u(this, s), "danger", `Re-analyze failed: ${JSON.stringify(e.error ?? "no data")}`);
      return;
    }
    this._results = e.data.results ?? [];
    const a = this._results.filter((i) => i.analyzed).length, t = this._results.length - a;
    t === 0 ? o(u(this, s), "positive", `Re-analyzed ${a} image(s).`) : o(
      u(this, s),
      "danger",
      `Re-analyzed ${a} image(s); ${t} could not be analyzed. See results below.`
    );
  } finally {
    this._reanalyzing = !1;
  }
};
r.styles = [E];
c([
  y()
], r.prototype, "_mediaKeys", 2);
c([
  y()
], r.prototype, "_results", 2);
c([
  y()
], r.prototype, "_reanalyzing", 2);
r = c([
  w("mc-root-reanalyze-view")
], r);
const T = r;
export {
  r as McRootReanalyzeViewElement,
  T as default
};
//# sourceMappingURL=reanalyze-view.element-tYXeEbeS.js.map
