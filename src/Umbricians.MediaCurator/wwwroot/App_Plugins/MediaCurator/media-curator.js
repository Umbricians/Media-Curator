const a = [
  {
    name: "Media Curator Entrypoint",
    alias: "Umbricians.MediaCurator.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-BXDH0O8K.js")
  }
], i = [
  {
    name: "Media Curator Dashboard",
    alias: "Umbricians.MediaCurator.Dashboard",
    type: "dashboard",
    js: () => import("./mediacurator-dashboard.element-CWgddJ-1.js"),
    weight: -10,
    meta: {
      label: "Media Curator",
      pathname: "media-curator"
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Media"
      }
    ]
  }
], t = [
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
], e = [
  ...a,
  ...i,
  ...t
];
export {
  e as manifests
};
//# sourceMappingURL=media-curator.js.map
