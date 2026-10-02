import { MC_ROOT_ENTITY_TYPE, MC_ROOT_WORKSPACE_ALIAS } from "../ruleset/constants.js";

const workspaceCondition = [{ alias: "Umb.Condition.WorkspaceAlias", match: MC_ROOT_WORKSPACE_ALIAS }];

export const manifests: Array<UmbExtensionManifest> = [
  {
    type: "workspace",
    kind: "default",
    alias: MC_ROOT_WORKSPACE_ALIAS,
    name: "Media Curator Root Workspace",
    meta: { entityType: MC_ROOT_ENTITY_TYPE, headline: "Media Curator" },
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Root.Setup",
    name: "Media Curator Setup View",
    element: () => import("./setup-view.element.js"),
    weight: 300,
    meta: { label: "Setup", pathname: "setup", icon: "icon-settings" },
    conditions: workspaceCondition,
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Root.Reanalyze",
    name: "Media Curator Re-analyze Image View",
    element: () => import("./reanalyze-view.element.js"),
    weight: 200,
    meta: { label: "Re-analyze image", pathname: "reanalyze", icon: "icon-wand" },
    conditions: workspaceCondition,
  },
  {
    type: "workspaceView",
    alias: "Umbricians.MediaCurator.WorkspaceView.Root.Activity",
    name: "Media Curator Activity Log View",
    element: () => import("./activity-view.element.js"),
    weight: 100,
    meta: { label: "Activity log", pathname: "activity", icon: "icon-history" },
    conditions: workspaceCondition,
  },
];
