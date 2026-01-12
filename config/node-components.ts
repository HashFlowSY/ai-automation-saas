import { GeminiNode } from "@/components/features/executions/ai-request/node";
import { HttpRequestNode } from "@/components/features/executions/http-request/node";
import { GoolgeFormTriggerNode } from "@/components/features/triggers/google-form-trigger/node";
import { ManualTriggerNode } from "@/components/features/triggers/manual-trigger/node";
import { StripeTriggerNode } from "@/components/features/triggers/stripe-trigger/node";
import { InitialNode } from "@/components/initial-node";
import { NodeType } from "@/lib/generated/prisma/enums";

import type { NodeTypes } from "@xyflow/react";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
  [NodeType.GOOGLE_FORM_TRIGGER]: GoolgeFormTriggerNode,
  [NodeType.STRIPE_TRIGGER]: StripeTriggerNode,
  [NodeType.GEMINI]: GeminiNode,
} as const satisfies NodeTypes;

export type RegistedNodeType = keyof typeof nodeComponents;
