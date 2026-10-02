import { UmbPathPattern as s } from "@umbraco-cms/backoffice/router";
import { UMB_WORKSPACE_PATH_PATTERN as m, UMB_WORKSPACE_CONDITION_ALIAS as E, UMB_WORKSPACE_ENTITY_IS_NEW_CONDITION_ALIAS as T, UmbSubmitWorkspaceAction as A } from "@umbraco-cms/backoffice/workspace";
import { UmbItemStoreBase as S } from "@umbraco-cms/backoffice/store";
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
    element: () => import("./rule-settings-modal.element-CQ8H0Moq.js")
  }
], t = "mc-root", a = "mc-ruleset", q = "00000000-0000-0000-0000-000000000000", c = "settings", i = "Umbricians.MediaCurator.Menu", u = "Umbricians.MediaCurator.MenuItem.Rulesets", p = "Umbricians.MediaCurator.Tree.Rulesets", r = "Umbricians.MediaCurator.Repository.Ruleset.Tree", l = "Umbricians.MediaCurator.Repository.Ruleset.Detail", I = "Umbricians.MediaCurator.Store.Ruleset.Detail", d = "Umbricians.MediaCurator.Repository.Ruleset.Item", k = "Umbricians.MediaCurator.Store.Ruleset.Item", C = "Umbricians.MediaCurator.Workspace.Root", y = "Umbricians.MediaCurator.Workspace.Ruleset", H = m.generateAbsolute({
  sectionName: c,
  entityType: t
}), M = m.generateAbsolute({
  sectionName: c,
  entityType: a
}), F = new s("create/parent/:parentEntityType/:parentUnique", M);
new s(
  "edit/:unique",
  M
);
const g = [
  {
    type: "repository",
    alias: r,
    name: "Media Curator Ruleset Tree Repository",
    api: () => import("./ruleset-tree.repository-Djp7eMNa.js")
  },
  {
    type: "tree",
    kind: "default",
    alias: p,
    name: "Media Curator Ruleset Tree",
    meta: { repositoryAlias: r }
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
class h extends S {
  constructor(R) {
    super(R, f.toString());
  }
}
const O = [
  {
    type: "repository",
    alias: d,
    name: "Media Curator Ruleset Item Repository",
    api: () => import("./ruleset-item.repository-GgpVrPrf.js")
  },
  {
    type: "itemStore",
    alias: k,
    name: "Media Curator Ruleset Item Store",
    api: h
  }
], P = [
  {
    type: "entityAction",
    kind: "default",
    alias: "Umbricians.MediaCurator.EntityAction.Ruleset.Create",
    name: "Create Media Curator Ruleset Entity Action",
    weight: 1200,
    api: () => import("./create-ruleset.action-BGEYTTfu.js"),
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
      detailRepositoryAlias: l
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
    alias: u,
    name: "Media Curator Menu Item",
    weight: 100,
    meta: {
      label: "Media Curator",
      icon: "icon-mindmap",
      entityType: t,
      treeAlias: p,
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
    element: () => import("./setup-view.element-Buk1s2zD.js"),
    weight: 300,
    meta: { label: "Setup", pathname: "setup", icon: "icon-settings" },
    conditions: o
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Root.Reanalyze",
    name: "Media Curator Re-analyze Image View",
    element: () => import("./reanalyze-view.element-CUCZXeJG.js"),
    weight: 200,
    meta: { label: "Re-analyze image", pathname: "reanalyze", icon: "icon-wand" },
    conditions: o
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Root.Activity",
    name: "Media Curator Activity Log View",
    element: () => import("./activity-view.element-CUfm_IWE.js"),
    weight: 100,
    meta: { label: "Activity log", pathname: "activity", icon: "icon-history" },
    conditions: o
  }
], V = [
  ...L,
  ...g,
  ...O,
  ...P,
  ...W
], z = [
  {
    type: "repository",
    alias: l,
    name: "Media Curator Ruleset Detail Repository",
    api: () => import("./ruleset-detail.repository-BwGgWBZp.js")
  },
  {
    type: "store",
    alias: I,
    name: "Media Curator Ruleset Detail Store",
    api: () => import("./ruleset-detail.store-CPa94nJU.js")
  }
], e = { alias: E, match: y }, n = { alias: T, match: !1 }, N = [
  {
    type: "workspace",
    kind: "routable",
    alias: y,
    name: "Media Curator Ruleset Workspace",
    api: () => import("./ruleset-workspace.context-BaiZTLFt.js"),
    meta: { entityType: a }
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Ruleset.Design",
    name: "Media Curator Ruleset Design View",
    element: () => import("./ruleset-design-view.element-DcmvFUzA.js"),
    weight: 300,
    meta: { label: "Design", pathname: "design", icon: "icon-mindmap" },
    conditions: [e]
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Ruleset.Settings",
    name: "Media Curator Ruleset Settings View",
    element: () => import("./ruleset-settings-view.element-BJAJ_oll.js"),
    weight: 200,
    meta: { label: "Settings", pathname: "settings", icon: "icon-settings" },
    conditions: [e]
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Ruleset.Requirements",
    name: "Media Curator Ruleset Requirements View",
    element: () => import("./ruleset-requirements-view.element-ZrUgaGRC.js"),
    weight: 150,
    meta: { label: "Requirements", pathname: "requirements", icon: "icon-checkbox" },
    conditions: [e, n]
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Ruleset.Curate",
    name: "Media Curator Ruleset Curate View",
    element: () => import("./ruleset-curate-view.element-BnYQOghW.js"),
    weight: 100,
    meta: { label: "Curate", pathname: "curate", icon: "icon-play" },
    conditions: [e, n]
  },
  {
    type: "workspaceAction",
    kind: "default",
    alias: "Umbricians.MediaCurator.WorkspaceAction.Ruleset.Save",
    name: "Save Media Curator Ruleset",
    api: A,
    weight: 90,
    meta: { label: "Save", look: "primary", color: "positive" },
    conditions: [e]
  },
  {
    type: "workspaceContext",
    kind: "menuStructure",
    alias: "Umbricians.MediaCurator.Context.Ruleset.Menu.Structure",
    name: "Media Curator Ruleset Menu Structure Context",
    api: () => import("./ruleset-menu-structure.context-Bqacwa3V.js"),
    meta: { menuItemAlias: u },
    conditions: [e]
  },
  {
    type: "workspaceFooterApp",
    kind: "menuBreadcrumb",
    alias: "Umbricians.MediaCurator.WorkspaceFooterApp.Ruleset.Breadcrumb",
    name: "Media Curator Ruleset Breadcrumb",
    conditions: [e]
  }
], D = [...z, ...N], $ = [
  {
    type: "entityAction",
    kind: "default",
    alias: "Umbricians.MediaCurator.EntityAction.Media.Curate",
    name: "Curate Images Entity Action",
    weight: 50,
    api: () => import("./curate-media.action-MFOnNqtY.js"),
    forEntityTypes: ["media"],
    meta: { icon: "icon-wand", label: "Curate images" },
    // The Media Curator API requires Settings section access.
    conditions: [{ alias: "Umb.Condition.SectionUserPermission", match: "Umb.Section.Settings" }]
  },
  {
    type: "entityAction",
    kind: "default",
    alias: "Umbricians.MediaCurator.EntityAction.Media.Reanalyze",
    name: "Re-analyze Images Entity Action",
    weight: 40,
    api: () => import("./reanalyze-media.action-CgHyIjx0.js"),
    forEntityTypes: ["media"],
    meta: { icon: "icon-refresh", label: "Re-analyze images" },
    conditions: [{ alias: "Umb.Condition.SectionUserPermission", match: "Umb.Section.Settings" }]
  }
], j = [
  ...b,
  ...U,
  ...w,
  ...V,
  ...D,
  ...$
];
export {
  a as M,
  t as a,
  f as b,
  F as c,
  q as d,
  H as e,
  l as f,
  y as g,
  r as h,
  j as m
};
//# sourceMappingURL=bundle.manifests-Cq2ORKtu.js.map
