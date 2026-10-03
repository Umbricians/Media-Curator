import { UMB_ACTION_EVENT_CONTEXT as y } from "@umbraco-cms/backoffice/action";
import { html as r } from "@umbraco-cms/backoffice/external/lit";
import { UmbEntityActionBase as f, UmbRequestReloadStructureForEntityEvent as h, UmbRequestReloadChildrenOfEntityEvent as C } from "@umbraco-cms/backoffice/entity-action";
import { UmbMediaItemRepository as w } from "@umbraco-cms/backoffice/media";
import { umbConfirmModal as E } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as v } from "@umbraco-cms/backoffice/notification";
import { tryExecute as c } from "@umbraco-cms/backoffice/resources";
import { M as p } from "./sdk.gen-LMy3RyM3.js";
import { n as g, r as M, c as T, a as I, e as b, b as N, d as q } from "./empty-folders-option.element-CaPuknSO.js";
const d = "media";
class D extends f {
  async execute() {
    const e = this.args.unique;
    if (!e) throw new Error("Unique is not available");
    const t = await this.#t(e), { data: a } = await c(this, p.planMediaCuration({ path: { mediaKey: e } }));
    if (!a) return;
    const n = $(a), o = a.emptyFolderCount;
    if (n.moveCount === 0 && o === 0) {
      await this.#e("default", g(t, n));
      return;
    }
    const l = M(n);
    let s = !1;
    try {
      await E(this, {
        headline: "Curate images",
        content: r`${n.moveCount > 0 ? r`<p>${I(t, n)}</p>
                ${l.length > 1 ? r`<ul>${l.map((u) => r`<li>${u}</li>`)}</ul>` : ""}
                <p>${b(o)}</p>` : r`<p>${N(t, n, o)}</p>`}
          <p>You can undo the run from Settings › Media Curator › Activity log.</p>
          <mc-empty-folders-option
            @change=${(u) => s = u.target.permanentlyDelete}
          ></mc-empty-folders-option>`,
        confirmLabel: T(n.moveCount, o),
        color: "positive"
      });
    } catch {
      return;
    }
    const { data: m } = await c(
      this,
      p.executeMediaCuration({
        path: { mediaKey: e },
        query: { permanentlyDeleteEmptyFolders: s }
      })
    );
    m && (await this.#e(m.failed > 0 ? "warning" : "positive", q(m, s)), await this.#a(e, a));
  }
  async #t(e) {
    const { data: t } = await new w(this).requestItems([e]);
    return t?.[0]?.name ?? "this folder";
  }
  async #e(e, t) {
    (await this.getContext(v))?.peek(e, { data: { headline: "Curate images", message: t } });
  }
  // Images move under their ruleset's scope folder, which may sit above the clicked folder.
  async #a(e, t) {
    const a = await this.getContext(y);
    if (a) {
      a.dispatchEvent(new h({ unique: e, entityType: d }));
      for (const n of new Set(t.plans.map((o) => o.scopeFolderKey)))
        a.dispatchEvent(new C({ unique: n, entityType: d }));
    }
  }
}
function $(i) {
  return {
    moveCount: i.moveCount,
    alreadyInPlaceCount: i.alreadyInPlaceCount,
    skippedCount: i.skippedItems.length,
    rulesets: i.plans.map((e) => ({ name: e.rulesetName, moveCount: e.moveCount }))
  };
}
export {
  D as McCurateMediaEntityAction,
  D as api
};
//# sourceMappingURL=curate-media.action-3Y2GeLqr.js.map
