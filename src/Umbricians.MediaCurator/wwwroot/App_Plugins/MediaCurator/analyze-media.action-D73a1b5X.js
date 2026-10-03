import { UmbEntityActionBase as T } from "@umbraco-cms/backoffice/entity-action";
import { css as I, property as z, state as k, customElement as S, html as b } from "@umbraco-cms/backoffice/external/lit";
import { UmbMediaItemRepository as L } from "@umbraco-cms/backoffice/media";
import { umbConfirmModal as O } from "@umbraco-cms/backoffice/modal";
import { UMB_NOTIFICATION_CONTEXT as A } from "@umbraco-cms/backoffice/notification";
import { tryExecute as $ } from "@umbraco-cms/backoffice/resources";
import { M as u } from "./sdk.gen-LMy3RyM3.js";
import { UmbLitElement as P } from "@umbraco-cms/backoffice/lit-element";
const g = 3, o = (t, e, a) => `${t} ${t === 1 ? e : a}`, _ = "Each image takes at least one AI request (usually more with hierarchical classification).";
function q(t, e, a) {
  return a ? t : e;
}
function U(t) {
  return `There are no images to analyze in "${t}".`;
}
function D(t, e, a, n) {
  const i = `in "${t}" and its subfolders`;
  return n ? `${o(e, "image", "images")} ${i} will be sent to the AI. Stored descriptions, tags and classification codes will be replaced. ${_}` : a === 0 ? `All ${o(e, "image", "images")} ${i} have already been analyzed. Tick "Analyze all images" to analyze them again.` : `${a === e ? o(e, "image", "images") : `${a} of ${o(e, "image", "images")}`} ${i} ${a === 1 ? "has" : "have"} not been analyzed yet and will be sent to the AI. ${_}`;
}
function j(t, e) {
  const a = t - e;
  return a === 0 ? "Nothing has been analyzed yet, so every image is included either way." : `Also re-analyze the ${o(a, "image", "images")} already analyzed, replacing their stored results.`;
}
function v(t, e) {
  const a = e - t;
  return a === 0 ? `Analyzed ${o(e, "image", "images")}.` : `Analyzing image ${t + 1} of ${e} (${a} left)…`;
}
function K(t, e) {
  const a = t.filter((r) => r.analyzed).length, n = t.filter((r) => !r.analyzed), i = [`Analyzed ${a} of ${o(t.length, "image", "images")}.`];
  if (n.length > 0) {
    const r = n.slice(0, g).map((l) => `${l.mediaName || "Unknown"}${l.error ? ` (${l.error})` : ""}`), s = n.length > g ? `, and ${n.length - g} more` : "";
    i.push(`${n.length} failed: ${r.join(", ")}${s}.`);
  }
  return e > 0 && i.push(`Skipped ${o(e, "image", "images")} already analyzed.`), a > 0 && i.push("Run Curate images to move them into their new folders."), i.join(" ");
}
var R = Object.defineProperty, F = Object.getOwnPropertyDescriptor, M = (t) => {
  throw TypeError(t);
}, h = (t, e, a, n) => {
  for (var i = n > 1 ? void 0 : n ? F(e, a) : e, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (i = (n ? s(e, a, i) : s(i)) || i);
  return n && i && R(e, a, i), i;
}, B = (t, e, a) => e.has(t) || M("Cannot " + a), W = (t, e, a) => e.has(t) ? M("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), X = (t, e, a) => (B(t, e, "access private method"), a), p, C;
let m = class extends P {
  constructor() {
    super(...arguments), W(this, p), this.folderName = "", this.total = 0, this.notAnalyzed = 0, this._all = !1;
  }
  get all() {
    return this._all;
  }
  render() {
    return b`
      <p data-mark="mc:analyze-summary">${D(this.folderName, this.total, this.notAnalyzed, this._all)}</p>
      <uui-checkbox
        data-mark="mc:analyze-all"
        label="Analyze all images"
        .checked=${this._all}
        @change=${X(this, p, C)}
      ></uui-checkbox>
      <small>${j(this.total, this.notAnalyzed)}</small>
    `;
  }
};
p = /* @__PURE__ */ new WeakSet();
C = function(t) {
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
  S("mc-analyze-media-confirm")
], m);
function H(t, e, a) {
  const n = t?.element.firstElementChild;
  n && (n.data = { headline: e, message: a });
}
async function Y(t, e, a, n) {
  const i = new Array(t.length);
  let r = 0, s = 0;
  async function l() {
    for (; r < t.length; ) {
      const d = r++;
      i[d] = await a(t[d]), s++, n?.(i[d], s);
    }
  }
  const w = Math.max(1, Math.min(Math.floor(e) || 1, t.length));
  return await Promise.all(Array.from({ length: w }, l)), i;
}
const y = "Analyze images", E = 4;
class ne extends T {
  async execute() {
    const e = this.args.unique;
    if (!e) throw new Error("Unique is not available");
    const a = await this.#n(e), { data: n } = await $(this, u.countMediaImages({ path: { mediaKey: e } }));
    if (!n) return;
    if (n.count === 0) {
      await this.#e("default", U(a));
      return;
    }
    let i = !1;
    try {
      await O(this, {
        headline: y,
        content: b`<mc-analyze-media-confirm
          .folderName=${a}
          .total=${n.count}
          .notAnalyzed=${n.notAnalyzedCount}
          @change=${(c) => i = c.target.all}
        ></mc-analyze-media-confirm>`,
        confirmLabel: "Analyze",
        color: "warning"
      });
    } catch {
      return;
    }
    if (q(n.count, n.notAnalyzedCount, i) === 0) {
      await this.#e("default", `All images in "${a}" have already been analyzed.`);
      return;
    }
    const { data: r } = await $(
      this,
      u.listImagesToAnalyze({ path: { mediaKey: e }, query: { all: i } })
    );
    if (!r) return;
    const s = r.images.length, l = await this.#t(), d = (await this.getContext(A))?.stay("default", { data: { headline: y, message: v(0, s) } });
    let f = [];
    try {
      f = await Y(
        r.images,
        l,
        (c) => this.#a(c.mediaKey, c.mediaName),
        (c, N) => H(d, y, v(N, s))
      );
    } finally {
      d?.close();
    }
    const x = f.some((c) => !c.analyzed);
    await this.#e(x ? "warning" : "positive", K(f, r.alreadyAnalyzedCount));
  }
  /** Errors are collected for the summary rather than shown one notification at a time. */
  async #a(e, a) {
    try {
      const { data: n, error: i } = await u.reanalyzeImages({ body: { mediaKeys: [e] } }), r = n?.results[0];
      return i || !r ? { mediaName: a, analyzed: !1, error: "The request failed." } : { mediaName: r.mediaName ?? a, analyzed: r.analyzed, error: r.error };
    } catch (n) {
      return { mediaName: a, analyzed: !1, error: n instanceof Error ? n.message : "The request failed." };
    }
  }
  async #t() {
    try {
      const { data: e } = await u.getSettings();
      return e?.maxParallelAnalyses ?? E;
    } catch {
      return E;
    }
  }
  async #n(e) {
    const { data: a } = await new L(this).requestItems([e]);
    return a?.[0]?.name ?? "this folder";
  }
  async #e(e, a) {
    (await this.getContext(A))?.peek(e, { data: { headline: y, message: a } });
  }
}
export {
  ne as McAnalyzeMediaEntityAction,
  ne as api
};
//# sourceMappingURL=analyze-media.action-D73a1b5X.js.map
