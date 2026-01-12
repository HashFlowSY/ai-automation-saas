import type { NodeExecutor } from "../types";
import Handlebars from "handlebars";
import { geminiChannel } from "@/inngest/channels/gemini";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { NonRetriableError } from "inngest";

Handlebars.registerHelper("json", (context) => {
  const stringified = JSON.stringify(context, null, 2);
  return new Handlebars.SafeString(stringified);
});

type GeminiData = {
  variableName?: string;
  systemPrompt?: string;
  userPrompt?: string;
};

export const geminiExecutor: NodeExecutor<GeminiData> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(
    geminiChannel().status({
      nodeId: nodeId,
      status: "loading",
    })
  );

  try {
    if (!data.variableName) {
      await publish(
        geminiChannel().status({
          nodeId: nodeId,
          status: "error",
        })
      );
      throw new NonRetriableError("Gemini node: No variable name configured");
    }

    if (!data.userPrompt) {
      await publish(
        geminiChannel().status({
          nodeId: nodeId,
          status: "error",
        })
      );
      throw new NonRetriableError("Gemini node: User prompt is missing");
    }

    const systemPrompt = data.systemPrompt
      ? Handlebars.compile(data.systemPrompt)(context)
      : "You are a helpful assistant.";

    const userPrompt = data.userPrompt
      ? Handlebars.compile(data.userPrompt)(context)
      : "";

    const credentialValue = process.env.GOOGLE_GENERATIVE_AI_API_KEY!;

    if (!credentialValue) {
      await publish(
        geminiChannel().status({
          nodeId: nodeId,
          status: "error",
        })
      );
      throw new NonRetriableError("Gemini node: Credential is missing");
    }

    const google = createGoogleGenerativeAI({
      apiKey: credentialValue,
    });

    const { steps } = await step.ai.wrap("gemini-generate-text", generateText, {
      model: google("gemini-pro-latest"),
      system: systemPrompt,
      prompt: userPrompt,
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    });

    const text =
      steps[0].content[0].type === "text" ? steps[0].content[0].text : "";

    await publish(
      geminiChannel().status({
        nodeId,
        status: "success",
      })
    );
    return {
      ...context,
      [data.variableName]: {
        aiResponse: text,
      },
    };
  } catch (error) {
    await publish(
      geminiChannel().status({
        nodeId,
        status: "error",
      })
    );
    throw error;
  }
};
