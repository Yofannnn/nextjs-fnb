"use client";

import { Form } from "@/components/ui/form";
import { usePasswordVisibility } from "@/features/auth/hooks/usePasswordVisibility";
import { NameField } from "./form-fields/NameField";
import { EmailField } from "./form-fields/EmailField";
import { PasswordField } from "./form-fields/PasswordField";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { InteractiveAuthMode } from "@/features/auth/types/auth.dto";
import { AddressField } from "./form-fields/AddressField";
import { cn } from "@/lib/class-name.util";
import { Suspense, useEffect } from "react";
import { useLoginForm, useRegisterForm, useForgotPasswordForm, useResetPasswordForm } from "@/features/auth/hooks/useAuthForm";
import { useLogin, useRegister, useForgotPassword, useResetPassword } from "@/features/auth/hooks/useAuthMutations";
import { useSearchParams } from "next/navigation";

interface AuthFormProps {
  mode: InteractiveAuthMode;
  onSuccess?: () => void;
  className?: string;
}

function LoginForm({ onSuccess, className }: { onSuccess?: () => void; className?: string }) {
  const form = useLoginForm();
  const mutation = useLogin();
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
    onSuccess?.();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className={cn("grid gap-6", className)}>
        <EmailField control={form.control} disabled={mutation.isPending} />
        <PasswordField control={form.control} showPassword={showPassword} onTogglePassword={togglePasswordVisibility} disabled={mutation.isPending} mode="login" />
        <SubmitButton isSubmitting={mutation.isPending} submitText="Login" />
      </form>
    </Form>
  );
}

function RegisterForm({ onSuccess, className }: { onSuccess?: () => void; className?: string }) {
  const form = useRegisterForm();
  const mutation = useRegister();
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
    onSuccess?.();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className={cn("grid gap-6", className)}>
        <NameField control={form.control} disabled={mutation.isPending} />
        <AddressField control={form.control} disabled={mutation.isPending} />
        <EmailField control={form.control} disabled={mutation.isPending} />
        <PasswordField control={form.control} showPassword={showPassword} onTogglePassword={togglePasswordVisibility} disabled={mutation.isPending} mode="register" />
        <SubmitButton isSubmitting={mutation.isPending} submitText="Register" />
      </form>
    </Form>
  );
}

function ForgotPasswordForm({ onSuccess, className }: { onSuccess?: () => void; className?: string }) {
  const form = useForgotPasswordForm();
  const mutation = useForgotPassword();

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
    onSuccess?.();
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className={cn("grid gap-6", className)}>
        <EmailField control={form.control} disabled={mutation.isPending} />
        <SubmitButton isSubmitting={mutation.isPending} submitText="Send Reset Link" />
      </form>
    </Form>
  );
}

function ResetPasswordForm({ onSuccess, className }: { onSuccess?: () => void; className?: string }) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const form = useResetPasswordForm();
  const mutation = useResetPassword();
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
    onSuccess?.();
  });

  useEffect(() => {
    console.log(token);
    if (token) form.setValue("resetPasswordToken", token);
  }, [token, form]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className={cn("grid gap-6", className)}>
        <PasswordField name="newPassword" control={form.control} showPassword={showPassword} onTogglePassword={togglePasswordVisibility} disabled={mutation.isPending} mode="reset-password" />
        <SubmitButton isSubmitting={mutation.isPending} submitText="Reset Password" />
      </form>
    </Form>
  );
}

export function AuthForm({ mode, onSuccess, className }: AuthFormProps) {
  return (
    <Suspense>
      {mode === "login" && <LoginForm onSuccess={onSuccess} className={className} />}
      {mode === "register" && <RegisterForm onSuccess={onSuccess} className={className} />}
      {mode === "forgot-password" && <ForgotPasswordForm onSuccess={onSuccess} className={className} />}
      {mode === "reset-password" && <ResetPasswordForm onSuccess={onSuccess} className={className} />}
    </Suspense>
  );
}
