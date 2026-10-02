import { UmbEntityActionBase as y } from "@umbraco-cms/backoffice/entity-action";
import { UmbMediaItemRepository as p } from "@umbraco-cms/backoffice/media";
import { umbConfirmModal as w } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as m } from "@umbraco-cms/backoffice/notification";
import { tryExecute as d } from "@umbraco-cms/backoffice/resources";
import { M as u } from "./sdk.gen-BsXwShFH.js";
const c = 3, f = (t, e, a) => `${t} ${t === 1 ? e : a}`;
function $(t) {
  return `There are no images to re-analyze in "${t}".`;
}
function M(t, e) {
  return `${e === 1 ? `1 image in "${t}" and its subfolders` : `${e} images in "${t}" and its subfolders`} will be sent to the AI again. Their stored descriptions, tags and classification codes will be replaced. Each image takes at least one AI request (usually more with hierarchical classification).`;
}
function z(t) {
  return `Re-analyzing ${f(t, "image", "images")}…`;
}
function I(t, e) {
  const a = t.filter((o) => o.analyzed).length, i = t.filter((o) => !o.analyzed), n = [`Re-analyzed ${a} of ${f(e, "image", "images")}.`];
  if (i.length > 0) {
    const o = i.slice(0, c).map((s) => `${s.mediaName || "Unknown"}${s.error ? ` (${s.error})` : ""}`), r = i.length > c ? `, and ${i.length - c} more` : "";
    n.push(`${i.length} failed: ${o.join(", ")}${r}.`);
  }
  return a > 0 && n.push("Run Curate images to move them into their new folders."), n.join(" ");
}
const l = "Re-analyze images";
class x extends y {
  async execute() {
    const e = this.args.unique;
    if (!e) throw new Error("Unique is not available");
    const a = await this.#t(e), { data: i } = await d(this, u.countMediaImages({ path: { mediaKey: e } }));
    if (!i) return;
    const n = i.count;
    if (n === 0) {
      await this.#e("default", $(a));
      return;
    }
    try {
      await w(this, {
        headline: l,
        content: M(a, n),
        confirmLabel: `Re-analyze ${n}`,
        color: "warning"
      });
    } catch {
      return;
    }
    const r = (await this.getContext(m))?.stay("default", { data: { headline: l, message: z(n) } });
    try {
      const { data: s } = await d(
        this,
        u.reanalyzeMediaImages({ path: { mediaKey: e } })
      );
      if (!s) return;
      const h = s.results.some((g) => !g.analyzed);
      await this.#e(h ? "warning" : "positive", I(s.results, n));
    } finally {
      r?.close();
    }
  }
  async #t(e) {
    const { data: a } = await new p(this).requestItems([e]);
    return a?.[0]?.name ?? "this folder";
  }
  async #e(e, a) {
    (await this.getContext(m))?.peek(e, { data: { headline: l, message: a } });
  }
}
export {
  x as McReanalyzeMediaEntityAction,
  x as api
};
//# sourceMappingURL=reanalyze-media.action-CgHyIjx0.js.map
