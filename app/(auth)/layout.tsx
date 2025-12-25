import React from "react";
import AuthLayout from "@/components/features/auth/auth-layout";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AuthLayout>{children}</AuthLayout>;
}
