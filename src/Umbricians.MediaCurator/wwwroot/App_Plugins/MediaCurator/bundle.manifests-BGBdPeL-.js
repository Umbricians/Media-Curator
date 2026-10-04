import { UmbPathPattern as p } from "@umbraco-cms/backoffice/router";
import { UMB_WORKSPACE_PATH_PATTERN as u, UMB_WORKSPACE_CONDITION_ALIAS as _, UMB_WORKSPACE_ENTITY_IS_NEW_CONDITION_ALIAS as b, UmbSubmitWorkspaceAction as g } from "@umbraco-cms/backoffice/workspace";
import { UmbItemStoreBase as w } from "@umbraco-cms/backoffice/store";
import { UmbContextToken as U } from "@umbraco-cms/backoffice/context-api";
const f = [
  {
    name: "Media Curator Entrypoint",
    alias: "Umbricians.MediaCurator.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-D1teVEvQ.js")
  }
], I = [
  {
    name: "MediaCurator Pizza Original Test Target Repository",
    alias: "Uai.Repository.TestFeatureEntity.media-curator-pizza-original",
    type: "repository",
    api: () => import("./pizza-test-target.repository-VKxrW87u.js"),
    meta: {
      feature: "media-curator-pizza-original"
    }
  },
  {
    name: "MediaCurator Pizza Prepared Test Target Repository",
    alias: "Uai.Repository.TestFeatureEntity.media-curator-pizza-prepared",
    type: "repository",
    api: () => import("./pizza-test-target.repository-VKxrW87u.js"),
    meta: {
      feature: "media-curator-pizza-prepared"
    }
  }
], k = [
  {
    type: "modal",
    alias: "Umbricians.MediaCurator.Modal.RuleSettings",
    name: "Media Curator Rule Settings Modal",
    element: () => import("./rule-settings-modal.element-BYD_cwSE.js")
  }
], t = "mc-root", a = "mc-ruleset", ee = "00000000-0000-0000-0000-000000000000", d = "settings", i = "Umbricians.MediaCurator.Menu", C = "Umbricians.MediaCurator.MenuItem.Rulesets", y = "Umbricians.MediaCurator.Tree.Rulesets", m = "Umbricians.MediaCurator.Repository.Ruleset.Tree", M = "Umbricians.MediaCurator.Repository.Ruleset.Detail", h = "Umbricians.MediaCurator.Store.Ruleset.Detail", R = "Umbricians.MediaCurator.Repository.Ruleset.Item", P = "Umbricians.MediaCurator.Store.Ruleset.Item", E = "Umbricians.MediaCurator.Workspace.Root", A = "Umbricians.MediaCurator.Workspace.Ruleset", te = u.generateAbsolute({
  sectionName: d,
  entityType: t
}), S = u.generateAbsolute({
  sectionName: d,
  entityType: a
}), ae = new p("create/parent/:parentEntityType/:parentUnique", S);
new p(
  "edit/:unique",
  S
);
const O = [
  {
    type: "repository",
    alias: m,
    name: "Media Curator Ruleset Tree Repository",
    api: () => import("./ruleset-tree.repository-CDZlK9yo.js")
  },
  {
    type: "tree",
    kind: "default",
    alias: y,
    name: "Media Curator Ruleset Tree",
    meta: { repositoryAlias: m }
  },
  {
    type: "treeItem",
    kind: "default",
    alias: "Umbricians.MediaCurator.TreeItem.Ruleset",
    name: "Media Curator Ruleset Tree Item",
    forEntityTypes: [t, a]
  },
  {
    type: "entityAction",
    kind: "reloadTreeItemChildren",
    alias: "Umbricians.MediaCurator.EntityAction.Root.ReloadChildren",
    name: "Reload Media Curator Tree Children Entity Action",
    forEntityTypes: [t]
  }
], L = new U("McRulesetItemStore");
class N extends w {
  constructor(T) {
    super(T, L.toString());
  }
}
const W = [
  {
    type: "repository",
    alias: R,
    name: "Media Curator Ruleset Item Repository",
    api: () => import("./ruleset-item.repository-Do13UuWz.js")
  },
  {
    type: "itemStore",
    alias: P,
    name: "Media Curator Ruleset Item Store",
    api: N
  }
], z = [
  {
    type: "entityAction",
    kind: "default",
    alias: "Umbricians.MediaCurator.EntityAction.Ruleset.Create",
    name: "Create Media Curator Ruleset Entity Action",
    weight: 1200,
    api: () => import("./create-ruleset.action-CO9AUlC0.js"),
    forEntityTypes: [t],
    meta: { icon: "icon-add", label: "Create ruleset" }
  },
  {
    type: "entityAction",
    kind: "delete",
    alias: "Umbricians.MediaCurator.EntityAction.Ruleset.Delete",
    name: "Delete Media Curator Ruleset Entity Action",
    forEntityTypes: [a],
    meta: {
      itemRepositoryAlias: R,
      detailRepositoryAlias: M
    }
  }
], v = [
  {
    type: "menu",
    alias: i,
    name: "Media Curator Menu"
  },
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "Umbricians.MediaCurator.SectionSidebarMenu",
    name: "Media Curator Sidebar Menu",
    weight: 50,
    meta: { label: "Media Curator", menu: i },
    conditions: [{ alias: "Umb.Condition.SectionAlias", match: "Umb.Section.Settings" }]
  },
  {
    type: "menuItem",
    kind: "tree",
    alias: C,
    name: "Media Curator Menu Item",
    weight: 100,
    meta: {
      label: "Media Curator",
      icon: "icon-mindmap",
      entityType: t,
      treeAlias: y,
      menus: [i]
    }
  }
], o = [{ alias: "Umb.Condition.WorkspaceAlias", match: E }], V = [
  {
    type: "workspace",
    kind: "default",
    alias: E,
    name: "Media Curator Root Workspace",
    meta: { entityType: t, headline: "Media Curator" }
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Root.Setup",
    name: "Media Curator Setup View",
    element: () => import("./setup-view.element-CmyOACBu.js"),
    weight: 300,
    meta: { label: "Setup", pathname: "setup", icon: "icon-settings" },
    conditions: o
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Root.Reanalyze",
    name: "Media Curator Re-analyze Image View",
    element: () => import("./reanalyze-view.element-tYXeEbeS.js"),
    weight: 200,
    meta: { label: "Re-analyze image", pathname: "reanalyze", icon: "icon-wand" },
    conditions: o
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Root.Activity",
    name: "Media Curator Activity Log View",
    element: () => import("./activity-view.element-DuodU7k0.js"),
    weight: 100,
    meta: { label: "Activity log", pathname: "activity", icon: "icon-history" },
    conditions: o
  }
], $ = [
  ...v,
  ...O,
  ...W,
  ...z,
  ...V
], D = [
  {
    type: "repository",
    alias: M,
    name: "Media Curator Ruleset Detail Repository",
    api: () => import("./ruleset-detail.repository-ydtAdKW_.js")
  },
  {
    type: "store",
    alias: h,
    name: "Media Curator Ruleset Detail Store",
    api: () => import("./ruleset-detail.store-CPa94nJU.js")
  }
], e = { alias: _, match: A }, c = { alias: b, match: !1 }, B = [
  {
    type: "workspace",
    kind: "routable",
    alias: A,
    name: "Media Curator Ruleset Workspace",
    api: () => import("./ruleset-workspace.context-CjuO0NnT.js"),
    meta: { entityType: a }
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Ruleset.Design",
    name: "Media Curator Ruleset Design View",
    element: () => import("./ruleset-design-view.element-Chbjjmd9.js"),
    weight: 300,
    meta: { label: "Design", pathname: "design", icon: "icon-mindmap" },
    conditions: [e]
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Ruleset.Settings",
    name: "Media Curator Ruleset Settings View",
    element: () => import("./ruleset-settings-view.element-UMfVUXP3.js"),
    weight: 200,
    meta: { label: "Settings", pathname: "settings", icon: "icon-settings" },
    conditions: [e]
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Ruleset.Requirements",
    name: "Media Curator Ruleset Requirements View",
    element: () => import("./ruleset-requirements-view.element-B8qh3WcV.js"),
    weight: 150,
    meta: { label: "Requirements", pathname: "requirements", icon: "icon-checkbox" },
    conditions: [e, c]
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Ruleset.Curate",
    name: "Media Curator Ruleset Curate View",
    element: () => import("./ruleset-curate-view.element-BTJy6s-R.js"),
    weight: 100,
    meta: { label: "Curate", pathname: "curate", icon: "icon-play" },
    conditions: [e, c]
  },
  {
    type: "workspaceAction",
    kind: "default",
    alias: "Umbricians.MediaCurator.WorkspaceAction.Ruleset.Save",
    name: "Save Media Curator Ruleset",
    api: g,
    weight: 90,
    meta: { label: "Save", look: "primary", color: "positive" },
    conditions: [e]
  },
  {
    type: "workspaceContext",
    kind: "menuStructure",
    alias: "Umbricians.MediaCurator.Context.Ruleset.Menu.Structure",
    name: "Media Curator Ruleset Menu Structure Context",
    api: () => import("./ruleset-menu-structure.context-3WLwVAPw.js"),
    meta: { menuItemAlias: C },
    conditions: [e]
  },
  {
    type: "workspaceFooterApp",
    kind: "menuBreadcrumb",
    alias: "Umbricians.MediaCurator.WorkspaceFooterApp.Ruleset.Breadcrumb",
    name: "Media Curator Ruleset Breadcrumb",
    conditions: [e]
  }
], x = [...D, ...B], Y = [
  {
    type: "entityAction",
    kind: "default",
    alias: "Umbricians.MediaCurator.EntityAction.Media.Curate",
    name: "Curate Images Entity Action",
    weight: 50,
    api: () => import("./curate-media.action-CGXQbUhN.js"),
    forEntityTypes: ["media"],
    meta: { icon: "icon-wand", label: "Curate images" },
    // The Media Curator API requires Settings section access.
    conditions: [{ alias: "Umb.Condition.SectionUserPermission", match: "Umb.Section.Settings" }]
  },
  {
    type: "entityAction",
    kind: "default",
    alias: "Umbricians.MediaCurator.EntityAction.Media.Analyze",
    name: "Analyze Images Entity Action",
    weight: 40,
    api: () => import("./analyze-media.action-BRSqU09M.js"),
    forEntityTypes: ["media"],
    meta: { icon: "icon-refresh", label: "Analyze images" },
    conditions: [{ alias: "Umb.Condition.SectionUserPermission", match: "Umb.Section.Settings" }]
  }
], F = "MediaCurator.ContainsPeople", K = "MediaCurator.ContainsPeopleBelow", l = (s) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="overflow:visible"><g style="stroke:var(--uui-color-surface,#fff);stroke-width:3;paint-order:stroke">${s}</g></svg>`, n = "icon-mediacurator-person", r = "icon-mediacurator-dot", q = [
  {
    name: n,
    path: () => Promise.resolve({ default: l('<path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5 0-9 2.6-9 6v2h18v-2c0-3.4-4-6-9-6Z"/>') })
  },
  {
    name: r,
    path: () => Promise.resolve({ default: l('<circle cx="12" cy="12" r="8"/>') })
  }
], j = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DOT_ICON: r,
  PERSON_ICON: n,
  default: q
}, Symbol.toStringTag, { value: "Module" })), H = [
  {
    type: "icons",
    alias: "Umbricians.MediaCurator.Icons.People",
    name: "Media Curator People Icons",
    js: () => Promise.resolve().then(() => j)
  },
  {
    type: "entitySign",
    kind: "icon",
    alias: "Umbricians.MediaCurator.EntitySign.ContainsPeople",
    name: "Contains People Media Entity Sign",
    forEntityTypes: ["media"],
    forEntityFlags: [F],
    weight: 900,
    meta: { iconName: n, label: "#mediaCurator_containsPeople", iconColorAlias: "red" }
  },
  {
    type: "entitySign",
    kind: "icon",
    alias: "Umbricians.MediaCurator.EntitySign.ContainsPeopleBelow",
    name: "Contains People Below Media Entity Sign",
    forEntityTypes: ["media"],
    forEntityFlags: [K],
    weight: 890,
    meta: { iconName: r, label: "#mediaCurator_containsPeopleBelow", iconColorAlias: "red" }
  }
], G = [
  {
    type: "localization",
    alias: "Umbricians.MediaCurator.Localization.En",
    name: "Media Curator English",
    weight: 100,
    meta: {
      culture: "en"
    },
    js: () => import("./en-DBW87d1W.js")
  }
], ie = [
  ...f,
  ...I,
  ...k,
  ...$,
  ...x,
  ...Y,
  ...H,
  ...G
];
export {
  a as M,
  t as a,
  L as b,
  ae as c,
  ee as d,
  te as e,
  M as f,
  A as g,
  m as h,
  ie as m
};
//# sourceMappingURL=bundle.manifests-BGBdPeL-.js.map
