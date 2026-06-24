export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "MediaCurator Pizza Original Test Target Repository",
    alias: "Uai.Repository.TestFeatureEntity.media-curator-pizza-original",
    type: "repository",
    api: () => import("./pizza-test-target.repository.js"),
    meta: {
      feature: "media-curator-pizza-original",
    },
  } as unknown as UmbExtensionManifest,
  {
    name: "MediaCurator Pizza Prepared Test Target Repository",
    alias: "Uai.Repository.TestFeatureEntity.media-curator-pizza-prepared",
    type: "repository",
    api: () => import("./pizza-test-target.repository.js"),
    meta: {
      feature: "media-curator-pizza-prepared",
    },
  } as unknown as UmbExtensionManifest,
];
