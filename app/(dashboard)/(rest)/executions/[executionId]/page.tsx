import { prefetchExecution } from "@/app/api/executions/server/prefetch";
import { ExecutionView } from "@/components/features/executions/execution";
import {
  ExecutionsError,
  ExecutionsLoading,
} from "@/components/features/executions/executions";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
  params: Promise<{
    //参数需要确保和上级路径 [param] 中的 param 相同
    executionId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  await requireAuth();
  const { executionId } = await params;
  prefetchExecution(executionId);
  return (
    <div className="p-4 md:px-10 md:py-6 h-full">
      <div className="mx-auto max-w-screen-md w-full flex flex-col gap-y-8 h-full">
        <HydrateClient>
          <ErrorBoundary fallback={<ExecutionsError />}>
            <Suspense fallback={<ExecutionsLoading />}>
              <ExecutionView executionId={executionId} />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>
      </div>
    </div>
  );
}
