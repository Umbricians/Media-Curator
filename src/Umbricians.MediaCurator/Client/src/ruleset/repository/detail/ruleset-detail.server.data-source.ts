import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import type { UmbDetailDataSource } from "@umbraco-cms/backoffice/repository";
import { tryExecute } from "@umbraco-cms/backoffice/resources";
import { UmbId } from "@umbraco-cms/backoffice/id";
import { MediaCuratorService } from "../../../api/index.js";
import { scaffoldRuleset, toDetailModel, toRulesetModel } from "../../ruleset.mapper.js";
import type { McRulesetDetailModel } from "../../types.js";

/** Reads and writes rulesets through the Media Curator management API. */
export class McRulesetDetailServerDataSource implements UmbDetailDataSource<McRulesetDetailModel> {
  #host: UmbControllerHost;

  constructor(host: UmbControllerHost) {
    this.#host = host;
  }

  async createScaffold(preset: Partial<McRulesetDetailModel> = {}) {
    return { data: scaffoldRuleset(UmbId.new(), preset) };
  }

  async read(unique: string) {
    if (!unique) throw new Error("Unique is missing");
    const { data, error } = await tryExecute(this.#host, MediaCuratorService.getRuleset({ path: { key: unique } }));
    if (error || !data) return { error };
    return { data: toDetailModel(data) };
  }

  async create(model: McRulesetDetailModel) {
    return this.#save(model);
  }

  async update(model: McRulesetDetailModel) {
    return this.#save(model);
  }

  async delete(unique: string) {
    if (!unique) throw new Error("Unique is missing");
    return tryExecute(this.#host, MediaCuratorService.deleteRuleset({ path: { key: unique } }));
  }

  // The API saves with PUT for both create and update; the key comes from the model.
  async #save(model: McRulesetDetailModel) {
    const { data, error } = await tryExecute(this.#host, MediaCuratorService.saveRuleset({ body: toRulesetModel(model) }));
    if (error || !data) return { error };
    return { data: toDetailModel(data) };
  }
}
