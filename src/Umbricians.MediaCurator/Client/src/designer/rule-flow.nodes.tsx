import { memo, type MouseEvent } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { ProviderModel, RuleNodeModel } from "../api/index.js";
import { defaultSettings } from "./rule-tree.logic.js";
import type { RuleFlowNodeData } from "./rule-flow.mapping.js";
import { ruleSummaryChips } from "./rule-flow.summary.js";

export type RulesChangeOptions = {
  /** Force auto-layout even when provider aliases at each path look unchanged. */
  relayout?: boolean;
};

export type RulesChangeHandler = (rules: RuleNodeModel[], options?: RulesChangeOptions) => void;

/** Block actions handled by the Lit host, which owns the settings panel and confirm dialog. */
export type RuleFlowActions = {
  onEditRule: (path: number[]) => void;
  onDeleteRule: (path: number[]) => void;
  /** `parentPath` null adds a root rule. */
  onAddRule: (parentPath: number[] | null) => void;
};

type FlowNodeProps = NodeProps & {
  data: RuleFlowNodeData & Partial<RuleFlowActions>;
};

function providerFor(providers: ProviderModel[], alias: string) {
  return providers.find((p) => p.alias === alias);
}

export function newRule(providers: ProviderModel[]): RuleNodeModel | undefined {
  const provider = providers[0];
  if (!provider) return undefined;
  return {
    providerAlias: provider.alias,
    settings: defaultSettings(provider),
    fallback: "skip",
    children: [],
  };
}

/** Run a block action without starting a drag or pan on the canvas. */
function blockAction(action: () => void) {
  return (event: MouseEvent) => {
    event.stopPropagation();
    action();
  };
}

function AddRuleButton({ title, onClick }: { title: string; onClick: () => void }) {
  return (
    <button
      type="button"
      className="mc-rule-flow-add nodrag nopan"
      data-mark="mc:node-add-child"
      title={title}
      aria-label={title}
      onClick={blockAction(onClick)}
    >
      <uui-icon name="icon-add"></uui-icon>
    </button>
  );
}

export const ScopeFlowNode = memo(function ScopeFlowNode({ data }: FlowNodeProps) {
  return (
    <div className="mc-rule-flow-block mc-rule-flow-block--scope" data-mark="mc:canvas-scope">
      <div className="mc-rule-flow-block__header">
        <span className="mc-rule-flow-block__icon">
          <uui-icon name="icon-folder"></uui-icon>
        </span>
        <div className="mc-rule-flow-block__title">
          <uui-tag className="mc-rule-flow-block__kind" look="secondary">
            Scope
          </uui-tag>
          <span className="mc-rule-flow-block__name">{data.scopeName}</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
      {data.onAddRule ? <AddRuleButton title="Add rule" onClick={() => data.onAddRule?.(null)} /> : null}
    </div>
  );
});

export const RuleFlowNode = memo(function RuleFlowNode({ data, id }: FlowNodeProps) {
  const { providers, path = [], node, onEditRule, onDeleteRule, onAddRule } = data;
  if (!node) return null;

  const provider = providerFor(providers, node.providerAlias);
  const chips = ruleSummaryChips(node, provider);
  const hasRequirements = (provider?.requirements ?? []).length > 0;
  const edit = () => onEditRule?.(path);

  return (
    <div
      className={`mc-rule-flow-block mc-rule-flow-block--rule${provider ? "" : " mc-rule-flow-block--unknown"}`}
      data-mark="mc:node"
      data-node-id={id}
      onDoubleClick={blockAction(edit)}
    >
      <Handle type="target" position={Position.Top} />
      <div className="mc-rule-flow-block__header">
        <span className="mc-rule-flow-block__icon">
          <uui-icon name={provider?.icon ?? "icon-alert"}></uui-icon>
        </span>
        <span className="mc-rule-flow-block__name" data-mark="mc:node-provider" title={provider?.name ?? node.providerAlias}>
          {provider?.name ?? "Unknown provider"}
        </span>
        <div className="mc-rule-flow-block__actions mc-rule-flow-action-bar nodrag nopan">
          <button type="button" className="mc-rule-flow-action-bar__btn" data-mark="mc:node-edit" title="Settings" aria-label="Settings" onClick={blockAction(edit)}>
            <uui-icon name="icon-edit"></uui-icon>
          </button>
          <button
            type="button"
            className="mc-rule-flow-action-bar__btn mc-rule-flow-action-bar__btn--danger"
            data-mark="mc:node-remove"
            title="Delete"
            aria-label="Delete"
            onClick={blockAction(() => onDeleteRule?.(path))}
          >
            <uui-icon name="icon-trash"></uui-icon>
          </button>
        </div>
      </div>
      {chips.length > 0 || hasRequirements || !provider ? (
        <div className="mc-rule-flow-block__body">
          {chips.map((chip) => (
            <code
              key={`${chip.kind ?? "setting"}:${chip.title}`}
              className={`mc-rule-flow-block__chip${chip.kind ? ` mc-rule-flow-block__chip--${chip.kind}` : ""}`}
              data-mark={chip.kind === "condition" ? "mc:node-condition" : "mc:node-summary"}
              title={chip.title}
            >
              {chip.text}
            </code>
          ))}
          {!provider ? (
            <span className="mc-rule-flow-block__tag" data-mark="mc:node-unknown-provider" title={`No provider is registered with the alias "${node.providerAlias}".`}>
              unknown provider
            </span>
          ) : null}
          {hasRequirements ? (
            <span className="mc-rule-flow-block__tag" data-mark="mc:node-requirements" title="This provider declares media type property requirements.">
              needs properties
            </span>
          ) : null}
        </div>
      ) : null}
      <Handle type="source" position={Position.Bottom} />
      {onAddRule ? <AddRuleButton title="Add child rule" onClick={() => onAddRule(path)} /> : null}
    </div>
  );
});

export const ruleFlowNodeTypes = {
  scope: ScopeFlowNode,
  rule: RuleFlowNode,
};
