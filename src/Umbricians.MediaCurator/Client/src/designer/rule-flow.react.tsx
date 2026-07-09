import { useEffect, useMemo } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Node,
} from "@xyflow/react";
import type { ProviderModel, RuleNodeModel } from "../api/index.js";
import { ruleFlowEdgeTypes } from "./rule-flow.edges.js";
import { isValidTreeConnection, rulesToFlow, type RuleFlowNodeData } from "./rule-flow.mapping.js";
import { newRule, ruleFlowNodeTypes } from "./rule-flow.nodes.js";

export type RuleFlowCanvasProps = {
  rules: RuleNodeModel[];
  providers: ProviderModel[];
  scopeName: string;
  onRulesChange: (rules: RuleNodeModel[]) => void;
};

function FitViewOnRulesChange({ rules }: { rules: RuleNodeModel[] }) {
  const { fitView } = useReactFlow();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      void fitView({ padding: 0.12, duration: 150, minZoom: 0.75, maxZoom: 1 });
    });
    return () => cancelAnimationFrame(frame);
  }, [rules, fitView]);

  return null;
}

function RuleFlowCanvasInner({ rules, providers, scopeName, onRulesChange }: RuleFlowCanvasProps) {
  const { nodes: layoutNodes, edges: layoutEdges } = useMemo(
    () => rulesToFlow(rules, providers, scopeName),
    [rules, providers, scopeName],
  );

  const nodes = useMemo(
    () =>
      layoutNodes.map(
        (node) =>
          ({
            ...node,
            data: {
              ...node.data,
              rules,
              onRulesChange,
            },
          }) satisfies Node<RuleFlowNodeData & { rules: RuleNodeModel[]; onRulesChange: (rules: RuleNodeModel[]) => void }>,
      ),
    [layoutNodes, rules, onRulesChange],
  );

  const edges = useMemo(
    () =>
      layoutEdges.map((edge) => ({
        ...edge,
        type: edge.label ? "conditional" : undefined,
      })),
    [layoutEdges],
  );

  const addRoot = () => {
    const rule = newRule(providers);
    if (rule) onRulesChange([...rules, rule]);
  };

  return (
    <div className="mc-rule-flow-canvas" data-mark="mc:canvas">
      <div className="mc-rule-flow-viewport">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={ruleFlowNodeTypes}
          edgeTypes={ruleFlowEdgeTypes}
          defaultViewport={{ x: 24, y: 24, zoom: 1 }}
          isValidConnection={(connection) =>
            isValidTreeConnection(connection.source ?? "", connection.target ?? "")
          }
          nodesConnectable={false}
          nodesDraggable={false}
          elementsSelectable={false}
          nodeOrigin={[0, 0]}
          minZoom={0.75}
          maxZoom={1.25}
          proOptions={{ hideAttribution: true }}
        >
          <FitViewOnRulesChange rules={rules} />
          <Controls position="bottom-right" showInteractive={false} />
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        </ReactFlow>
      </div>
      {rules.length === 0 ? (
        <p className="mc-rule-flow-empty">No rules yet. Each rule node contributes folder levels beneath the scope.</p>
      ) : null}
      <div className="mc-rule-flow-toolbar">
        <button type="button" data-mark="mc:canvas-add" onClick={addRoot}>
          Add rule
        </button>
      </div>
    </div>
  );
}

export function RuleFlowCanvas(props: RuleFlowCanvasProps) {
  return (
    <ReactFlowProvider>
      <RuleFlowCanvasInner {...props} />
    </ReactFlowProvider>
  );
}
