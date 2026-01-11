import { stripeTriggerChannel } from "@/inngest/channels/stripe-trigger";
import type { NodeExecutor } from "../../executions/types";

type StripeTriggerData = Record<string, unknown>;

export const stripeTriggerExecutor: NodeExecutor<StripeTriggerData> = async ({
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(
    stripeTriggerChannel().status({
      nodeId: nodeId,
      status: "loading",
    })
  );
  const result = await step.run("stripe-trigger", async () => context);

  await publish(
    stripeTriggerChannel().status({
      nodeId: nodeId,
      status: "success",
    })
  );

  return result;
};
