export const manifests: Array<UmbExtensionManifest> = [
  {
    type: "localization",
    alias: "Umbricians.MediaCurator.Localization.En",
    name: "Media Curator English",
    weight: 100,
    meta: {
      culture: "en",
    },
    js: () => import("./en.js"),
  },
];
