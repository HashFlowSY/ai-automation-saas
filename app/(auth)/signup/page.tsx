import RegisterForm from "@/components/features/auth/register-form";
import { requireUnauth } from "@/lib/auth-utils";

export default async function Page() {
  await requireUnauth();
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
