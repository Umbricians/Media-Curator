import { M as i } from "./sdk.gen-DBpJrjP9.js";
const s = 3e3, d = (t) => t?.state === "queued" || t?.state === "running";
async function c(t, e) {
  for (; ; ) {
    await new Promise((n) => setTimeout(n, s));
    const a = await l(t);
    if (a === null) return null;
    if (a !== void 0) {
      if (!d(a)) return a;
      e(a);
    }
  }
}
async function l(t) {
  try {
    const { data: e, response: a } = await i.getQueueItemStatus({ path: { mediaKey: t } });
    return a?.status === 204 ? null : e ?? void 0;
  } catch {
    return;
  }
}
const r = (t, e, a) => `${t} ${t === 1 ? e : a}`;
function m(t, e) {
  const a = [`${r(e.moveCount, "image", "images")} in "${t}" and its subfolders will be moved`];
  return e.alreadyInPlaceCount > 0 && a.push(`${e.alreadyInPlaceCount} already in place`), e.skippedCount > 0 && a.push(`${e.skippedCount} skipped`), `${a.join(", ")}.`;
}
function f(t) {
  return t.rulesets.filter((e) => e.moveCount > 0).map((e) => `${e.name}: ${r(e.moveCount, "image", "images")}`);
}
function p(t, e) {
  if (e.alreadyInPlaceCount === 0 && e.skippedCount === 0)
    return `There are no images to curate in "${t}".`;
  const a = [];
  return e.alreadyInPlaceCount > 0 && a.push(`${e.alreadyInPlaceCount} already in place`), e.skippedCount > 0 && a.push(`${e.skippedCount} skipped (no ruleset applies, excluded, or not an image)`), `Nothing to move in "${t}": ${a.join(", ")}.`;
}
function y(t, e = !1) {
  const a = `Curated: ${t.moved} moved, ${t.alreadyInPlace} already in place, ${t.failed} failed.`, n = t.foldersRemoved ?? 0;
  if (n === 0) return a;
  const o = e ? "deleted permanently" : "moved to the Recycle Bin";
  return `${a} ${r(n, "empty folder", "empty folders")} ${o}.`;
}
function $(t) {
  return t === 0 ? "Any sub-folders the run leaves empty will be removed." : `${r(t, "empty sub-folder", "empty sub-folders")} will also be removed, plus any the run leaves empty.`;
}
function g(t, e, a) {
  const n = e.alreadyInPlaceCount > 0 ? ` (${e.alreadyInPlaceCount} already in place)` : "";
  return `No images in "${t}" need moving${n}. ${r(a, "empty sub-folder", "empty sub-folders")} will be removed.`;
}
function v(t, e) {
  return t > 0 ? `Move ${t}` : `Remove ${r(e, "empty folder", "empty folders")}`;
}
function h(t) {
  return t ? "Empty sub-folders left after the run will be deleted permanently. Undo recreates them by name." : "Empty sub-folders left after the run will be moved to the Recycle Bin.";
}
function b(t, e, a) {
  return `"${t}" and its subfolders hold ${r(e, "image", "images")}. Folders with more than ${a} images are curated in the background, so you can carry on working while it runs.`;
}
function w(t, e) {
  return e.state === "queued" ? `"${t}" is queued and will start in a few seconds.` : e.total === 0 ? `Working out where the images in "${t}" belong…` : `Curating "${t}": ${e.processed} of ${r(e.total, "image", "images")} moved.`;
}
function k(t, e, a = !1) {
  if (e.state === "failed") return `Curating "${t}" stopped: ${e.error ?? "unknown error"}. The Activity log shows what moved, and can undo it.`;
  const n = `Curated "${t}" in the background: ${e.moved} moved, ${e.alreadyInPlace} already in place, ${e.failed} failed.`;
  if (e.foldersRemoved === 0) return n;
  const o = a ? "deleted permanently" : "moved to the Recycle Bin";
  return `${n} ${r(e.foldersRemoved, "empty folder", "empty folders")} ${o}.`;
}
export {
  m as a,
  g as b,
  v as c,
  y as d,
  $ as e,
  b as f,
  w as g,
  k as h,
  d as i,
  l as j,
  h as k,
  p as n,
  f as r,
  c as w
};
//# sourceMappingURL=curate-media.summary-Daao9zsU.js.map
