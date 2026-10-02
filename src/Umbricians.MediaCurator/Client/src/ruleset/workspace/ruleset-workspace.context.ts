import type { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbArrayState } from "@umbraco-cms/backoffice/observable-api";
import { tryExecute } from "@umbraco-cms/backoffice/resources";
import {
  UmbEntityNamedDetailWorkspaceContextBase,
  UmbWorkspaceIsNewRedirectController,
  type UmbRoutableWorkspaceContext,
  type UmbSubmittableWorkspaceContext,
} from "@umbraco-cms/backoffice/workspace";
import { MediaCuratorService, type ProviderModel } from "../../api/index.js";
import {
  MC_RULESET_DETAIL_REPOSITORY_ALIAS,
  MC_RULESET_ENTITY_TYPE,
  MC_RULESET_WORKSPACE_ALIAS,
} from "../constants.js";
import type { McRulesetDetailModel } from "../types.js";
import { McRulesetWorkspaceEditorElement } from "./ruleset-workspace-editor.element.js";

export class McRulesetWorkspaceContext
  extends UmbEntityNamedDetailWorkspaceContextBase<McRulesetDetailModel>
  implements UmbSubmittableWorkspaceContext, UmbRoutableWorkspaceContext
{
  readonly rules = this._data.createObservablePartOfCurrent((data) => data?.rules ?? []);
  readonly scopeRootKey = this._data.createObservablePartOfCurrent((data) => data?.scopeRootKey);
  readonly enabled = this._data.createObservablePartOfCurrent((data) => data?.enabled ?? true);

  /** Rule providers registered on the server, used by the designer and settings sidebar. */
  #providers = new UmbArrayState<ProviderModel>([], (provider) => provider.alias);
  readonly providers = this.#providers.asObservable();

  constructor(host: UmbControllerHost) {
    super(host, {
      workspaceAlias: MC_RULESET_WORKSPACE_ALIAS,
      entityType: MC_RULESET_ENTITY_TYPE,
      detailRepositoryAlias: MC_RULESET_DETAIL_REPOSITORY_ALIAS,
    });

    this.routes.setRoutes([
      {
        path: "create/parent/:parentEntityType/:parentUnique",
        component: McRulesetWorkspaceEditorElement,
        setup: async (_component, info) => {
          const parentEntityType = info.match.params.parentEntityType;
          const parentUnique = info.match.params.parentUnique === "null" ? null : info.match.params.parentUnique;
          await this.createScaffold({ parent: { entityType: parentEntityType, unique: parentUnique } });
          new UmbWorkspaceIsNewRedirectController(
            this,
            this,
            this.getHostElement().shadowRoot!.querySelector("umb-router-slot")!,
          );
        },
      },
      {
        path: "edit/:unique",
        component: McRulesetWorkspaceEditorElement,
        setup: (_component, info) => {
          this.load(info.match.params.unique);
        },
      },
    ]);

    void this.#loadProviders();
  }

  async #loadProviders() {
    const { data } = await tryExecute(this, MediaCuratorService.getProviders());
    if (data) this.#providers.setValue(data);
  }

  updateProperty<K extends keyof McRulesetDetailModel>(key: K, value: McRulesetDetailModel[K]) {
    this._data.updateCurrent({ [key]: value } as Partial<McRulesetDetailModel>);
  }
}

export { McRulesetWorkspaceContext as api };
