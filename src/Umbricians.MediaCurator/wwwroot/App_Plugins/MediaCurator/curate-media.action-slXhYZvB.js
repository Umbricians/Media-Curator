import { UMB_ACTION_EVENT_CONTEXT as f } from "@umbraco-cms/backoffice/action";
import { html as s } from "@umbraco-cms/backoffice/external/lit";
import { UmbEntityActionBase as y, UmbRequestReloadStructureForEntityEvent as h, UmbRequestReloadChildrenOfEntityEvent as C } from "@umbraco-cms/backoffice/entity-action";
import { UmbMediaItemRepository as E, UMB_MEDIA_ROOT_ENTITY_TYPE as g } from "@umbraco-cms/backoffice/media";
import { umbConfirmModal as w } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as M } from "@umbraco-cms/backoffice/notification";
import { tryExecute as u } from "@umbraco-cms/backoffice/resources";
import { M as c } from "./sdk.gen-BaXox45_.js";
import { n as T, r as v, c as I, a as b, e as _, b as N, d as O } from "./empty-folders-option.element-CaPuknSO.js";
import { t as U, p as $, r as x } from "./reload-people-badges-CcKaP8q6.js";
const d = "media";
class K extends y {
  async execute() {
    const e = this.args.unique;
    if (!e) throw new Error("Unique is not available");
    const a = await this.#t(e), { data: o } = await u(this, c.planMediaCuration({ path: { mediaKey: e } }));
    if (!o) return;
    const t = A(o), n = o.emptyFolderCount;
    if (t.moveCount === 0 && n === 0) {
      await this.#e("default", T(a, t));
      return;
    }
    const i = v(t);
    let l = !1;
    try {
      await w(this, {
        headline: "Curate images",
        content: s`${t.moveCount > 0 ? s`<p>${b(a, t)}</p>
                ${i.length > 1 ? s`<ul>${i.map((p) => s`<li>${p}</li>`)}</ul>` : ""}
                <p>${_(n)}</p>` : s`<p>${N(a, t, n)}</p>`}
          <p>You can undo the run from Settings › Media Curator › Activity log.</p>
          <mc-empty-folders-option
            @change=${(p) => l = p.target.permanentlyDelete}
          ></mc-empty-folders-option>`,
        confirmLabel: I(t.moveCount, n),
        color: "positive"
      });
    } catch {
      return;
    }
    const { data: m } = await u(
      this,
      c.executeMediaCuration({
        path: { mediaKey: e },
        query: { permanentlyDeleteEmptyFolders: l }
      })
    );
    m && (await this.#e(m.failed > 0 ? "warning" : "positive", O(m, l)), await this.#a(e, o, m.changedFolderKeys ?? []));
  }
  async #t(e) {
    const { data: a } = await new E(this).requestItems([e]);
    return a?.[0]?.name ?? "this folder";
  }
  async #e(e, a) {
    (await this.getContext(M))?.peek(e, { data: { headline: "Curate images", message: a } });
  }
  /**
   * Reloads every tree branch the run changed (reported by the server), plus the clicked folder and each
   * ruleset's scope folder: images move under their ruleset's scope, which may sit above the clicked folder.
   */
  async #a(e, a, o) {
    const t = await this.getContext(f);
    if (!t) return;
    t.dispatchEvent(new h({ unique: e, entityType: d }));
    const n = [e, ...a.plans.map((i) => i.scopeFolderKey), ...o];
    for (const i of U(n, d, g))
      t.dispatchEvent(new C(i));
    o.length > 0 && await $() && await x(this, o);
  }
}
function A(r) {
  return {
    moveCount: r.moveCount,
    alreadyInPlaceCount: r.alreadyInPlaceCount,
    skippedCount: r.skippedItems.length,
    rulesets: r.plans.map((e) => ({ name: e.rulesetName, moveCount: e.moveCount }))
  };
}
export {
  K as McCurateMediaEntityAction,
  K as api
};
//# sourceMappingURL=curate-media.action-slXhYZvB.js.map
