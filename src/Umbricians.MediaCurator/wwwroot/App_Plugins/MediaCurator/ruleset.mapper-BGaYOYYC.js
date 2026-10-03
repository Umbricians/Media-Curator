import { M as n, d as o } from "./bundle.manifests-DU2jrn2u.js";
function i(e) {
  const { key: t, ...u } = e;
  return { ...u, entityType: n, unique: t, rules: e.rules ?? [] };
}
function y(e) {
  const { unique: t, entityType: u, dateUpdated: a, ...r } = e;
  return { ...r, key: t, dateUpdated: a ?? (/* @__PURE__ */ new Date()).toISOString() };
}
function l(e) {
  return { entityType: n, unique: e.key, name: e.name };
}
function d(e, t = {}) {
  return {
    entityType: n,
    unique: e,
    name: "",
    scopeRootKey: o,
    cultureName: null,
    enabled: !0,
    rules: [],
    ...t
  };
}
export {
  i as a,
  y as b,
  d as s,
  l as t
};
//# sourceMappingURL=ruleset.mapper-BGaYOYYC.js.map
