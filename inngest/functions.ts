import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export const testAI = inngest.createFunction(
  {
    id: "testAI",
    retries: 1,
  },
  { event: "test/create-ai" },
  async ({ event, step }) => {
    const { steps } = await step.ai.wrap("gemini-generate-text", generateText, {
      model: google("gemini-3-flash-preview"),
      system: "helpful",
      prompt: event.data.prompt,
    });
    return steps;
  }
);
