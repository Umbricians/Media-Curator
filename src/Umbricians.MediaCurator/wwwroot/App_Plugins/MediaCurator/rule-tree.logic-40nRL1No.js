function o(r, t, e) {
  const n = (l, i) => l.flatMap((a, c) => {
    if (c !== t[i]) return [a];
    if (i === t.length - 1) {
      const s = e(a);
      return s === null ? [] : [s];
    }
    return [{ ...a, children: n(a.children ?? [], i + 1) }];
  });
  return n(r, 0);
}
function u(r, t, e) {
  return o(r, t, (n) => ({ ...n, children: [...n.children ?? [], e] }));
}
function d(r, t) {
  let e = r, n;
  for (const l of t) {
    if (n = e[l], !n) return;
    e = n.children ?? [];
  }
  return n;
}
function g(r, t, e) {
  if (!t) return { rules: [...r, e], path: [r.length] };
  const n = d(r, t)?.children?.length ?? 0;
  return { rules: u(r, t, e), path: [...t, n] };
}
function f(r, t) {
  return o(r, t, () => null);
}
function p(r, t, e) {
  const n = t.slice(0, -1), l = t[t.length - 1], i = (a) => {
    if (e < 0 || e >= a.length || e === l) return a;
    const c = [...a], [s] = c.splice(l, 1);
    return s ? (c.splice(e, 0, s), c) : a;
  };
  return n.length === 0 ? i(r) : o(r, n, (a) => ({ ...a, children: i(a.children ?? []) }));
}
function m(r) {
  const t = {};
  for (const e of r.settingsFields ?? [])
    e.defaultValue != null && (t[e.alias] = e.defaultValue);
  return t;
}
function M(r, t) {
  const e = r.settings ?? {}, n = (l, i) => {
    const c = String(e[l] ?? "").split(`
`).find((s) => s.includes("="));
    return c && c.split("=")[1]?.trim() || i;
  };
  switch (r.providerAlias) {
    case "Umbricians.MediaCurator.Date": {
      const l = String(e.format ?? "yyyy/MM"), i = /* @__PURE__ */ new Date();
      return l.split("/").map(
        (a) => a.replace(/yyyy/g, String(i.getFullYear())).replace(/yy/g, String(i.getFullYear()).slice(-2)).replace(/MMMM/g, i.toLocaleString(void 0, { month: "long" })).replace(/MM/g, String(i.getMonth() + 1).padStart(2, "0")).replace(/dd/g, String(i.getDate()).padStart(2, "0"))
      ).join("/");
    }
    case "Umbricians.MediaCurator.Alphabetical":
      return "A";
    case "Umbricians.MediaCurator.Exif":
      return n("mappings", "Nikon");
    case "Umbricians.MediaCurator.AiTag":
      return n("mappings", "people");
    case "Umbricians.MediaCurator.Color":
      return String(e.palette ?? "Red=#FF0000").split(`
`)[0]?.split("=")[0]?.trim() || "Red";
    default:
      return t.find((l) => l.alias === r.providerAlias)?.name ?? "…";
  }
}
export {
  g as a,
  d as b,
  f as c,
  m as d,
  p as r,
  M as s,
  o as u
};
//# sourceMappingURL=rule-tree.logic-40nRL1No.js.map
