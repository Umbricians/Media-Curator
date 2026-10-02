import { UmbItemStoreBase } from "@umbraco-cms/backoffice/store";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import type { McRulesetItemModel } from "../../types.js";

export const MC_RULESET_ITEM_STORE_CONTEXT = new UmbContextToken<McRulesetItemStore>("McRulesetItemStore");

export class McRulesetItemStore extends UmbItemStoreBase<McRulesetItemModel> {
  constructor(host: UmbControllerHost) {
    super(host, MC_RULESET_ITEM_STORE_CONTEXT.toString());
  }
}

export { McRulesetItemStore as api };
