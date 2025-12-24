"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";

export default function Client() {
  const trpc = useTRPC();
  const { data: users } = useSuspenseQuery(trpc.getUsers.queryOptions());
  return <div>{JSON.stringify(users)}</div>;
}
