import { UMB_ACTION_EVENT_CONTEXT as M } from "@umbraco-cms/backoffice/action";
import { html as c } from "@umbraco-cms/backoffice/external/lit";
import { UmbEntityActionBase as v, UmbRequestReloadStructureForEntityEvent as T, UmbRequestReloadChildrenOfEntityEvent as b } from "@umbraco-cms/backoffice/entity-action";
import { UmbMediaItemRepository as I, UMB_MEDIA_ROOT_ENTITY_TYPE as k } from "@umbraco-cms/backoffice/media";
import { umbConfirmModal as y } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as g } from "@umbraco-cms/backoffice/notification";
import { tryExecute as m } from "@umbraco-cms/backoffice/resources";
import { M as p } from "./sdk.gen-DBpJrjP9.js";
import { n as N, r as _, c as $, a as A, e as D, b as F, d as w, f as x, g as C, w as B, h as O } from "./empty-folders-option.element-DqAqCN9I.js";
import { t as R, p as U, r as q, u as K } from "./reload-people-badges-BK_mojpx.js";
const E = "media", h = "Curate images";
class Q extends v {
  async execute() {
    const t = this.args.unique;
    if (!t) throw new Error("Unique is not available");
    const e = await this.#o(t), { data: i } = await m(this, p.countMediaCuration({ path: { mediaKey: t } }));
    if (!i) return;
    if (i.runsInBackground) {
      await this.#a(t, e, i.imageCount, i.threshold);
      return;
    }
    const { data: s } = await m(this, p.planMediaCuration({ path: { mediaKey: t } }));
    if (!s) return;
    const a = L(s), o = s.emptyFolderCount;
    if (a.moveCount === 0 && o === 0) {
      await this.#t("default", N(e, a));
      return;
    }
    const d = _(a);
    let l = !1;
    try {
      await y(this, {
        headline: "Curate images",
        content: c`${a.moveCount > 0 ? c`<p>${A(e, a)}</p>
                ${d.length > 1 ? c`<ul>${d.map((n) => c`<li>${n}</li>`)}</ul>` : ""}
                <p>${D(o)}</p>` : c`<p>${F(e, a, o)}</p>`}
          <p>You can undo the run from Settings › Media Curator › Activity log.</p>
          <mc-empty-folders-option
            @change=${(n) => l = n.target.permanentlyDelete}
          ></mc-empty-folders-option>`,
        confirmLabel: $(a.moveCount, o),
        color: "positive"
      });
    } catch {
      return;
    }
    const { data: r } = await m(
      this,
      p.executeMediaCuration({
        path: { mediaKey: t },
        query: { permanentlyDeleteEmptyFolders: l }
      })
    );
    r && (await this.#t(r.failed > 0 ? "warning" : "positive", w(r, l)), await this.#e(t, [...s.plans.map((n) => n.scopeFolderKey)], r.changedFolderKeys ?? []));
  }
  async #a(t, e, i, s) {
    let a = !1;
    try {
      await y(this, {
        headline: h,
        content: c`<p>${x(e, i, s)}</p>
          <p>You can undo the run from Settings › Media Curator › Activity log.</p>
          <mc-empty-folders-option
            @change=${(f) => a = f.target.permanentlyDelete}
          ></mc-empty-folders-option>`,
        confirmLabel: "Curate in the background",
        color: "positive"
      });
    } catch {
      return;
    }
    const { data: o } = await m(
      this,
      p.executeMediaCuration({
        path: { mediaKey: t },
        query: { permanentlyDeleteEmptyFolders: a }
      })
    );
    if (!o) return;
    if (!o.queued) {
      await this.#t(o.failed > 0 ? "warning" : "positive", w(o, a)), await this.#e(t, [], o.changedFolderKeys ?? []);
      return;
    }
    const d = await this.getContext(g), l = { state: "queued", processed: 0, total: 0 }, r = d?.stay("default", { data: { headline: h, message: C(e, l) } }), n = await B(
      t,
      (f) => K(r, h, C(e, f))
    );
    if (r?.close(), !n) {
      await this.#t("warning", `Lost track of "${e}" (the site may have restarted). Check the Activity log.`);
      return;
    }
    await this.#t(n.state === "completed" && n.failed === 0 ? "positive" : "warning", O(e, n, a)), await this.#e(t, [], n.changedFolderKeys ?? []);
  }
  async #o(t) {
    const { data: e } = await new I(this).requestItems([t]);
    return e?.[0]?.name ?? "this folder";
  }
  async #t(t, e) {
    (await this.getContext(g))?.peek(t, { data: { headline: h, message: e } });
  }
  /**
   * Reloads every tree branch the run changed (reported by the server), plus the clicked folder and each
   * ruleset's scope folder: images move under their ruleset's scope, which may sit above the clicked folder.
   */
  async #e(t, e, i) {
    const s = await this.getContext(M);
    if (!s) return;
    s.dispatchEvent(new T({ unique: t, entityType: E }));
    const a = [t, ...e, ...i];
    for (const o of R(a, E, k))
      s.dispatchEvent(new b(o));
    i.length > 0 && await U() && await q(this, i);
  }
}
function L(u) {
  return {
    moveCount: u.moveCount,
    alreadyInPlaceCount: u.alreadyInPlaceCount,
    skippedCount: u.skippedItems.length,
    rulesets: u.plans.map((t) => ({ name: t.rulesetName, moveCount: t.moveCount }))
  };
}
export {
  Q as McCurateMediaEntityAction,
  Q as api
};
//# sourceMappingURL=curate-media.action-CGXQbUhN.js.map
