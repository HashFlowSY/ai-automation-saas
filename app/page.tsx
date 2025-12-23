import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";

export default async function Home() {
  const user = await prisma.user.findMany();
  return (
    <div
      className={cn(
        "min-h-screen min-w-screen flex items-center justify-center"
      )}
    >
      {JSON.stringify(user)}
    </div>
  );
}
