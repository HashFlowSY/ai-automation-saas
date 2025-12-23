import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div
      className={cn(
        "min-h-screen min-w-screen flex items-center justify-center"
      )}
    >
      <Button variant="outline">It is a button</Button>
    </div>
  );
}
