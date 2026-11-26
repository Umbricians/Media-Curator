export const manifests: Array<UmbExtensionManifest> = [
  {
    type: "localization",
    alias: "Umbricians.MediaCurator.Automate.Localization.En",
    name: "MediaCurator Automate English",
    weight: 100,
    meta: {
      culture: "en",
    },
    js: () => import("./en.js"),
  },
];
