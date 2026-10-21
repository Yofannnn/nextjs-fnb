"use client";

import { AuthLayout } from "@/components/layouts/AuthLayout";
import { AuthForm } from "@/features/auth/components/AuthForm";

export default function LoginPage() {
  return (
    <AuthLayout page="login" title="Login" description="Login to your account">
      <AuthForm mode="login" />
    </AuthLayout>
  );
}
