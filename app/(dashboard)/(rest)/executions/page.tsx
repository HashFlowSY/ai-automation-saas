import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import { executionsParamsLoader } from "@/app/api/executions/server/params-loader";
import { prefetchExecutions } from "@/app/api/executions/server/prefetch";
import ExecutionsList, {
  ExecutionsContainer,
  ExecutionsError,
  ExecutionsLoading,
} from "@/components/features/executions/executions";

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: Props) {
  await requireAuth();

  const param = await executionsParamsLoader(searchParams);

  prefetchExecutions(param);

  return (
    <ExecutionsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<ExecutionsError />}>
          <Suspense fallback={<ExecutionsLoading />}>
            <ExecutionsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </ExecutionsContainer>
  );
}
