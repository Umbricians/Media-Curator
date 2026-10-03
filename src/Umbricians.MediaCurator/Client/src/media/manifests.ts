export const manifests: Array<UmbExtensionManifest> = [
  {
    type: "entityAction",
    kind: "default",
    alias: "Umbricians.MediaCurator.EntityAction.Media.Curate",
    name: "Curate Images Entity Action",
    weight: 50,
    api: () => import("./curate-media.action.js"),
    forEntityTypes: ["media"],
    meta: { icon: "icon-wand", label: "Curate images" },
    // The Media Curator API requires Settings section access.
    conditions: [{ alias: "Umb.Condition.SectionUserPermission", match: "Umb.Section.Settings" }],
  },
  {
    type: "entityAction",
    kind: "default",
    alias: "Umbricians.MediaCurator.EntityAction.Media.Analyze",
    name: "Analyze Images Entity Action",
    weight: 40,
    api: () => import("./analyze-media.action.js"),
    forEntityTypes: ["media"],
    meta: { icon: "icon-refresh", label: "Analyze images" },
    conditions: [{ alias: "Umb.Condition.SectionUserPermission", match: "Umb.Section.Settings" }],
  },
];
