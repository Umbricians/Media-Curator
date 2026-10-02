import { UmbModalToken } from "@umbraco-cms/backoffice/modal";
import type { ProviderModel, RuleNodeModel } from "../api/index.js";

export type McRuleSettingsModalData = {
  /** Current rule (children included; preserved untouched). */
  rule: RuleNodeModel;
  providers: ProviderModel[];
  /** Show the Condition field only when true. */
  isChild: boolean;
  /** Headline "Add rule" vs provider name. */
  isNew: boolean;
};

export type McRuleSettingsModalValue = { rule: RuleNodeModel };

export const MC_RULE_SETTINGS_MODAL = new UmbModalToken<McRuleSettingsModalData, McRuleSettingsModalValue>(
  "Umbricians.MediaCurator.Modal.RuleSettings",
  { modal: { type: "sidebar", size: "medium" } },
);
