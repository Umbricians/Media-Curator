import { UMB_ACTION_EVENT_CONTEXT as y } from "@umbraco-cms/backoffice/action";
import { html as r } from "@umbraco-cms/backoffice/external/lit";
import { UmbEntityActionBase as f, UmbRequestReloadStructureForEntityEvent as h, UmbRequestReloadChildrenOfEntityEvent as C } from "@umbraco-cms/backoffice/entity-action";
import { UmbMediaItemRepository as E, UMB_MEDIA_ROOT_ENTITY_TYPE as T } from "@umbraco-cms/backoffice/media";
import { umbConfirmModal as g } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as w } from "@umbraco-cms/backoffice/notification";
import { tryExecute as l } from "@umbraco-cms/backoffice/resources";
import { M as p } from "./sdk.gen-Bq8ZVkDW.js";
import { n as M, r as v, c as I, a as _, e as O, b, d as N } from "./empty-folders-option.element-CaPuknSO.js";
const q = "00000000-0000-0000-0000-000000000000";
function A(s, e, n) {
  const o = [], t = /* @__PURE__ */ new Set();
  for (const i of s) {
    const a = i.toLowerCase();
    t.has(a) || (t.add(a), o.push(
      a === q ? { entityType: n, unique: null } : { entityType: e, unique: i }
    ));
  }
  return o;
}
const d = "media";
class L extends f {
  async execute() {
    const e = this.args.unique;
    if (!e) throw new Error("Unique is not available");
    const n = await this.#t(e), { data: o } = await l(this, p.planMediaCuration({ path: { mediaKey: e } }));
    if (!o) return;
    const t = F(o), i = o.emptyFolderCount;
    if (t.moveCount === 0 && i === 0) {
      await this.#e("default", M(n, t));
      return;
    }
    const a = v(t);
    let u = !1;
    try {
      await g(this, {
        headline: "Curate images",
        content: r`${t.moveCount > 0 ? r`<p>${_(n, t)}</p>
                ${a.length > 1 ? r`<ul>${a.map((c) => r`<li>${c}</li>`)}</ul>` : ""}
                <p>${O(i)}</p>` : r`<p>${b(n, t, i)}</p>`}
          <p>You can undo the run from Settings › Media Curator › Activity log.</p>
          <mc-empty-folders-option
            @change=${(c) => u = c.target.permanentlyDelete}
          ></mc-empty-folders-option>`,
        confirmLabel: I(t.moveCount, i),
        color: "positive"
      });
    } catch {
      return;
    }
    const { data: m } = await l(
      this,
      p.executeMediaCuration({
        path: { mediaKey: e },
        query: { permanentlyDeleteEmptyFolders: u }
      })
    );
    m && (await this.#e(m.failed > 0 ? "warning" : "positive", N(m, u)), await this.#n(e, o, m.changedFolderKeys ?? []));
  }
  async #t(e) {
    const { data: n } = await new E(this).requestItems([e]);
    return n?.[0]?.name ?? "this folder";
  }
  async #e(e, n) {
    (await this.getContext(w))?.peek(e, { data: { headline: "Curate images", message: n } });
  }
  /**
   * Reloads every tree branch the run changed (reported by the server), plus the clicked folder and each
   * ruleset's scope folder: images move under their ruleset's scope, which may sit above the clicked folder.
   */
  async #n(e, n, o) {
    const t = await this.getContext(y);
    if (!t) return;
    t.dispatchEvent(new h({ unique: e, entityType: d }));
    const i = [e, ...n.plans.map((a) => a.scopeFolderKey), ...o];
    for (const a of A(i, d, T))
      t.dispatchEvent(new C(a));
  }
}
function F(s) {
  return {
    moveCount: s.moveCount,
    alreadyInPlaceCount: s.alreadyInPlaceCount,
    skippedCount: s.skippedItems.length,
    rulesets: s.plans.map((e) => ({ name: e.rulesetName, moveCount: e.moveCount }))
  };
}
export {
  L as McCurateMediaEntityAction,
  L as api
};
//# sourceMappingURL=curate-media.action-B4OCkNcJ.js.map
