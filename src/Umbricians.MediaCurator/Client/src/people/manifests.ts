import { CONTAINS_PEOPLE_BELOW_FLAG, CONTAINS_PEOPLE_FLAG } from "./constants.js";
import { DOT_ICON, PERSON_ICON } from "./icons.js";

// Signs on media tree items, from the server's people flags (PeopleFlagProvider). `forEntityTypes: ["media"]`
// covers folders too. The media grid and table views do not render entity signs, so only the tree shows them.
export const manifests: Array<UmbExtensionManifest> = [
  {
    type: "icons",
    alias: "Umbricians.MediaCurator.Icons.People",
    name: "Media Curator People Icons",
    js: () => import("./icons.js"),
  },
  {
    type: "entitySign",
    kind: "icon",
    alias: "Umbricians.MediaCurator.EntitySign.ContainsPeople",
    name: "Contains People Media Entity Sign",
    forEntityTypes: ["media"],
    forEntityFlags: [CONTAINS_PEOPLE_FLAG],
    weight: 900,
    meta: { iconName: PERSON_ICON, label: "#mediaCurator_containsPeople", iconColorAlias: "red" },
  },
  {
    type: "entitySign",
    kind: "icon",
    alias: "Umbricians.MediaCurator.EntitySign.ContainsPeopleBelow",
    name: "Contains People Below Media Entity Sign",
    forEntityTypes: ["media"],
    forEntityFlags: [CONTAINS_PEOPLE_BELOW_FLAG],
    weight: 890,
    meta: { iconName: DOT_ICON, label: "#mediaCurator_containsPeopleBelow", iconColorAlias: "red" },
  },
];
