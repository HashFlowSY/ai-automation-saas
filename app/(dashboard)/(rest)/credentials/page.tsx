import { credentialsParamsLoader } from "@/app/api/credentials/server/params-loader";
import { prefetchCredentials } from "@/app/api/credentials/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import CredentialsList, {
  CredentialsContainer,
  CredentialsError,
  CredentialsLoading,
} from "@/components/features/credentials/credentials";

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: Props) {
  await requireAuth();

  const param = await credentialsParamsLoader(searchParams);

  prefetchCredentials(param);

  return (
    <CredentialsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<CredentialsError />}>
          <Suspense fallback={<CredentialsLoading />}>
            <CredentialsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </CredentialsContainer>
  );
}
