"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordSchema,
  ForgotPasswordSchemaType,
  LoginSchema,
  LoginSchemaType,
  RegisterSchema,
  RegisterSchemaType,
  ResetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/features/auth/schemas/auth.schema";

export function useLoginForm() {
  return useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });
}

export function useRegisterForm() {
  return useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", address: "", email: "", password: "" },
  });
}

export function useForgotPasswordForm() {
  return useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
  });
}

export function useResetPasswordForm() {
  return useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { newPassword: "", resetPasswordToken: "" },
  });
}
