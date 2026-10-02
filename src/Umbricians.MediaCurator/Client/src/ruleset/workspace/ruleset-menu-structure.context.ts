import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbMenuTreeStructureWorkspaceContextBase } from "@umbraco-cms/backoffice/menu";
import { MC_TREE_REPOSITORY_ALIAS } from "../constants.js";

/** Expands the sidebar tree to the open ruleset and feeds the footer breadcrumb. */
export class McRulesetMenuStructureContext extends UmbMenuTreeStructureWorkspaceContextBase {
  constructor(host: UmbControllerHost) {
    super(host, { treeRepositoryAlias: MC_TREE_REPOSITORY_ALIAS });
  }
}

export default McRulesetMenuStructureContext;
