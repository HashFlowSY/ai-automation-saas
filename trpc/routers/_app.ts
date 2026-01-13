import { workflowsRouter } from "@/app/api/workflows/server/routers";
import { createTRPCRouter } from "../init";
import { credentialsRouter } from "@/app/api/credentials/server/routers";
export const appRouter = createTRPCRouter({
  workflows: workflowsRouter,
  credentials: credentialsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
