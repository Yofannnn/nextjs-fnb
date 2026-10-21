import { apiRequest } from "@/lib/api-request";
import { ForgotPasswordSchemaType, LoginSchemaType, RegisterSchemaType, ResetPasswordSchemaType, VerifyEmailSchemaType } from "@/features/auth/schemas/auth.schema";
import {
  ForgotPasswordApiResponse,
  LoginApiResponse,
  LogoutApiResponse,
  RefreshSessionApiResponse,
  RegisterApiResponse,
  ResendVerificationEmailApiResponse,
  ResetPasswordApiResponse,
  ValidateResetTokenApiResponse,
  VerificationEmailApiResponse,
} from "@/features/auth/types/auth.dto";

const JSON_HEADERS = { "Content-Type": "application/json" } as const;

export function refreshSession() {
  return apiRequest<RefreshSessionApiResponse>("/auth/refresh-session", {
    method: "POST",
    credentials: "include",
    headers: JSON_HEADERS,
    retries: 2,
    timeout: 10000,
  });
}

export function logout() {
  return apiRequest<LogoutApiResponse>("/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: JSON_HEADERS,
    timeout: 5000,
  });
}

export function login(values: LoginSchemaType) {
  return apiRequest<LoginApiResponse>("/auth/login", {
    method: "POST",
    credentials: "include",
    headers: JSON_HEADERS,
    body: JSON.stringify(values),
  });
}

export function register(values: RegisterSchemaType) {
  return apiRequest<RegisterApiResponse>("/auth/register", {
    method: "POST",
    credentials: "include",
    headers: JSON_HEADERS,
    body: JSON.stringify(values),
  });
}

export function forgotPassword(values: ForgotPasswordSchemaType) {
  return apiRequest<ForgotPasswordApiResponse>("/auth/forgot-password", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(values),
  });
}

export function validateResetToken(token: string) {
  return apiRequest<ValidateResetTokenApiResponse>(`/auth/validate-reset-password`, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify({ resetPasswordToken: token }),
  });
}

export function resetPassword(value: ResetPasswordSchemaType) {
  return apiRequest<ResetPasswordApiResponse>(`/auth/reset-password`, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(value),
  });
}

export function verifyEmail(value: VerifyEmailSchemaType) {
  return apiRequest<VerificationEmailApiResponse>("/auth/verify-email", {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(value),
  });
}

export function resendVerificationEmail() {
  return apiRequest<ResendVerificationEmailApiResponse>("/auth/resend-verification-email", {
    method: "POST",
    headers: JSON_HEADERS,
  });
}
