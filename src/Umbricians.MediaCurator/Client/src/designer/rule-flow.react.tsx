import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Node,
  type OnNodeDrag,
} from "@xyflow/react";
import type { ProviderModel, RuleNodeModel } from "../api/index.js";
import { ruleFlowEdgeTypes } from "./rule-flow.edges.js";
import {
  idToPath,
  isValidTreeConnection,
  resolveSiblingDropIndex,
  rulesToFlow,
  SCOPE_NODE_ID,
  type RuleFlowNodeData,
} from "./rule-flow.mapping.js";
import { newRule, ruleFlowNodeTypes, type RulesChangeHandler } from "./rule-flow.nodes.js";
import { reorderSibling } from "./rule-tree.logic.js";

export type RuleFlowCanvasProps = {
  rules: RuleNodeModel[];
  providers: ProviderModel[];
  scopeName: string;
  /** Incremented by the Lit host on structural edits (reorder/add/remove). */
  layoutGeneration?: number;
  onRulesChange: (rules: RuleNodeModel[], options?: { relayout?: boolean }) => void;
};

type FlowNode = Node<
  RuleFlowNodeData & {
    rules: RuleNodeModel[];
    onRulesChange: RulesChangeHandler;
  }
>;

function FitViewOnce() {
  const { fitView } = useReactFlow();
  const didFit = useRef(false);

  useEffect(() => {
    if (didFit.current) return;
    didFit.current = true;
    const frame = requestAnimationFrame(() => {
      void fitView({ padding: 0.2, duration: 150, minZoom: 0.85, maxZoom: 1 });
    });
    return () => cancelAnimationFrame(frame);
  }, [fitView]);

  return null;
}

function applyStoredPositions(
  layoutNodes: FlowNode[],
  stored: Map<string, { x: number; y: number }>,
  structureChanged: boolean,
): FlowNode[] {
  if (structureChanged) {
    stored.clear();
    for (const node of layoutNodes) {
      stored.set(node.id, node.position);
    }
    return layoutNodes;
  }

  return layoutNodes.map((node) => {
    const position = stored.get(node.id);
    return position ? { ...node, position } : node;
  });
}

function RuleFlowCanvasInner({
  rules,
  providers,
  scopeName,
  layoutGeneration = 0,
  onRulesChange,
}: RuleFlowCanvasProps) {
  const isDragging = useRef(false);
  const positionsRef = useRef(new Map<string, { x: number; y: number }>());
  const layoutGenerationRef = useRef(layoutGeneration);

  const handleRulesChange = useCallback<RulesChangeHandler>(
    (next, options) => {
      if (options?.relayout) {
        isDragging.current = false;
      }
      onRulesChange(next, options);
    },
    [onRulesChange],
  );

  const { nodes: layoutNodes, edges: layoutEdges } = useMemo(
    () => rulesToFlow(rules, providers, scopeName),
    [rules, providers, scopeName],
  );

  const enrichedNodes = useMemo(
    () =>
      layoutNodes.map(
        (node) =>
          ({
            ...node,
            data: {
              ...node.data,
              rules,
              onRulesChange: handleRulesChange,
            },
          }) satisfies FlowNode,
      ),
    [layoutNodes, rules, handleRulesChange],
  );

  const enrichedEdges = useMemo(
    () =>
      layoutEdges.map((edge) => ({
        ...edge,
        type: edge.label ? "conditional" : undefined,
      })),
    [layoutEdges],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(enrichedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(enrichedEdges);

  useEffect(() => {
    const structureChanged = layoutGenerationRef.current !== layoutGeneration;
    layoutGenerationRef.current = layoutGeneration;

    // While dragging, ignore data-only refreshes so the node can move freely.
    // Explicit layoutGeneration bumps (arrow/reorder/add/remove) still win.
    if (isDragging.current && !structureChanged) {
      return;
    }

    isDragging.current = false;
    setNodes(applyStoredPositions(enrichedNodes, positionsRef.current, structureChanged));
  }, [enrichedNodes, layoutGeneration, setNodes]);

  useEffect(() => {
    setEdges(enrichedEdges);
  }, [enrichedEdges, setEdges]);

  const onNodeDragStart = useCallback(() => {
    isDragging.current = true;
  }, []);

  const onNodeDragStop = useCallback<OnNodeDrag>(
    (_, dragged) => {
      positionsRef.current.set(dragged.id, { ...dragged.position });

      if (dragged.id === SCOPE_NODE_ID) {
        isDragging.current = false;
        return;
      }

      const path = idToPath(dragged.id);
      if (!path) {
        isDragging.current = false;
        return;
      }

      const layoutForDrop = enrichedNodes.map((node) => {
        const stored = positionsRef.current.get(node.id);
        return stored ? { ...node, position: stored } : node;
      });
      const newIndex = resolveSiblingDropIndex(dragged, layoutForDrop);
      const oldIndex = path[path.length - 1];

      if (newIndex !== oldIndex) {
        handleRulesChange(reorderSibling(rules, path, newIndex), { relayout: true });
        return;
      }

      // Keep the free-drag position — do not snap back to auto-layout.
      isDragging.current = false;
    },
    [rules, handleRulesChange, enrichedNodes],
  );

  const addRoot = () => {
    const rule = newRule(providers);
    if (rule) handleRulesChange([...rules, rule], { relayout: true });
  };

  return (
    <div className="mc-rule-flow-canvas" data-mark="mc:canvas">
      <div className="mc-rule-flow-viewport">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeDragStart={onNodeDragStart}
          onNodeDragStop={onNodeDragStop}
          nodeTypes={ruleFlowNodeTypes}
          edgeTypes={ruleFlowEdgeTypes}
          defaultViewport={{ x: 24, y: 24, zoom: 1 }}
          isValidConnection={(connection) =>
            isValidTreeConnection(connection.source ?? "", connection.target ?? "")
          }
          nodesConnectable={false}
          nodesDraggable
          elementsSelectable={false}
          selectNodesOnDrag={false}
          nodeOrigin={[0, 0]}
          minZoom={0.5}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
        >
          <FitViewOnce />
          <Controls position="bottom-right" showInteractive={false} />
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        </ReactFlow>
      </div>
      {rules.length === 0 ? (
        <p className="mc-rule-flow-empty">No rules yet. Each rule node contributes folder levels beneath the scope.</p>
      ) : null}
      <div className="mc-rule-flow-toolbar">
        <button type="button" className="nodrag nopan" data-mark="mc:canvas-add" onClick={addRoot}>
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
