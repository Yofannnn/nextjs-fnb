"use client";

import { AuthLayout } from "@/components/layouts/AuthLayout";
import { AuthForm } from "@/features/auth/components/AuthForm";

export default function RegisterPage() {
  return (
    <AuthLayout page="register" title="Register" description="Create a new account">
      <AuthForm mode="register" />
    </AuthLayout>
  );
}
