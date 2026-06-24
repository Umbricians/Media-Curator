export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "Media Curator Entrypoint",
    alias: "Umbricians.MediaCurator.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint.js"),
  },
];
