"use client";

import { Suspense, useEffect, useRef } from "react";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { useValidateResetToken } from "@/features/auth/hooks/useAuthMutations";
import { AuthVerifyingTokenLoader } from "@/features/auth/components/AuthVerifyingTokenLoader";
import { AuthVerifyingTokenErrorCard } from "@/features/auth/components/AuthVerifyingTokenErrorCard";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<AuthVerifyingTokenLoader />}>
      <ResetPassword />
    </Suspense>
  );
}

function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const validateResetToken = useValidateResetToken();
  const executed = useRef(false);

  const handleRequestNewToken = () => {
    alert("This action is under development. Please try again later.");
  };

  useEffect(() => {
    if (!token || executed.current) return;

    executed.current = true;

    validateResetToken.mutate(token);
  }, [token, validateResetToken]);

  if (!token) {
    return (
      <main className="flex h-svh items-center justify-center">
        <h1 className="text-center text-xl md:text-2xl font-semibold">Token not found</h1>
      </main>
    );
  }

  if (validateResetToken.isPending) {
    return <AuthVerifyingTokenLoader />;
  }

  if (validateResetToken.isError) {
    return (
      <main className="flex h-svh items-center justify-center">
        <AuthVerifyingTokenErrorCard error={validateResetToken.error} tokenType="password-reset" onAction={handleRequestNewToken} />
      </main>
    );
  }

  if (validateResetToken.isSuccess) {
    return (
      <AuthLayout page="reset-password" title="Reset Password" description="Enter your new password">
        <AuthForm mode="reset-password" />
      </AuthLayout>
    );
  }

  return null;
}
