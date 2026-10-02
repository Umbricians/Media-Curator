import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbDetailRepositoryBase } from "@umbraco-cms/backoffice/repository";
import type { McRulesetDetailModel } from "../../types.js";
import { McRulesetDetailServerDataSource } from "./ruleset-detail.server.data-source.js";
import { MC_RULESET_DETAIL_STORE_CONTEXT } from "./ruleset-detail.store.js";

export class McRulesetDetailRepository extends UmbDetailRepositoryBase<McRulesetDetailModel> {
  constructor(host: UmbControllerHost) {
    super(host, McRulesetDetailServerDataSource, MC_RULESET_DETAIL_STORE_CONTEXT);
  }
}

export { McRulesetDetailRepository as api };
