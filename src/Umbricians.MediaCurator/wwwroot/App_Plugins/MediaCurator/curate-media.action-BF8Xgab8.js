import { UMB_ACTION_EVENT_CONTEXT as E } from "@umbraco-cms/backoffice/action";
import { html as u } from "@umbraco-cms/backoffice/external/lit";
import { UmbEntityActionBase as v, UmbRequestReloadStructureForEntityEvent as T, UmbRequestReloadChildrenOfEntityEvent as I } from "@umbraco-cms/backoffice/entity-action";
import { UmbMediaItemRepository as b, UMB_MEDIA_ROOT_ENTITY_TYPE as k } from "@umbraco-cms/backoffice/media";
import { umbConfirmModal as y } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as g } from "@umbraco-cms/backoffice/notification";
import { tryExecute as p } from "@umbraco-cms/backoffice/resources";
import { M as m } from "./sdk.gen-DBpJrjP9.js";
import { n as N, r as _, c as $, a as A, e as D, b as F, d as w, f as O, g as C, h as x } from "./empty-folders-option.element-CmfcTFQX.js";
import { u as R, t as B, p as L, r as P } from "./reload-people-badges-BK_mojpx.js";
const M = "media", f = "Curate images", U = 3e3;
class J extends v {
  async execute() {
    const t = this.args.unique;
    if (!t) throw new Error("Unique is not available");
    const e = await this.#i(t), { data: a } = await p(this, m.countMediaCuration({ path: { mediaKey: t } }));
    if (!a) return;
    if (a.runsInBackground) {
      await this.#a(t, e, a.imageCount, a.threshold);
      return;
    }
    const { data: i } = await p(this, m.planMediaCuration({ path: { mediaKey: t } }));
    if (!i) return;
    const o = q(i), n = i.emptyFolderCount;
    if (o.moveCount === 0 && n === 0) {
      await this.#t("default", N(e, o));
      return;
    }
    const d = _(o);
    let l = !1;
    try {
      await y(this, {
        headline: "Curate images",
        content: u`${o.moveCount > 0 ? u`<p>${A(e, o)}</p>
                ${d.length > 1 ? u`<ul>${d.map((s) => u`<li>${s}</li>`)}</ul>` : ""}
                <p>${D(n)}</p>` : u`<p>${F(e, o, n)}</p>`}
          <p>You can undo the run from Settings › Media Curator › Activity log.</p>
          <mc-empty-folders-option
            @change=${(s) => l = s.target.permanentlyDelete}
          ></mc-empty-folders-option>`,
        confirmLabel: $(o.moveCount, n),
        color: "positive"
      });
    } catch {
      return;
    }
    const { data: r } = await p(
      this,
      m.executeMediaCuration({
        path: { mediaKey: t },
        query: { permanentlyDeleteEmptyFolders: l }
      })
    );
    r && (await this.#t(r.failed > 0 ? "warning" : "positive", w(r, l)), await this.#e(t, [...i.plans.map((s) => s.scopeFolderKey)], r.changedFolderKeys ?? []));
  }
  async #a(t, e, a, i) {
    let o = !1;
    try {
      await y(this, {
        headline: f,
        content: u`<p>${O(e, a, i)}</p>
          <p>You can undo the run from Settings › Media Curator › Activity log.</p>
          <mc-empty-folders-option
            @change=${(h) => o = h.target.permanentlyDelete}
          ></mc-empty-folders-option>`,
        confirmLabel: "Curate in the background",
        color: "positive"
      });
    } catch {
      return;
    }
    const { data: n } = await p(
      this,
      m.executeMediaCuration({
        path: { mediaKey: t },
        query: { permanentlyDeleteEmptyFolders: o }
      })
    );
    if (!n) return;
    if (!n.queued) {
      await this.#t(n.failed > 0 ? "warning" : "positive", w(n, o)), await this.#e(t, [], n.changedFolderKeys ?? []);
      return;
    }
    const d = await this.getContext(g), l = { state: "queued", processed: 0, total: 0 }, r = d?.stay("default", { data: { headline: f, message: C(e, l) } }), s = await this.#o(
      t,
      (h) => R(r, f, C(e, h))
    );
    if (r?.close(), !s) {
      await this.#t("warning", `Lost track of "${e}" (the site may have restarted). Check the Activity log.`);
      return;
    }
    await this.#t(s.state === "completed" && s.failed === 0 ? "positive" : "warning", x(e, s, o)), await this.#e(t, [], s.changedFolderKeys ?? []);
  }
  /** Polls the folder's background run until it finishes; null when the server no longer knows it. */
  async #o(t, e) {
    for (; ; ) {
      await new Promise((o) => setTimeout(o, U));
      const { data: a, response: i } = await m.getQueueItemStatus({ path: { mediaKey: t } });
      if (i?.status === 404) return null;
      if (a) {
        if (a.state === "completed" || a.state === "failed") return a;
        e(a);
      }
    }
  }
  async #i(t) {
    const { data: e } = await new b(this).requestItems([t]);
    return e?.[0]?.name ?? "this folder";
  }
  async #t(t, e) {
    (await this.getContext(g))?.peek(t, { data: { headline: f, message: e } });
  }
  /**
   * Reloads every tree branch the run changed (reported by the server), plus the clicked folder and each
   * ruleset's scope folder: images move under their ruleset's scope, which may sit above the clicked folder.
   */
  async #e(t, e, a) {
    const i = await this.getContext(E);
    if (!i) return;
    i.dispatchEvent(new T({ unique: t, entityType: M }));
    const o = [t, ...e, ...a];
    for (const n of B(o, M, k))
      i.dispatchEvent(new I(n));
    a.length > 0 && await L() && await P(this, a);
  }
}
function q(c) {
  return {
    moveCount: c.moveCount,
    alreadyInPlaceCount: c.alreadyInPlaceCount,
    skippedCount: c.skippedItems.length,
    rulesets: c.plans.map((t) => ({ name: t.rulesetName, moveCount: t.moveCount }))
  };
}
export {
  J as McCurateMediaEntityAction,
  J as api
};
//# sourceMappingURL=curate-media.action-BF8Xgab8.js.map
