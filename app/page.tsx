import { cn } from "@/lib/utils";
import Client from "./client";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

export default async function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());
  return (
    <div
      className={cn(
        "min-h-screen min-w-screen flex items-center justify-center"
      )}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>loading...</div>}>
          <Client />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
