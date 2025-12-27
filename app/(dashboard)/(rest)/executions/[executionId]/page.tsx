import { requireAuth } from "@/lib/auth-utils";

interface PageProps {
  params: Promise<{
    //参数需要确保和上级路径 [param] 中的 param 相同
    executionId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  await requireAuth();
  const { executionId } = await params;
  return <p>Execution Id: {executionId}</p>;
}
