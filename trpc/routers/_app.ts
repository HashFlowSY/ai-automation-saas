import { z } from "zod";
import { protectedProcedure, createTRPCRouter } from "../init";
import prisma from "@/lib/prisma";
import { inngest } from "@/inngest/client";

export const appRouter = createTRPCRouter({
  testAI: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/create-ai",
      data: {
        prompt: "write a sport plan for a man of 68kg.",
      },
    });
    return { success: true, message: "test AI Job queued" };
  }),

  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
