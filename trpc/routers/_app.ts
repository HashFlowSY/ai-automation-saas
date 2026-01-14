import { workflowsRouter } from "@/app/api/workflows/server/routers";
import { createTRPCRouter } from "../init";
import { credentialsRouter } from "@/app/api/credentials/server/routers";
import { executionsRouter } from "@/app/api/executions/server/routers";
export const appRouter = createTRPCRouter({
  workflows: workflowsRouter,
  credentials: credentialsRouter,
  executions: executionsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
