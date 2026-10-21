"use client";

import { Suspense, useEffect, useRef } from "react";
import { useVerifyEmail } from "@/features/auth/hooks/useAuthMutations";
import { AuthVerifyingTokenLoader } from "@/features/auth/components/AuthVerifyingTokenLoader";
import { AuthVerifyingTokenErrorCard } from "@/features/auth/components/AuthVerifyingTokenErrorCard";
import { AuthEmailVerifiedCard } from "@/features/auth/components/AuthEmailVerifiedCard";
import { ConfettiFireworks } from "@/components/ui/confetti";
import { useSearchParams } from "next/navigation";

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={<AuthVerifyingTokenLoader />}>
      <EmailVerification />
    </Suspense>
  );
}

function EmailVerification() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const verifyEmail = useVerifyEmail();
  const executed = useRef(false);

  const handleRequestNewToken = () => {
    alert("This action is under development. Please try again later.");
  };

  useEffect(() => {
    if (!token || executed.current) return;

    executed.current = true;

    verifyEmail.mutate({ verifyEmailToken: token });
  }, [token, verifyEmail]);

  if (verifyEmail.isPending) return <AuthVerifyingTokenLoader />;

  if (verifyEmail.isError)
    return (
      <main className="flex h-svh items-center justify-center overflow-y-auto">
        <AuthVerifyingTokenErrorCard error={verifyEmail.error} tokenType="verification-email" onAction={handleRequestNewToken} />
      </main>
    );

  if (verifyEmail.isSuccess)
    return (
      <main className="flex h-svh items-center justify-center">
        <AuthEmailVerifiedCard />
        <ConfettiFireworks autoTrigger={true} showButton={false} />
      </main>
    );

  return null;
}
