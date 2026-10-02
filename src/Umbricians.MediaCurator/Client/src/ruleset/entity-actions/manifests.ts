import {
  MC_ROOT_ENTITY_TYPE,
  MC_RULESET_ENTITY_TYPE,
  MC_RULESET_DETAIL_REPOSITORY_ALIAS,
  MC_RULESET_ITEM_REPOSITORY_ALIAS,
} from "../constants.js";

export const manifests: Array<UmbExtensionManifest> = [
  {
    type: "entityAction",
    kind: "default",
    alias: "Umbricians.MediaCurator.EntityAction.Ruleset.Create",
    name: "Create Media Curator Ruleset Entity Action",
    weight: 1200,
    api: () => import("./create-ruleset.action.js"),
    forEntityTypes: [MC_ROOT_ENTITY_TYPE],
    meta: { icon: "icon-add", label: "Create ruleset" },
  },
  {
    type: "entityAction",
    kind: "delete",
    alias: "Umbricians.MediaCurator.EntityAction.Ruleset.Delete",
    name: "Delete Media Curator Ruleset Entity Action",
    forEntityTypes: [MC_RULESET_ENTITY_TYPE],
    meta: {
      itemRepositoryAlias: MC_RULESET_ITEM_REPOSITORY_ALIAS,
      detailRepositoryAlias: MC_RULESET_DETAIL_REPOSITORY_ALIAS,
    },
  },
];
