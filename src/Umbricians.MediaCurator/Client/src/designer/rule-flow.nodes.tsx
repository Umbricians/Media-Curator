import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { ProviderModel, RuleNodeModel, SettingFieldModel } from "../api/index.js";
import {
  addChildAt,
  defaultSettings,
  moveSibling,
  removeAt,
  sampleSegment,
  updateAt,
} from "./rule-tree.logic.js";
import type { RuleFlowNodeData } from "./rule-flow.mapping.js";

export type RuleFlowCallbacks = {
  rules: RuleNodeModel[];
  onRulesChange: (rules: RuleNodeModel[]) => void;
};

type ScopeNodeProps = NodeProps & {
  data: RuleFlowNodeData;
};

type RuleNodeProps = NodeProps & {
  data: RuleFlowNodeData;
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

function SettingField({
  field,
  value,
  onChange,
}: {
  field: SettingFieldModel;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const current = value ?? field.defaultValue ?? "";
  let control: React.ReactNode;

  switch (field.type) {
    case "select":
      control = (
        <select
          data-mark={`mc:setting-${field.alias}`}
          aria-label={field.label}
          value={String(current)}
          onChange={(e) => onChange(e.target.value)}
        >
          {(field.options ?? []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
      break;
    case "toggle":
      control = (
        <input
          data-mark={`mc:setting-${field.alias}`}
          type="checkbox"
          aria-label={field.label}
          checked={current === true || current === "true"}
          onChange={(e) => onChange(e.target.checked)}
        />
      );
      break;
    case "number":
      control = (
        <input
          data-mark={`mc:setting-${field.alias}`}
          type="number"
          aria-label={field.label}
          value={String(current)}
          onChange={(e) => onChange(e.target.value)}
        />
      );
      break;
    default: {
      const multiline = field.alias === "mappings" || field.alias === "palette";
      control = multiline ? (
        <textarea
          data-mark={`mc:setting-${field.alias}`}
          aria-label={field.label}
          value={String(current)}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          data-mark={`mc:setting-${field.alias}`}
          aria-label={field.label}
          value={String(current)}
          onChange={(e) => onChange(e.target.value)}
        />
      );
      break;
    }
  }

  return (
    <>
      <label title={field.description ?? ""}>{field.label}</label>
      {control}
    </>
  );
}

export const ScopeFlowNode = memo(function ScopeFlowNode({ data }: ScopeNodeProps) {
  return (
    <div className="mc-rule-flow-scope" data-mark="mc:canvas-scope">
      <Handle type="source" position={Position.Bottom} />
      <strong>{data.scopeName}</strong>
      <small>scope</small>
    </div>
  );
});

export const RuleFlowNode = memo(function RuleFlowNode({ data, id }: RuleNodeProps) {
  const callbacks = (data as RuleFlowNodeData & RuleFlowCallbacks);
  const { rules, onRulesChange, providers, scopeName, path = [], prefix = [], isChild, isLeaf, node } = callbacks;

  if (!node) return null;

  const provider = providerFor(providers, node.providerAlias);
  const hasRequirements = (provider?.requirements ?? []).length > 0;

  const emit = (next: RuleNodeModel[]) => onRulesChange(next);

  const updateNode = (update: (current: RuleNodeModel) => RuleNodeModel) => {
    emit(updateAt(rules, path, update));
  };

  const examplePath = [scopeName, ...prefix, sampleSegment(node, providers)].join("/");

  return (
    <div className="mc-rule-flow-node" data-mark="mc:node" data-node-id={id}>
      <Handle type="target" position={Position.Top} />
      <div className="mc-rule-flow-node-header">
        <select
          data-mark="mc:node-provider"
          aria-label="Provider"
          value={node.providerAlias}
          onChange={(e) => {
            const alias = e.target.value;
            const nextProvider = providerFor(providers, alias);
            updateNode((current) => ({
              ...current,
              providerAlias: alias,
              settings: nextProvider ? defaultSettings(nextProvider) : {},
            }));
          }}
        >
          {providers.map((item) => (
            <option key={item.alias} value={item.alias}>
              {item.name}
            </option>
          ))}
        </select>
        {hasRequirements ? (
          <span className="mc-rule-flow-tag" data-mark="mc:node-requirements" title="This provider declares media type property requirements.">
            needs properties
          </span>
        ) : null}
      </div>

      <div className="mc-rule-flow-node-actions">
        <button type="button" title="Move up" onClick={() => emit(moveSibling(rules, path, -1))}>
          ↑
        </button>
        <button type="button" title="Move down" onClick={() => emit(moveSibling(rules, path, 1))}>
          ↓
        </button>
        <button type="button" className="danger" title="Remove" onClick={() => emit(removeAt(rules, path))}>
          ✕
        </button>
      </div>

      <div className="mc-rule-flow-node-body">
        {isChild ? (
          <>
            <label htmlFor={`${id}-condition`}>Condition (parent value)</label>
            <input
              id={`${id}-condition`}
              data-mark="mc:node-condition"
              aria-label="Condition"
              placeholder="leave empty for always"
              value={node.condition ?? ""}
              onChange={(e) =>
                updateNode((current) => ({
                  ...current,
                  condition: e.target.value || undefined,
                }))
              }
            />
          </>
        ) : null}

        {(provider?.settingsFields ?? []).map((field) => {
          const settings = (node.settings ?? {}) as Record<string, unknown>;
          return (
            <SettingField
              key={field.alias}
              field={field}
              value={settings[field.alias]}
              onChange={(value) =>
                updateNode((current) => ({
                  ...current,
                  settings: {
                    ...(current.settings ?? {}),
                    [field.alias]: value,
                  } as NonNullable<RuleNodeModel["settings"]>,
                }))
              }
            />
          );
        })}

        <label htmlFor={`${id}-fallback`}>If unresolved</label>
        <select
          id={`${id}-fallback`}
          data-mark="mc:node-fallback"
          aria-label="If unresolved"
          value={node.fallback}
          onChange={(e) => updateNode((current) => ({ ...current, fallback: e.target.value }))}
        >
          <option value="skip">Skip this level</option>
          <option value="unsorted">Use &apos;Unsorted&apos; folder</option>
          <option value="stop">Leave item in place</option>
        </select>
      </div>

      {isLeaf ? (
        <div className="mc-rule-flow-example" data-mark="mc:node-example" title="Example resulting folder path">
          {examplePath}
        </div>
      ) : null}

      <div className="mc-rule-flow-add-child">
        <button
          type="button"
          data-mark="mc:node-add-child"
          onClick={() => {
            const child = newRule(providers);
            if (child) emit(addChildAt(rules, path, child));
          }}
        >
          Add child rule
        </button>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

export const ruleFlowNodeTypes = {
  scope: ScopeFlowNode,
  rule: RuleFlowNode,
};
