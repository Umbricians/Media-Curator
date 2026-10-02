import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbDetailStoreBase } from "@umbraco-cms/backoffice/store";
import type { McRulesetDetailModel } from "../../types.js";

export const MC_RULESET_DETAIL_STORE_CONTEXT = new UmbContextToken<McRulesetDetailStore>("McRulesetDetailStore");

export class McRulesetDetailStore extends UmbDetailStoreBase<McRulesetDetailModel> {
  constructor(host: UmbControllerHost) {
    super(host, MC_RULESET_DETAIL_STORE_CONTEXT.toString());
  }
}

export { McRulesetDetailStore as api };
