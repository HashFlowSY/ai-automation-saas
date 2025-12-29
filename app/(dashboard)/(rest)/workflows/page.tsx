import { workflowsParams } from "@/app/api/workflows/params";
import { workflowsParamsLoader } from "@/app/api/workflows/server/params-loader";
import { prefetchWorkflows } from "@/app/api/workflows/server/prefetch";
import WorkflowsList, {
  WorkflowsContainer,
} from "@/components/features/workflows/workflows";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: Props) {
  await requireAuth();

  const params = await workflowsParamsLoader(searchParams);
  //TODO 解释一下为什么不需要使用 await
  prefetchWorkflows(params);
  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<p>Error</p>}>
          <Suspense fallback={<p>Loading...</p>}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
}
