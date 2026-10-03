import { html as i, nothing as d, css as S, state as f, customElement as D } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as I } from "@umbraco-cms/backoffice/lit-element";
import { UMB_NOTIFICATION_CONTEXT as O } from "@umbraco-cms/backoffice/notification";
import { M as _ } from "./sdk.gen-Bq8ZVkDW.js";
import { d as T } from "./bundle.manifests-BZeTU5LM.js";
import { M as P } from "./ruleset-workspace.context-token-Cq6qQl2g.js";
import { e as N, d as U } from "./empty-folders-option.element-CaPuknSO.js";
var W = Object.defineProperty, L = Object.getOwnPropertyDescriptor, F = (e) => {
  throw TypeError(e);
}, p = (e, t, a, n) => {
  for (var o = n > 1 ? void 0 : n ? L(t, a) : t, $ = e.length - 1, g; $ >= 0; $--)
    (g = e[$]) && (o = (n ? g(t, a, o) : g(o)) || o);
  return n && o && W(t, a, o), o;
}, w = (e, t, a) => t.has(e) || F("Cannot " + a), m = (e, t, a) => (w(e, t, "read from private field"), t.get(e)), h = (e, t, a) => t.has(e) ? F("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), C = (e, t, a, n) => (w(e, t, "write to private field"), t.set(e, a), a), r = (e, t, a) => (w(e, t, "access private method"), a), c, y, b, l, u, v, K, E, M, R, x;
const k = (e, t, a) => `${e} ${e === 1 ? t : a}`;
let s = class extends I {
  constructor() {
    super(), h(this, l), this._runs = [], this._busy = !1, h(this, c, !1), h(this, y), h(this, b), this.consumeContext(O, (e) => C(this, b, e)), this.consumeContext(P, (e) => {
      C(this, y, e), e && this.observe(
        e.persistedData,
        (t) => {
          const a = t?.scopeRootKey && t.scopeRootKey !== T ? t.scopeRootKey : void 0;
          a !== this._scopeFolderKey && (this._scopeFolderKey = a, this._plan = void 0, r(this, l, v).call(this));
        },
        "_persistedData"
      );
    });
  }
  render() {
    return this._scopeFolderKey ? i`${r(this, l, R).call(this)} ${r(this, l, x).call(this)}` : i`<uui-box headline="Curate">
        <p data-mark="mc:curate-no-scope">Choose a scope folder on the Settings tab and save the ruleset before curating.</p>
      </uui-box>`;
  }
};
c = /* @__PURE__ */ new WeakMap();
y = /* @__PURE__ */ new WeakMap();
b = /* @__PURE__ */ new WeakMap();
l = /* @__PURE__ */ new WeakSet();
u = function(e, t) {
  m(this, b)?.peek(e, { data: { message: t } });
};
v = async function() {
  if (!this._scopeFolderKey) {
    this._runs = [];
    return;
  }
  const { data: e } = await _.getRuns();
  this._runs = (e ?? []).filter((t) => t.scopeFolderKey === this._scopeFolderKey);
};
K = async function() {
  if (!this._scopeFolderKey) return;
  m(this, y)?.getHasUnpersistedChanges() && r(this, l, u).call(this, "warning", "You have unsaved changes. The dry run uses the last saved version of this ruleset."), this._busy = !0;
  const e = await _.planCuration({
    body: { scopeFolderKey: this._scopeFolderKey, recursive: !0, permanentlyDeleteEmptyFolders: !1 }
  });
  if (this._busy = !1, e.error || !e.data) {
    r(this, l, u).call(this, "danger", `Could not plan: ${JSON.stringify(e.error ?? "no data")}`);
    return;
  }
  this._plan = e.data;
};
E = async function() {
  if (!this._scopeFolderKey) return;
  this._busy = !0;
  const e = await _.executeCuration({
    body: {
      scopeFolderKey: this._scopeFolderKey,
      recursive: !0,
      permanentlyDeleteEmptyFolders: m(this, c)
    }
  });
  if (this._busy = !1, e.error || !e.data) {
    r(this, l, u).call(this, "danger", `Curation failed: ${JSON.stringify(e.error ?? "no data")}`);
    return;
  }
  r(this, l, u).call(this, "positive", U(e.data, m(this, c))), this._plan = void 0, await r(this, l, v).call(this);
};
M = async function(e) {
  const t = await _.undoRun({ path: { runKey: e.key } });
  if (t.error || !t.data) {
    r(this, l, u).call(this, "danger", `Undo failed: ${JSON.stringify(t.error ?? "no data")}`);
    return;
  }
  const a = t.data;
  r(this, l, u).call(this, "positive", `Undo: ${a.moved} restored, ${a.alreadyInPlace} already in place, ${a.failed} failed.`), await r(this, l, v).call(this);
};
R = function() {
  const e = this._plan;
  return i`
      <uui-box headline="Dry run" data-mark="mc:plan">
        <uui-button
          slot="header-actions"
          data-mark="mc:dry-run"
          label=${e ? "Run again" : "Run dry run"}
          look=${e ? "secondary" : "primary"}
          ?disabled=${this._busy}
          @click=${() => r(this, l, K).call(this)}
        ></uui-button>
        ${e ? i`
              <p data-mark="mc:plan-summary">
                ${e.moveCount === 0 ? "Nothing would move. Everything is already in place or no rules resolved." : `${e.moveCount} item(s) would move. Nothing has moved yet — review and confirm below.`}
              </p>
              ${(e.moves ?? []).length > 0 ? i`<uui-table>
                    <uui-table-head>
                      <uui-table-head-cell>Item</uui-table-head-cell>
                      <uui-table-head-cell>Target folder</uui-table-head-cell>
                      <uui-table-head-cell>Status</uui-table-head-cell>
                    </uui-table-head>
                    ${(e.moves ?? []).map(
    (t) => i`<uui-table-row data-mark="mc:plan-move">
                        <uui-table-cell>${t.mediaName}</uui-table-cell>
                        <uui-table-cell>${t.targetPath}</uui-table-cell>
                        <uui-table-cell>${t.alreadyInPlace ? "already in place" : "will move"}</uui-table-cell>
                      </uui-table-row>`
  )}
                  </uui-table>` : d}
              ${(e.skippedItems ?? []).length > 0 ? i`<details>
                    <summary>${(e.skippedItems ?? []).length} item(s) skipped</summary>
                    <ul>
                      ${(e.skippedItems ?? []).map((t) => i`<li>${t}</li>`)}
                    </ul>
                  </details>` : d}
              ${e.moveCount > 0 || e.emptyFolderCount > 0 ? i`${e.moveCount > 0 ? i`<p>${N(e.emptyFolderCount)}</p>` : i`<p data-mark="mc:plan-cleanup-only">${k(e.emptyFolderCount, "empty sub-folder", "empty sub-folders")} can be removed.</p>`}
                    <mc-empty-folders-option
                      @change=${(t) => C(this, c, t.target.permanentlyDelete)}
                    ></mc-empty-folders-option>
                    <div class="actions">
                      <uui-button
                        data-mark="mc:plan-execute"
                        label=${e.moveCount > 0 ? `Move ${e.moveCount} item(s)` : `Remove ${k(e.emptyFolderCount, "empty folder", "empty folders")}`}
                        look="primary"
                        color="positive"
                        ?disabled=${this._busy}
                        @click=${() => r(this, l, E).call(this)}
                      ></uui-button>
                    </div>` : d}
            ` : i`<p>See where every item in the scope folder would go, before anything moves.</p>`}
      </uui-box>
    `;
};
x = function() {
  return this._runs.length === 0 ? d : i`
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
    (e) => i`<uui-table-row data-mark="mc:ruleset-run">
              <uui-table-cell>${new Date(e.started).toLocaleString()}</uui-table-cell>
              <uui-table-cell>${e.trigger}</uui-table-cell>
              <uui-table-cell>${e.moved}</uui-table-cell>
              <uui-table-cell>${e.alreadyInPlace}</uui-table-cell>
              <uui-table-cell>${e.failed}</uui-table-cell>
              <uui-table-cell>
                ${e.moved > 0 && !e.trigger.startsWith("undo:") ? i`<uui-button
                      data-mark="mc:run-undo"
                      compact
                      look="secondary"
                      label="Undo run from ${new Date(e.started).toLocaleString()}"
                      @click=${() => r(this, l, M).call(this, e)}
                      >Undo</uui-button
                    >` : d}
              </uui-table-cell>
            </uui-table-row>`
  )}
        </uui-table>
      </uui-box>
    `;
};
s.styles = [
  S`
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
p([
  f()
], s.prototype, "_scopeFolderKey", 2);
p([
  f()
], s.prototype, "_plan", 2);
p([
  f()
], s.prototype, "_runs", 2);
p([
  f()
], s.prototype, "_busy", 2);
s = p([
  D("mc-ruleset-curate-view")
], s);
const B = s;
export {
  s as McRulesetCurateViewElement,
  B as default
};
//# sourceMappingURL=ruleset-curate-view.element-WolcrzlQ.js.map
