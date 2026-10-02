import { html as s, nothing as d, css as M, state as m, customElement as S } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as E } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT as I } from "@umbraco-cms/backoffice/notification";
import { M as b } from "./sdk.gen-BsXwShFH.js";
import { d as O } from "./bundle.manifests-Cq2ORKtu.js";
import { M as P } from "./ruleset-workspace.context-token-CI0arTF3.js";
var T = Object.defineProperty, N = Object.getOwnPropertyDescriptor, w = (e) => {
  throw TypeError(e);
}, c = (e, t, a, n) => {
  for (var r = n > 1 ? void 0 : n ? N(t, a) : t, f = e.length - 1, _; f >= 0; f--)
    (_ = e[f]) && (r = (n ? _(t, a, r) : _(r)) || r);
  return n && r && T(t, a, r), r;
}, $ = (e, t, a) => t.has(e) || w("Cannot " + a), C = (e, t, a) => ($(e, t, "read from private field"), t.get(e)), v = (e, t, a) => t.has(e) ? w("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), g = (e, t, a, n) => ($(e, t, "write to private field"), t.set(e, a), a), i = (e, t, a) => ($(e, t, "access private method"), a), h, p, l, o, y, k, K, x, R, F;
let u = class extends E {
  constructor() {
    super(), v(this, l), this._runs = [], this._busy = !1, v(this, h), v(this, p), this.consumeContext(I, (e) => g(this, p, e)), this.consumeContext(P, (e) => {
      g(this, h, e), e && this.observe(
        e.persistedData,
        (t) => {
          const a = t?.scopeRootKey && t.scopeRootKey !== O ? t.scopeRootKey : void 0;
          a !== this._scopeFolderKey && (this._scopeFolderKey = a, this._plan = void 0, i(this, l, y).call(this));
        },
        "_persistedData"
      );
    });
  }
  render() {
    return this._scopeFolderKey ? s`${i(this, l, R).call(this)} ${i(this, l, F).call(this)}` : s`<uui-box headline="Curate">
        <p data-mark="mc:curate-no-scope">Choose a scope folder on the Settings tab and save the ruleset before curating.</p>
      </uui-box>`;
  }
};
h = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakMap();
l = /* @__PURE__ */ new WeakSet();
o = function(e, t) {
  C(this, p)?.peek(e, { data: { message: t } });
};
y = async function() {
  if (!this._scopeFolderKey) {
    this._runs = [];
    return;
  }
  const { data: e } = await b.getRuns();
  this._runs = (e ?? []).filter((t) => t.scopeFolderKey === this._scopeFolderKey);
};
k = async function() {
  if (!this._scopeFolderKey) return;
  C(this, h)?.getHasUnpersistedChanges() && i(this, l, o).call(this, "warning", "You have unsaved changes. The dry run uses the last saved version of this ruleset."), this._busy = !0;
  const e = await b.planCuration({
    body: { scopeFolderKey: this._scopeFolderKey, recursive: !0 }
  });
  if (this._busy = !1, e.error || !e.data) {
    i(this, l, o).call(this, "danger", `Could not plan: ${JSON.stringify(e.error ?? "no data")}`);
    return;
  }
  this._plan = e.data;
};
K = async function() {
  if (!this._scopeFolderKey) return;
  this._busy = !0;
  const e = await b.executeCuration({
    body: { scopeFolderKey: this._scopeFolderKey, recursive: !0 }
  });
  if (this._busy = !1, e.error || !e.data) {
    i(this, l, o).call(this, "danger", `Curation failed: ${JSON.stringify(e.error ?? "no data")}`);
    return;
  }
  const t = e.data;
  i(this, l, o).call(this, "positive", `Curated: ${t.moved} moved, ${t.alreadyInPlace} already in place, ${t.failed} failed.`), this._plan = void 0, await i(this, l, y).call(this);
};
x = async function(e) {
  const t = await b.undoRun({ path: { runKey: e.key } });
  if (t.error || !t.data) {
    i(this, l, o).call(this, "danger", `Undo failed: ${JSON.stringify(t.error ?? "no data")}`);
    return;
  }
  const a = t.data;
  i(this, l, o).call(this, "positive", `Undo: ${a.moved} restored, ${a.alreadyInPlace} already in place, ${a.failed} failed.`), await i(this, l, y).call(this);
};
R = function() {
  const e = this._plan;
  return s`
      <uui-box headline="Dry run" data-mark="mc:plan">
        <uui-button
          slot="header-actions"
          data-mark="mc:dry-run"
          label=${e ? "Run again" : "Run dry run"}
          look=${e ? "secondary" : "primary"}
          ?disabled=${this._busy}
          @click=${() => i(this, l, k).call(this)}
        ></uui-button>
        ${e ? s`
              <p data-mark="mc:plan-summary">
                ${e.moveCount === 0 ? "Nothing would move. Everything is already in place or no rules resolved." : `${e.moveCount} item(s) would move. Nothing has moved yet — review and confirm below.`}
              </p>
              ${(e.moves ?? []).length > 0 ? s`<uui-table>
                    <uui-table-head>
                      <uui-table-head-cell>Item</uui-table-head-cell>
                      <uui-table-head-cell>Target folder</uui-table-head-cell>
                      <uui-table-head-cell>Status</uui-table-head-cell>
                    </uui-table-head>
                    ${(e.moves ?? []).map(
    (t) => s`<uui-table-row data-mark="mc:plan-move">
                        <uui-table-cell>${t.mediaName}</uui-table-cell>
                        <uui-table-cell>${t.targetPath}</uui-table-cell>
                        <uui-table-cell>${t.alreadyInPlace ? "already in place" : "will move"}</uui-table-cell>
                      </uui-table-row>`
  )}
                  </uui-table>` : d}
              ${(e.skippedItems ?? []).length > 0 ? s`<details>
                    <summary>${(e.skippedItems ?? []).length} item(s) skipped</summary>
                    <ul>
                      ${(e.skippedItems ?? []).map((t) => s`<li>${t}</li>`)}
                    </ul>
                  </details>` : d}
              ${e.moveCount > 0 ? s`<div class="actions">
                    <uui-button
                      data-mark="mc:plan-execute"
                      label="Move ${e.moveCount} item(s)"
                      look="primary"
                      color="positive"
                      ?disabled=${this._busy}
                      @click=${() => i(this, l, K).call(this)}
                    ></uui-button>
                  </div>` : d}
            ` : s`<p>See where every item in the scope folder would go, before anything moves.</p>`}
      </uui-box>
    `;
};
F = function() {
  return this._runs.length === 0 ? d : s`
      <uui-box headline="Runs for this folder" data-mark="mc:ruleset-runs">
        <uui-table>
          <uui-table-head>
            <uui-table-head-cell>Started</uui-table-head-cell>
            <uui-table-head-cell>Trigger</uui-table-head-cell>
            <uui-table-head-cell>Moved</uui-table-head-cell>
            <uui-table-head-cell>In place</uui-table-head-cell>
            <uui-table-head-cell>Failed</uui-table-head-cell>
            <uui-table-head-cell></uui-table-head-cell>
          </uui-table-head>
          ${this._runs.map(
    (e) => s`<uui-table-row data-mark="mc:ruleset-run">
              <uui-table-cell>${new Date(e.started).toLocaleString()}</uui-table-cell>
              <uui-table-cell>${e.trigger}</uui-table-cell>
              <uui-table-cell>${e.moved}</uui-table-cell>
              <uui-table-cell>${e.alreadyInPlace}</uui-table-cell>
              <uui-table-cell>${e.failed}</uui-table-cell>
              <uui-table-cell>
                ${e.moved > 0 && !e.trigger.startsWith("undo:") ? s`<uui-button
                      data-mark="mc:run-undo"
                      compact
                      look="secondary"
                      label="Undo run from ${new Date(e.started).toLocaleString()}"
                      @click=${() => i(this, l, x).call(this, e)}
                      >Undo</uui-button
                    >` : d}
              </uui-table-cell>
            </uui-table-row>`
  )}
        </uui-table>
      </uui-box>
    `;
};
u.styles = [
  M`
      :host {
        display: block;
        padding: var(--uui-size-layout-1);
      }
      uui-box + uui-box {
        margin-top: var(--uui-size-layout-1);
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        margin-top: var(--uui-size-space-5);
      }
    `
];
c([
  m()
], u.prototype, "_scopeFolderKey", 2);
c([
  m()
], u.prototype, "_plan", 2);
c([
  m()
], u.prototype, "_runs", 2);
c([
  m()
], u.prototype, "_busy", 2);
u = c([
  S("mc-ruleset-curate-view")
], u);
const J = u;
export {
  u as McRulesetCurateViewElement,
  J as default
};
//# sourceMappingURL=ruleset-curate-view.element-BnYQOghW.js.map
