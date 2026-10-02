export const manifests: Array<UmbExtensionManifest> = [
  {
    type: "modal",
    alias: "Umbricians.MediaCurator.Modal.RuleSettings",
    name: "Media Curator Rule Settings Modal",
    element: () => import("./rule-settings-modal.element.js"),
  },
];
