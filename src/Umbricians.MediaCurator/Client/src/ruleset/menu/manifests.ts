import { MC_MENU_ALIAS, MC_MENU_ITEM_ALIAS, MC_TREE_ALIAS, MC_ROOT_ENTITY_TYPE } from "../constants.js";

// Core Settings sidebar groups: Advanced = 100, Structure = 300 (higher weight is listed first).
// 50 places Media Curator below Advanced.
export const manifests: Array<UmbExtensionManifest> = [
  {
    type: "menu",
    alias: MC_MENU_ALIAS,
    name: "Media Curator Menu",
  },
  {
    type: "sectionSidebarApp",
    kind: "menu",
    alias: "Umbricians.MediaCurator.SectionSidebarMenu",
    name: "Media Curator Sidebar Menu",
    weight: 50,
    meta: { label: "Media Curator", menu: MC_MENU_ALIAS },
    conditions: [{ alias: "Umb.Condition.SectionAlias", match: "Umb.Section.Settings" }],
  },
  {
    type: "menuItem",
    kind: "tree",
    alias: MC_MENU_ITEM_ALIAS,
    name: "Media Curator Menu Item",
    weight: 100,
    meta: {
      label: "Media Curator",
      icon: "icon-mindmap",
      entityType: MC_ROOT_ENTITY_TYPE,
      treeAlias: MC_TREE_ALIAS,
      menus: [MC_MENU_ALIAS],
    },
  },
];
