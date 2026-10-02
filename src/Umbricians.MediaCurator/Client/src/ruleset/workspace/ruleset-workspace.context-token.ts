import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import type { UmbSubmittableWorkspaceContext } from "@umbraco-cms/backoffice/workspace";
import { MC_RULESET_ENTITY_TYPE } from "../entity.js";
import type { McRulesetWorkspaceContext } from "./ruleset-workspace.context.js";

export const MC_RULESET_WORKSPACE_CONTEXT = new UmbContextToken<UmbSubmittableWorkspaceContext, McRulesetWorkspaceContext>(
  "UmbWorkspaceContext",
  undefined,
  (context): context is McRulesetWorkspaceContext => context.getEntityType?.() === MC_RULESET_ENTITY_TYPE,
);
