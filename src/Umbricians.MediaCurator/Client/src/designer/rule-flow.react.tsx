import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesInitialized,
  useNodesState,
  useReactFlow,
  useStore,
  type Node,
  type OnNodeDrag,
  type XYPosition,
} from "@xyflow/react";
import type { ProviderModel, RuleNodeModel } from "../api/index.js";
import {
  idToPath,
  isValidTreeConnection,
  resolveSiblingDropIndex,
  rulesStructureKey,
  rulesToFlow,
  SCOPE_NODE_ID,
  type RuleFlowNodeData,
} from "./rule-flow.mapping.js";
import { ruleFlowNodeTypes, type RuleFlowActions, type RulesChangeHandler } from "./rule-flow.nodes.js";
import { reorderSibling } from "./rule-tree.logic.js";

export type RuleFlowCanvasProps = RuleFlowActions & {
  rules: RuleNodeModel[];
  providers: ProviderModel[];
  scopeName: string;
  /** Incremented by the Lit host on structural edits (reorder/add/remove). */
  layoutGeneration?: number;
  onRulesChange: (rules: RuleNodeModel[], options?: { relayout?: boolean }) => void;
};

type FlowNode = Node<RuleFlowNodeData & RuleFlowActions>;

const FIT_MIN_ZOOM = 0.85;
const FIT_MAX_ZOOM = 1;
const FIT_PADDING = 24;

function FitViewOnce() {
  const { getNodes, getNodesBounds, setViewport } = useReactFlow();
  const nodesInitialized = useNodesInitialized();
  const width = useStore((state) => state.width);
  const height = useStore((state) => state.height);
  const didFit = useRef(false);

  useEffect(() => {
    // Wait for real card sizes so the first fit matches the measured layout.
    if (!nodesInitialized || !width || !height || didFit.current) return;
    didFit.current = true;
    const frame = requestAnimationFrame(() => {
      const bounds = getNodesBounds(getNodes());
      const fitZoom = Math.min(
        (width - FIT_PADDING * 2) / bounds.width,
        (height - FIT_PADDING * 2) / bounds.height,
      );
      const zoom = Math.min(FIT_MAX_ZOOM, Math.max(FIT_MIN_ZOOM, fitZoom));
      const x = (width - bounds.width * zoom) / 2 - bounds.x * zoom;
      // Centre trees that fit; otherwise pin the scope to the top so the tree reads top-down.
      const contentHeight = bounds.height * zoom;
      const top = contentHeight <= height - FIT_PADDING * 2 ? (height - contentHeight) / 2 : FIT_PADDING;
      void setViewport({ x, y: top - bounds.y * zoom, zoom }, { duration: 150 });
    });
    return () => cancelAnimationFrame(frame);
  }, [getNodes, getNodesBounds, setViewport, nodesInitialized, width, height]);

  return null;
}

/** Rendered card heights by node id; the key only changes when a height does. */
function useMeasuredHeights(nodes: FlowNode[]): ReadonlyMap<string, number> {
  const key = nodes.map((node) => `${node.id}:${node.measured?.height ?? ""}`).join("|");
  return useMemo(() => {
    const heights = new Map<string, number>();
    for (const node of nodes) {
      if (node.measured?.height) heights.set(node.id, node.measured.height);
    }
    return heights;
  }, [key]);
}

function RuleFlowCanvasInner({
  rules,
  providers,
  scopeName,
  layoutGeneration = 0,
  onRulesChange,
  onEditRule,
  onDeleteRule,
  onAddRule,
}: RuleFlowCanvasProps) {
  const isDragging = useRef(false);
  /** Positions of cards the user free-dragged; everything else follows auto-layout. */
  const draggedPositionsRef = useRef(new Map<string, XYPosition>());
  const layoutGenerationRef = useRef(layoutGeneration);
  const structureKey = rulesStructureKey(rules);
  const structureKeyRef = useRef(structureKey);
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode>([]);
  const measuredHeights = useMeasuredHeights(nodes);

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
    () => rulesToFlow(rules, providers, scopeName, measuredHeights),
    [rules, providers, scopeName, measuredHeights],
  );

  const enrichedNodes = useMemo(
    () =>
      layoutNodes.map(
        (node) =>
          ({
            ...node,
            data: { ...node.data, onEditRule, onDeleteRule, onAddRule },
          }) satisfies FlowNode,
      ),
    [layoutNodes, onEditRule, onDeleteRule, onAddRule],
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutEdges);

  useEffect(() => {
    const structureChanged =
      layoutGenerationRef.current !== layoutGeneration || structureKeyRef.current !== structureKey;
    layoutGenerationRef.current = layoutGeneration;
    structureKeyRef.current = structureKey;
    if (structureChanged) {
      draggedPositionsRef.current.clear();
    }

    // While dragging, ignore data-only refreshes so the node can move freely.
    // Explicit layoutGeneration bumps (arrow/reorder/add/remove) still win.
    if (isDragging.current && !structureChanged) {
      return;
    }

    isDragging.current = false;
    const dragged = draggedPositionsRef.current;
    setNodes((current) => {
      // Carry over React Flow's measurements so cards are not hidden and re-measured on every edit.
      const measuredById = new Map(current.map((node) => [node.id, node.measured]));
      return enrichedNodes.map((node) => ({
        ...node,
        position: dragged.get(node.id) ?? node.position,
        measured: measuredById.get(node.id),
      }));
    });
  }, [enrichedNodes, layoutGeneration, structureKey, setNodes]);

  useEffect(() => {
    setEdges(layoutEdges);
  }, [layoutEdges, setEdges]);

  const onNodeDragStart = useCallback(() => {
    isDragging.current = true;
  }, []);

  const onNodeDragStop = useCallback<OnNodeDrag>(
    (_, dragged) => {
      draggedPositionsRef.current.set(dragged.id, { ...dragged.position });

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
        const stored = draggedPositionsRef.current.get(node.id);
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
        <button type="button" className="nodrag nopan" data-mark="mc:canvas-add" onClick={() => onAddRule(null)}>
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
