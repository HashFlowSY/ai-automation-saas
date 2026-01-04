import { HttpRequestNode } from "@/components/features/executions/http-request/node";
import { ManualTriggerNode } from "@/components/features/triggers/manual-trigger/node";
import { InitialNode } from "@/components/initial-node";
import { NodeType } from "@/lib/generated/prisma/enums";

import type { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
} as const satisfies NodeTypes;

export type RegistedNodeType = keyof typeof nodeComponents;
