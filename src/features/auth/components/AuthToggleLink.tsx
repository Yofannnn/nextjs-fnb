import { CardFooter } from "@/components/ui/card";
import { AuthOperationMode } from "@/features/auth/types/auth.dto";
import { createRedirectUrl } from "@/lib/redirect";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface AuthToggleLinkProps {
  page: AuthOperationMode;
}

export function AuthToggleLink({ page }: AuthToggleLinkProps) {
  const searchParams = useSearchParams();
  const isLogin = page === "login";
  const linkText = isLogin ? "Register" : "Login";
  const promptText = isLogin ? "Don't have an account? " : "Already have an account? ";
  const linkHref = createRedirectUrl(isLogin ? "/register" : "/login", searchParams.get("redirect"));

  if (page !== "login" && page !== "register") return null;

  return (
    <Suspense>
      <CardFooter className="border-t">
        <div className="w-full text-center text-sm text-muted-foreground">
          {promptText}
          <Link href={`/${linkHref}`} className="underline underline-offset-4">
            {linkText}
          </Link>
        </div>
      </CardFooter>
    </Suspense>
  );
}
