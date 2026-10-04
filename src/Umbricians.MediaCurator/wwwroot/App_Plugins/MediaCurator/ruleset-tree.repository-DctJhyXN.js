import { UmbTreeServerDataSourceBase as o, UmbTreeRepositoryBase as i } from "@umbraco-cms/backoffice/tree";
import { M as u, a } from "./bundle.manifests-jPVwANZA.js";
import { M as n } from "./sdk.gen-BaXox45_.js";
const c = "icon-mindmap";
function l(e) {
  return {
    unique: e.key,
    parent: { unique: null, entityType: a },
    name: e.name,
    entityType: u,
    hasChildren: !1,
    isFolder: !1,
    icon: c
  };
}
function m(e) {
  return [...e].sort((t, r) => t.name.localeCompare(r.name, void 0, { sensitivity: "base" }));
}
class d extends o {
  constructor(t) {
    super(t, {
      getRootItems: s,
      getChildrenOf: p,
      getAncestorsOf: T,
      mapper: (r) => l(r)
    });
  }
}
const s = async () => {
  const e = await n.getRulesets();
  if (e.error || !e.data)
    return { error: e.error };
  const t = m(e.data).map((r) => ({ ...r, hasChildren: !1 }));
  return { data: { items: t, total: t.length } };
}, p = async (e) => e.parent.unique === null ? s() : { data: { items: [], total: 0 } }, T = async (e) => {
  const t = await n.getRuleset({ path: { key: e.treeItem.unique } });
  return t.error || !t.data ? { error: t.error } : { data: [{ ...t.data, hasChildren: !1 }] };
};
class C extends i {
  constructor(t) {
    super(t, d);
  }
  async requestTreeRoot() {
    return { data: {
      unique: null,
      entityType: a,
      name: "Media Curator",
      icon: "icon-mindmap",
      hasChildren: !0,
      isFolder: !0
    } };
  }
}
export {
  C as McRulesetTreeRepository,
  C as api
};
//# sourceMappingURL=ruleset-tree.repository-DctJhyXN.js.map
