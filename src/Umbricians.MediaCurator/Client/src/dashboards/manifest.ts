export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Media Curator Dashboard",
    alias: "Umbricians.MediaCurator.Dashboard",
    type: "dashboard",
    js: () => import("./mediacurator-dashboard.element.js"),
    weight: -10,
    meta: {
      label: "Media Curator",
      pathname: "media-curator",
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Media",
      },
    ],
  },
];
