import { MC_RULESET_ITEM_REPOSITORY_ALIAS, MC_RULESET_ITEM_STORE_ALIAS } from "../../constants.js";
import { McRulesetItemStore } from "./ruleset-item.store.js";

export const manifests: Array<UmbExtensionManifest> = [
  {
    type: "repository",
    alias: MC_RULESET_ITEM_REPOSITORY_ALIAS,
    name: "Media Curator Ruleset Item Repository",
    api: () => import("./ruleset-item.repository.js"),
  },
  {
    type: "itemStore",
    alias: MC_RULESET_ITEM_STORE_ALIAS,
    name: "Media Curator Ruleset Item Store",
    api: McRulesetItemStore,
  },
];
