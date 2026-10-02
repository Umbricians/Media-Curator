import { UmbTreeRepositoryBase } from "@umbraco-cms/backoffice/tree";
import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { MC_ROOT_ENTITY_TYPE } from "../entity.js";
import { McRulesetTreeServerDataSource } from "./ruleset-tree.server.data-source.js";
import type { McRulesetTreeItemModel } from "./ruleset-tree.mapper.js";

type McRootModel = {
  unique: null;
  entityType: typeof MC_ROOT_ENTITY_TYPE;
  name: string;
  icon: string;
  hasChildren: boolean;
  isFolder: boolean;
};

export class McRulesetTreeRepository extends UmbTreeRepositoryBase<McRulesetTreeItemModel, McRootModel> {
  constructor(host: UmbControllerHost) {
    super(host, McRulesetTreeServerDataSource);
  }

  async requestTreeRoot() {
    const data: McRootModel = {
      unique: null,
      entityType: MC_ROOT_ENTITY_TYPE,
      name: "Media Curator",
      icon: "icon-mindmap",
      hasChildren: true,
      isFolder: true,
    };
    return { data };
  }
}

export { McRulesetTreeRepository as api };
