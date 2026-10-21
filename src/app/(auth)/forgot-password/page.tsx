"use client";

import { AuthForm } from "@/features/auth/components/AuthForm";
import { AuthLayout } from "@/components/layouts/AuthLayout";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout page="forgot-password" title="Forgot Password" description="Reset your password">
      <AuthForm mode="forgot-password" />
    </AuthLayout>
  );
}
