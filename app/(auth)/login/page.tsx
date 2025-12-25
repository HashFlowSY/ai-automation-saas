import LoginForm from "@/components/features/auth/login-form";
import { requireUnauth } from "@/lib/auth-utils";

export default async function Page() {
  await requireUnauth();
  return (
    <div>
      <LoginForm />
    </div>
  );
}
