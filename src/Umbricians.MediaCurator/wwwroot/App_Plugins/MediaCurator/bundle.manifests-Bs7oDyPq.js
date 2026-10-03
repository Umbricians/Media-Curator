import { UmbPathPattern as s } from "@umbraco-cms/backoffice/router";
import { UMB_WORKSPACE_PATH_PATTERN as m, UMB_WORKSPACE_CONDITION_ALIAS as E, UMB_WORKSPACE_ENTITY_IS_NEW_CONDITION_ALIAS as A, UmbSubmitWorkspaceAction as S } from "@umbraco-cms/backoffice/workspace";
import { UmbItemStoreBase as T } from "@umbraco-cms/backoffice/store";
import { UmbContextToken as _ } from "@umbraco-cms/backoffice/context-api";
const b = [
  {
    name: "Media Curator Entrypoint",
    alias: "Umbricians.MediaCurator.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-D1teVEvQ.js")
  }
], U = [
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
], w = [
  {
    type: "modal",
    alias: "Umbricians.MediaCurator.Modal.RuleSettings",
    name: "Media Curator Rule Settings Modal",
    element: () => import("./rule-settings-modal.element-BYD_cwSE.js")
  }
], t = "mc-root", a = "mc-ruleset", j = "00000000-0000-0000-0000-000000000000", c = "settings", i = "Umbricians.MediaCurator.Menu", l = "Umbricians.MediaCurator.MenuItem.Rulesets", u = "Umbricians.MediaCurator.Tree.Rulesets", n = "Umbricians.MediaCurator.Repository.Ruleset.Tree", p = "Umbricians.MediaCurator.Repository.Ruleset.Detail", g = "Umbricians.MediaCurator.Store.Ruleset.Detail", d = "Umbricians.MediaCurator.Repository.Ruleset.Item", I = "Umbricians.MediaCurator.Store.Ruleset.Item", C = "Umbricians.MediaCurator.Workspace.Root", y = "Umbricians.MediaCurator.Workspace.Ruleset", X = m.generateAbsolute({
  sectionName: c,
  entityType: t
}), M = m.generateAbsolute({
  sectionName: c,
  entityType: a
}), J = new s("create/parent/:parentEntityType/:parentUnique", M);
new s(
  "edit/:unique",
  M
);
const k = [
  {
    type: "repository",
    alias: n,
    name: "Media Curator Ruleset Tree Repository",
    api: () => import("./ruleset-tree.repository-BjVfAOvF.js")
  },
  {
    type: "tree",
    kind: "default",
    alias: u,
    name: "Media Curator Ruleset Tree",
    meta: { repositoryAlias: n }
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
], f = new _("McRulesetItemStore");
class h extends T {
  constructor(R) {
    super(R, f.toString());
  }
}
const P = [
  {
    type: "repository",
    alias: d,
    name: "Media Curator Ruleset Item Repository",
    api: () => import("./ruleset-item.repository-CIvsIEb-.js")
  },
  {
    type: "itemStore",
    alias: I,
    name: "Media Curator Ruleset Item Store",
    api: h
  }
], O = [
  {
    type: "entityAction",
    kind: "default",
    alias: "Umbricians.MediaCurator.EntityAction.Ruleset.Create",
    name: "Create Media Curator Ruleset Entity Action",
    weight: 1200,
    api: () => import("./create-ruleset.action-CQDGRiD2.js"),
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
      itemRepositoryAlias: d,
      detailRepositoryAlias: p
    }
  }
], L = [
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
    alias: l,
    name: "Media Curator Menu Item",
    weight: 100,
    meta: {
      label: "Media Curator",
      icon: "icon-mindmap",
      entityType: t,
      treeAlias: u,
      menus: [i]
    }
  }
], o = [{ alias: "Umb.Condition.WorkspaceAlias", match: C }], W = [
  {
    type: "workspace",
    kind: "default",
    alias: C,
    name: "Media Curator Root Workspace",
    meta: { entityType: t, headline: "Media Curator" }
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Root.Setup",
    name: "Media Curator Setup View",
    element: () => import("./setup-view.element-BSb-1K7g.js"),
    weight: 300,
    meta: { label: "Setup", pathname: "setup", icon: "icon-settings" },
    conditions: o
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Root.Reanalyze",
    name: "Media Curator Re-analyze Image View",
    element: () => import("./reanalyze-view.element-Ciq3LMVM.js"),
    weight: 200,
    meta: { label: "Re-analyze image", pathname: "reanalyze", icon: "icon-wand" },
    conditions: o
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Root.Activity",
    name: "Media Curator Activity Log View",
    element: () => import("./activity-view.element-DjvcFf8t.js"),
    weight: 100,
    meta: { label: "Activity log", pathname: "activity", icon: "icon-history" },
    conditions: o
  }
], N = [
  ...L,
  ...k,
  ...P,
  ...O,
  ...W
], z = [
  {
    type: "repository",
    alias: p,
    name: "Media Curator Ruleset Detail Repository",
    api: () => import("./ruleset-detail.repository--c5QZ8qi.js")
  },
  {
    type: "store",
    alias: g,
    name: "Media Curator Ruleset Detail Store",
    api: () => import("./ruleset-detail.store-CPa94nJU.js")
  }
], e = { alias: E, match: y }, r = { alias: A, match: !1 }, V = [
  {
    type: "workspace",
    kind: "routable",
    alias: y,
    name: "Media Curator Ruleset Workspace",
    api: () => import("./ruleset-workspace.context-rs8NGXT8.js"),
    meta: { entityType: a }
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Ruleset.Design",
    name: "Media Curator Ruleset Design View",
    element: () => import("./ruleset-design-view.element-xBjal-20.js"),
    weight: 300,
    meta: { label: "Design", pathname: "design", icon: "icon-mindmap" },
    conditions: [e]
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Ruleset.Settings",
    name: "Media Curator Ruleset Settings View",
    element: () => import("./ruleset-settings-view.element-6nSyKq7L.js"),
    weight: 200,
    meta: { label: "Settings", pathname: "settings", icon: "icon-settings" },
    conditions: [e]
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Ruleset.Requirements",
    name: "Media Curator Ruleset Requirements View",
    element: () => import("./ruleset-requirements-view.element-PPNV-Vae.js"),
    weight: 150,
    meta: { label: "Requirements", pathname: "requirements", icon: "icon-checkbox" },
    conditions: [e, r]
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Ruleset.Curate",
    name: "Media Curator Ruleset Curate View",
    element: () => import("./ruleset-curate-view.element-CAVsvm5z.js"),
    weight: 100,
    meta: { label: "Curate", pathname: "curate", icon: "icon-play" },
    conditions: [e, r]
  },
  {
    type: "workspaceAction",
    kind: "default",
    alias: "Umbricians.MediaCurator.WorkspaceAction.Ruleset.Save",
    name: "Save Media Curator Ruleset",
    api: S,
    weight: 90,
    meta: { label: "Save", look: "primary", color: "positive" },
    conditions: [e]
  },
  {
    type: "workspaceContext",
    kind: "menuStructure",
    alias: "Umbricians.MediaCurator.Context.Ruleset.Menu.Structure",
    name: "Media Curator Ruleset Menu Structure Context",
    api: () => import("./ruleset-menu-structure.context-CE4XBRba.js"),
    meta: { menuItemAlias: l },
    conditions: [e]
  },
  {
    type: "workspaceFooterApp",
    kind: "menuBreadcrumb",
    alias: "Umbricians.MediaCurator.WorkspaceFooterApp.Ruleset.Breadcrumb",
    name: "Media Curator Ruleset Breadcrumb",
    conditions: [e]
  }
], $ = [...z, ...V], D = [
  {
    type: "entityAction",
    kind: "default",
    alias: "Umbricians.MediaCurator.EntityAction.Media.Curate",
    name: "Curate Images Entity Action",
    weight: 50,
    api: () => import("./curate-media.action-slXhYZvB.js"),
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
    api: () => import("./analyze-media.action-0NYAy6x6.js"),
    forEntityTypes: ["media"],
    meta: { icon: "icon-refresh", label: "Analyze images" },
    conditions: [{ alias: "Umb.Condition.SectionUserPermission", match: "Umb.Section.Settings" }]
  }
], B = "MediaCurator.ContainsPeople", Y = "MediaCurator.ContainsPeopleBelow", v = [
  {
    type: "entitySign",
    kind: "icon",
    alias: "Umbricians.MediaCurator.EntitySign.ContainsPeople",
    name: "Contains People Media Entity Sign",
    forEntityTypes: ["media"],
    forEntityFlags: [B],
    weight: 900,
    meta: { iconName: "icon-user", label: "#mediaCurator_containsPeople", iconColorAlias: "blue" }
  },
  {
    type: "entitySign",
    kind: "icon",
    alias: "Umbricians.MediaCurator.EntitySign.ContainsPeopleBelow",
    name: "Contains People Below Media Entity Sign",
    forEntityTypes: ["media"],
    forEntityFlags: [Y],
    weight: 890,
    meta: { iconName: "icon-users", label: "#mediaCurator_containsPeopleBelow", iconColorAlias: "light-blue" }
  }
], F = [
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
], Q = [
  ...b,
  ...U,
  ...w,
  ...N,
  ...$,
  ...D,
  ...v,
  ...F
];
export {
  a as M,
  t as a,
  f as b,
  J as c,
  j as d,
  X as e,
  p as f,
  y as g,
  n as h,
  Q as m
};
//# sourceMappingURL=bundle.manifests-Bs7oDyPq.js.map
