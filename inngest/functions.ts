import prisma from "@/lib/prisma";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  {
    id: "hello-world",
    retries: 1,
  },
  {
    event: "test/hello.world",
  },
  async ({ event, step }) => {
    await step.run("create-workflow", () => {
      return prisma.workflow.create({
        data: {
          name: "workflow-from-inngest",
        },
      });
    });
  }
);
