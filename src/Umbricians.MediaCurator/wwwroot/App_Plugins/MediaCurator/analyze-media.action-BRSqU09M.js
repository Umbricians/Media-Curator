import { UmbEntityActionBase as T } from "@umbraco-cms/backoffice/entity-action";
import { css as I, property as z, state as k, customElement as P, html as b } from "@umbraco-cms/backoffice/external/lit";
import { UmbMediaItemRepository as S } from "@umbraco-cms/backoffice/media";
import { umbConfirmModal as L } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as A } from "@umbraco-cms/backoffice/notification";
import { tryExecute as $ } from "@umbraco-cms/backoffice/resources";
import { M as y } from "./sdk.gen-DBpJrjP9.js";
import { UmbLitElement as O } from "@umbraco-cms/backoffice/lit-element";
import { u as q, r as U } from "./reload-people-badges-BK_mojpx.js";
const g = 3, l = (t, e, a) => `${t} ${t === 1 ? e : a}`, _ = "Each image takes at least one AI request (usually more with hierarchical classification).";
function D(t, e, a) {
  return a ? t : e;
}
function K(t) {
  return `There are no images to analyze in "${t}".`;
}
function j(t, e, a, i) {
  const n = `in "${t}" and its subfolders`;
  return i ? `${l(e, "image", "images")} ${n} will be sent to the AI. Stored descriptions, tags and classification codes will be replaced. ${_}` : a === 0 ? `All ${l(e, "image", "images")} ${n} have already been analyzed. Tick "Analyze all images" to analyze them again.` : `${a === e ? l(e, "image", "images") : `${a} of ${l(e, "image", "images")}`} ${n} ${a === 1 ? "has" : "have"} not been analyzed yet and will be sent to the AI. ${_}`;
}
function R(t, e) {
  const a = t - e;
  return a === 0 ? "Nothing has been analyzed yet, so every image is included either way." : `Also re-analyze the ${l(a, "image", "images")} already analyzed, replacing their stored results.`;
}
function v(t, e) {
  const a = e - t;
  return a === 0 ? `Analyzed ${l(e, "image", "images")}.` : `Analyzing image ${t + 1} of ${e} (${a} left)…`;
}
function B(t, e) {
  const a = t.filter((r) => r.analyzed).length, i = t.filter((r) => !r.analyzed), n = [`Analyzed ${a} of ${l(t.length, "image", "images")}.`];
  if (i.length > 0) {
    const r = i.slice(0, g).map((c) => `${c.mediaName || "Unknown"}${c.error ? ` (${c.error})` : ""}`), s = i.length > g ? `, and ${i.length - g} more` : "";
    n.push(`${i.length} failed: ${r.join(", ")}${s}.`);
  }
  return e > 0 && n.push(`Skipped ${l(e, "image", "images")} already analyzed.`), a > 0 && n.push("Run Curate images to move them into their new folders."), n.join(" ");
}
var F = Object.defineProperty, W = Object.getOwnPropertyDescriptor, M = (t) => {
  throw TypeError(t);
}, h = (t, e, a, i) => {
  for (var n = i > 1 ? void 0 : i ? W(e, a) : e, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (n = (i ? s(e, a, n) : s(n)) || n);
  return i && n && F(e, a, n), n;
}, X = (t, e, a) => e.has(t) || M("Cannot " + a), H = (t, e, a) => e.has(t) ? M("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), Y = (t, e, a) => (X(t, e, "access private method"), a), p, x;
let m = class extends O {
  constructor() {
    super(...arguments), H(this, p), this.folderName = "", this.total = 0, this.notAnalyzed = 0, this._all = !1;
  }
  get all() {
    return this._all;
  }
  render() {
    return b`
      <p data-mark="mc:analyze-summary">${j(this.folderName, this.total, this.notAnalyzed, this._all)}</p>
      <uui-checkbox
        data-mark="mc:analyze-all"
        label="Analyze all images"
        .checked=${this._all}
        @change=${Y(this, p, x)}
      ></uui-checkbox>
      <small>${R(this.total, this.notAnalyzed)}</small>
    `;
  }
};
p = /* @__PURE__ */ new WeakSet();
x = function(t) {
  this._all = t.target.checked, this.dispatchEvent(new Event("change"));
};
m.styles = [
  I`
      :host {
        display: block;
        max-width: 480px;
      }
      p {
        margin-top: 0;
      }
      small {
        display: block;
        margin: var(--uui-size-space-1) 0 0 calc(var(--uui-size-space-5) + var(--uui-size-space-2));
        color: var(--uui-color-text-alt);
      }
    `
];
h([
  z()
], m.prototype, "folderName", 2);
h([
  z({ type: Number })
], m.prototype, "total", 2);
h([
  z({ type: Number })
], m.prototype, "notAnalyzed", 2);
h([
  k()
], m.prototype, "_all", 2);
m = h([
  P("mc-analyze-media-confirm")
], m);
async function G(t, e, a, i) {
  const n = new Array(t.length);
  let r = 0, s = 0;
  async function c() {
    for (; r < t.length; ) {
      const d = r++;
      n[d] = await a(t[d]), s++, i?.(n[d], s);
    }
  }
  const w = Math.max(1, Math.min(Math.floor(e) || 1, t.length));
  return await Promise.all(Array.from({ length: w }, c)), n;
}
const f = "Analyze images", E = 4;
class re extends T {
  async execute() {
    const e = this.args.unique;
    if (!e) throw new Error("Unique is not available");
    const a = await this.#n(e), { data: i } = await $(this, y.countMediaImages({ path: { mediaKey: e } }));
    if (!i) return;
    if (i.count === 0) {
      await this.#e("default", K(a));
      return;
    }
    let n = !1;
    try {
      await L(this, {
        headline: f,
        content: b`<mc-analyze-media-confirm
          .folderName=${a}
          .total=${i.count}
          .notAnalyzed=${i.notAnalyzedCount}
          @change=${(o) => n = o.target.all}
        ></mc-analyze-media-confirm>`,
        confirmLabel: "Analyze",
        color: "warning"
      });
    } catch {
      return;
    }
    if (D(i.count, i.notAnalyzedCount, n) === 0) {
      await this.#e("default", `All images in "${a}" have already been analyzed.`);
      return;
    }
    const { data: r } = await $(
      this,
      y.listImagesToAnalyze({ path: { mediaKey: e }, query: { all: n } })
    );
    if (!r) return;
    const s = r.images.length, c = await this.#t(), d = (await this.getContext(A))?.stay("default", { data: { headline: f, message: v(0, s) } });
    let u = [];
    try {
      u = await G(
        r.images,
        c,
        (o) => this.#a(o.mediaKey, o.mediaName, !n),
        (o, N) => q(d, f, v(N, s))
      );
    } finally {
      d?.close();
    }
    const C = u.some((o) => !o.analyzed);
    await this.#e(C ? "warning" : "positive", B(u, r.alreadyAnalyzedCount)), u.some((o) => o.containsPeople != null) && await U(this, r.images.map((o) => o.mediaKey));
  }
  /** Errors are collected for the summary rather than shown one notification at a time. */
  /** With keepExistingAnalysis, an image analyzed before is not sent again; only what it is missing (such as
   * whether it shows people) is decided from its stored description. */
  async #a(e, a, i) {
    try {
      const { data: n, error: r } = await y.reanalyzeImages({
        body: { mediaKeys: [e], keepExistingAnalysis: i }
      }), s = n?.results[0];
      return r || !s ? { mediaName: a, analyzed: !1, error: "The request failed." } : {
        mediaName: s.mediaName ?? a,
        analyzed: s.analyzed,
        error: s.error,
        containsPeople: s.containsPeople
      };
    } catch (n) {
      return { mediaName: a, analyzed: !1, error: n instanceof Error ? n.message : "The request failed." };
    }
  }
  async #t() {
    try {
      const { data: e } = await y.getSettings();
      return e?.maxParallelAnalyses ?? E;
    } catch {
      return E;
    }
  }
  async #n(e) {
    const { data: a } = await new S(this).requestItems([e]);
    return a?.[0]?.name ?? "this folder";
  }
  async #e(e, a) {
    (await this.getContext(A))?.peek(e, { data: { headline: f, message: a } });
  }
}
export {
  re as McAnalyzeMediaEntityAction,
  re as api
};
//# sourceMappingURL=analyze-media.action-BRSqU09M.js.map
