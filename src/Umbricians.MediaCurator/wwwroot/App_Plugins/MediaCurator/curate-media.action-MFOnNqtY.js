import { UMB_ACTION_EVENT_CONTEXT as c } from "@umbraco-cms/backoffice/action";
import { html as s } from "@umbraco-cms/backoffice/external/lit";
import { UmbEntityActionBase as f, UmbRequestReloadStructureForEntityEvent as C, UmbRequestReloadChildrenOfEntityEvent as h } from "@umbraco-cms/backoffice/entity-action";
import { UmbMediaItemRepository as y } from "@umbraco-cms/backoffice/media";
import { umbConfirmModal as v } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as $ } from "@umbraco-cms/backoffice/notification";
import { tryExecute as u } from "@umbraco-cms/backoffice/resources";
import { M as m } from "./sdk.gen-BsXwShFH.js";
const p = (t, e, a) => `${t} ${t === 1 ? e : a}`;
function g(t, e) {
  const a = [`${p(e.moveCount, "image", "images")} in "${t}" and its subfolders will be moved`];
  return e.alreadyInPlaceCount > 0 && a.push(`${e.alreadyInPlaceCount} already in place`), e.skippedCount > 0 && a.push(`${e.skippedCount} skipped`), `${a.join(", ")}.`;
}
function w(t) {
  return t.rulesets.filter((e) => e.moveCount > 0).map((e) => `${e.name}: ${p(e.moveCount, "image", "images")}`);
}
function E(t, e) {
  if (e.alreadyInPlaceCount === 0 && e.skippedCount === 0)
    return `There are no images to curate in "${t}".`;
  const a = [];
  return e.alreadyInPlaceCount > 0 && a.push(`${e.alreadyInPlaceCount} already in place`), e.skippedCount > 0 && a.push(`${e.skippedCount} skipped (no ruleset applies, excluded, or not an image)`), `Nothing to move in "${t}": ${a.join(", ")}.`;
}
function I(t) {
  return `Curated: ${t.moved} moved, ${t.alreadyInPlace} already in place, ${t.failed} failed.`;
}
const l = "media";
class _ extends f {
  async execute() {
    const e = this.args.unique;
    if (!e) throw new Error("Unique is not available");
    const a = await this.#t(e), { data: n } = await u(this, m.planMediaCuration({ path: { mediaKey: e } }));
    if (!n) return;
    const i = M(n);
    if (i.moveCount === 0) {
      await this.#e("default", E(a, i));
      return;
    }
    const o = w(i);
    try {
      await v(this, {
        headline: "Curate images",
        content: s`<p>${g(a, i)}</p>
          ${o.length > 1 ? s`<ul>${o.map((d) => s`<li>${d}</li>`)}</ul>` : ""}
          <p>You can undo the run from Settings › Media Curator › Activity log.</p>`,
        confirmLabel: `Move ${i.moveCount}`,
        color: "positive"
      });
    } catch {
      return;
    }
    const { data: r } = await u(
      this,
      m.executeMediaCuration({ path: { mediaKey: e } })
    );
    r && (await this.#e(r.failed > 0 ? "warning" : "positive", I(r)), await this.#a(e, n));
  }
  async #t(e) {
    const { data: a } = await new y(this).requestItems([e]);
    return a?.[0]?.name ?? "this folder";
  }
  async #e(e, a) {
    (await this.getContext($))?.peek(e, { data: { headline: "Curate images", message: a } });
  }
  // Images move under their ruleset's scope folder, which may sit above the clicked folder.
  async #a(e, a) {
    const n = await this.getContext(c);
    if (n) {
      n.dispatchEvent(new C({ unique: e, entityType: l }));
      for (const i of new Set(a.plans.map((o) => o.scopeFolderKey)))
        n.dispatchEvent(new h({ unique: i, entityType: l }));
    }
  }
}
function M(t) {
  return {
    moveCount: t.moveCount,
    alreadyInPlaceCount: t.alreadyInPlaceCount,
    skippedCount: t.skippedItems.length,
    rulesets: t.plans.map((e) => ({ name: e.rulesetName, moveCount: e.moveCount }))
  };
}
export {
  _ as McCurateMediaEntityAction,
  _ as api
};
//# sourceMappingURL=curate-media.action-MFOnNqtY.js.map
