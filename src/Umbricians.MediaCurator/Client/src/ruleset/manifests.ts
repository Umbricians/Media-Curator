import { manifests as detailRepository } from "./repository/detail/manifests.js";
import { manifests as workspace } from "./workspace/manifests.js";

export const manifests: Array<UmbExtensionManifest> = [...detailRepository, ...workspace];
