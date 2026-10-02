import {
  UMB_WORKSPACE_CONDITION_ALIAS,
  UMB_WORKSPACE_ENTITY_IS_NEW_CONDITION_ALIAS,
  UmbSubmitWorkspaceAction,
} from "@umbraco-cms/backoffice/workspace";
import { MC_MENU_ITEM_ALIAS, MC_RULESET_ENTITY_TYPE, MC_RULESET_WORKSPACE_ALIAS } from "../constants.js";

const inRulesetWorkspace = { alias: UMB_WORKSPACE_CONDITION_ALIAS, match: MC_RULESET_WORKSPACE_ALIAS };
const notNew = { alias: UMB_WORKSPACE_ENTITY_IS_NEW_CONDITION_ALIAS, match: false };

export const manifests: Array<UmbExtensionManifest> = [
  {
    type: "workspace",
    kind: "routable",
    alias: MC_RULESET_WORKSPACE_ALIAS,
    name: "Media Curator Ruleset Workspace",
    api: () => import("./ruleset-workspace.context.js"),
    meta: { entityType: MC_RULESET_ENTITY_TYPE },
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Ruleset.Design",
    name: "Media Curator Ruleset Design View",
    element: () => import("./views/ruleset-design-view.element.js"),
    weight: 300,
    meta: { label: "Design", pathname: "design", icon: "icon-mindmap" },
    conditions: [inRulesetWorkspace],
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Ruleset.Settings",
    name: "Media Curator Ruleset Settings View",
    element: () => import("./views/ruleset-settings-view.element.js"),
    weight: 200,
    meta: { label: "Settings", pathname: "settings", icon: "icon-settings" },
    conditions: [inRulesetWorkspace],
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Ruleset.Requirements",
    name: "Media Curator Ruleset Requirements View",
    element: () => import("./views/ruleset-requirements-view.element.js"),
    weight: 150,
    meta: { label: "Requirements", pathname: "requirements", icon: "icon-checkbox" },
    conditions: [inRulesetWorkspace, notNew],
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Ruleset.Curate",
    name: "Media Curator Ruleset Curate View",
    element: () => import("./views/ruleset-curate-view.element.js"),
    weight: 100,
    meta: { label: "Curate", pathname: "curate", icon: "icon-play" },
    conditions: [inRulesetWorkspace, notNew],
  },
  {
    type: "workspaceAction",
    kind: "default",
    alias: "Umbricians.MediaCurator.WorkspaceAction.Ruleset.Save",
    name: "Save Media Curator Ruleset",
    api: UmbSubmitWorkspaceAction,
    weight: 90,
    meta: { label: "Save", look: "primary", color: "positive" },
    conditions: [inRulesetWorkspace],
  },
  {
    type: "workspaceContext",
    kind: "menuStructure",
    alias: "Umbricians.MediaCurator.Context.Ruleset.Menu.Structure",
    name: "Media Curator Ruleset Menu Structure Context",
    api: () => import("./ruleset-menu-structure.context.js"),
    meta: { menuItemAlias: MC_MENU_ITEM_ALIAS },
    conditions: [inRulesetWorkspace],
  },
  {
    type: "workspaceFooterApp",
    kind: "menuBreadcrumb",
    alias: "Umbricians.MediaCurator.WorkspaceFooterApp.Ruleset.Breadcrumb",
    name: "Media Curator Ruleset Breadcrumb",
    conditions: [inRulesetWorkspace],
  },
];
