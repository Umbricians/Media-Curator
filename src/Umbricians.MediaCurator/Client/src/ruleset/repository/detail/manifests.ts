import { MC_RULESET_DETAIL_REPOSITORY_ALIAS, MC_RULESET_DETAIL_STORE_ALIAS } from "../../constants.js";

export const manifests: Array<UmbExtensionManifest> = [
  {
    type: "repository",
    alias: MC_RULESET_DETAIL_REPOSITORY_ALIAS,
    name: "Media Curator Ruleset Detail Repository",
    api: () => import("./ruleset-detail.repository.js"),
  },
  {
    type: "store",
    alias: MC_RULESET_DETAIL_STORE_ALIAS,
    name: "Media Curator Ruleset Detail Store",
    api: () => import("./ruleset-detail.store.js"),
  },
];
