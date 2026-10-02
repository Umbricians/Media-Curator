import { manifests as tree } from "./ruleset/tree/manifests.js";
import { manifests as itemRepository } from "./ruleset/repository/item/manifests.js";
import { manifests as entityActions } from "./ruleset/entity-actions/manifests.js";
import { manifests as menu } from "./ruleset/menu/manifests.js";
import { manifests as root } from "./root/manifests.js";

/** Settings-section navigation: sidebar menu, ruleset tree, entity actions and the root workspace. */
export const manifests: Array<UmbExtensionManifest> = [
  ...menu,
  ...tree,
  ...itemRepository,
  ...entityActions,
  ...root,
];
