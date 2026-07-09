import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from "@xyflow/react";

export function ConditionalEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const text = label == null ? "" : String(label);
  const isCondition = text.length > 0 && text !== "always";

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      {text ? (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
            }}
            className={`mc-rule-flow-edge-label${isCondition ? " mc-rule-flow-edge-label--condition" : ""}`}
            data-mark={isCondition ? "mc:edge-condition" : "mc:edge"}
          >
            {isCondition ? `when “${text}”` : text}
          </div>
        </EdgeLabelRenderer>
      ) : null}
    </>
  );
}

export const ruleFlowEdgeTypes = {
  conditional: ConditionalEdge,
};
