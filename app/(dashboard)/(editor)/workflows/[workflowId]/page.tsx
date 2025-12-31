import { prefetchWorkflow } from "@/app/api/workflows/server/prefetch";
import {
  Editor,
  EditorError,
  EditorLoading,
} from "@/components/features/editor/editor";
import { EditorHeader } from "@/components/features/editor/editor-header";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
  params: Promise<{
    //参数需要确保和上级路径 [param] 中的 param 相同
    workflowId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  await requireAuth();
  const { workflowId } = await params;

  prefetchWorkflow(workflowId);
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError />}>
        <Suspense fallback={<EditorLoading />}>
          <EditorHeader workflowId={workflowId} />
          <main className="flex-1">
            <Editor workflowId={workflowId} />
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
}
