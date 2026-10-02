import { UmbItemServerDataSourceBase } from "@umbraco-cms/backoffice/repository";
import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { MediaCuratorService, type RulesetModel } from "../../../api/index.js";
import { toItemModel } from "../../ruleset.mapper.js";
import type { McRulesetItemModel } from "../../types.js";

export class McRulesetItemDataSource extends UmbItemServerDataSourceBase<RulesetModel, McRulesetItemModel> {
  constructor(host: UmbControllerHost) {
    super(host, { mapper: toItemModel });
  }

  override async getItems(uniques: Array<string>) {
    if (!uniques) throw new Error("Uniques are missing");
    const { data, error } = await MediaCuratorService.getRulesets();
    const matching = data?.filter((r) => uniques.includes(r.key));
    return { data: this._getMappedItems(matching), error: error as never };
  }
}
