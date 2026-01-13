import { prefetchCredential } from "@/app/api/credentials/server/prefetch";
import { CredentialView } from "@/components/features/credentials/credential";
import {
  CredentialsError,
  CredentialsLoading,
} from "@/components/features/credentials/credentials";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
  params: Promise<{
    //参数需要确保和上级路径 [param] 中的 param 相同
    credentialId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  await requireAuth();
  const { credentialId } = await params;
  prefetchCredential(credentialId);
  return (
    <div className="p-4 md:px-10 md:py-6 h-full">
      <div className="mx-auto max-w-screen-md w-full flex flex-col gap-y-8 h-full">
        <HydrateClient>
          <ErrorBoundary fallback={<CredentialsError />}>
            <Suspense fallback={<CredentialsLoading />}>
              <CredentialView credentialId={credentialId} />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>
      </div>
    </div>
  );
}
