import { manifests as entrypoints } from "./entrypoints/manifest.js";
import { manifests as aiTestTargets } from "./ai-test-targets/manifest.js";
import { manifests as designer } from "./designer/manifest.js";
import { manifests as navigation } from "./navigation.manifests.js";
import { manifests as ruleset } from "./ruleset/manifests.js";
import { manifests as media } from "./media/manifests.js";
import { manifests as people } from "./people/manifests.js";
import { manifests as lang } from "./lang/manifests.js";

// Job of the bundle is to collate all the manifests from different parts of the extension and load other manifests
// We load this bundle from umbraco-package.json
export const manifests: Array<UmbExtensionManifest> = [
  ...entrypoints,
  ...aiTestTargets,
  ...designer,
  ...navigation,
  ...ruleset,
  ...media,
  ...people,
  ...lang,
];
