import { UmbItemRepositoryBase } from "@umbraco-cms/backoffice/repository";
import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import type { McRulesetItemModel } from "../../types.js";
import { McRulesetItemDataSource } from "./ruleset-item.data-source.js";
import { MC_RULESET_ITEM_STORE_CONTEXT } from "./ruleset-item.store.js";

export class McRulesetItemRepository extends UmbItemRepositoryBase<McRulesetItemModel> {
  constructor(host: UmbControllerHost) {
    super(host, McRulesetItemDataSource, MC_RULESET_ITEM_STORE_CONTEXT);
  }
}

export { McRulesetItemRepository as api };
