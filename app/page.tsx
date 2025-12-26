import { requireAuth } from "@/lib/auth-utils";
import { cn } from "@/lib/utils";
import { caller } from "@/trpc/server";

export default async function Home() {
  /**
   * 这里的用处和 middlare 类似，都是为了更好的用户体验
   * 防止用户看到报错页面
   *
   * 不用于确保安全，middlare 也不能用于确保安全
   *
   * 有很多办法可以突破 middlare 的安全保障
   */
  await requireAuth();

  const data = await caller.getWorkflows();

  return (
    <div
      className={cn(
        "min-h-screen min-w-screen flex items-center justify-center"
      )}
    >
      {JSON.stringify(data)}
    </div>
  );
}
