import { ApiResponse, ApiResponseNoData } from "@/lib/types/api-response.type";

export type LoginApiResponse = ApiResponse<{ accessToken: string }>;
export type RegisterApiResponse = ApiResponse<{ accessToken: string }>;
export type RefreshSessionApiResponse = ApiResponse<{ accessToken: string }>;
export type LogoutApiResponse = ApiResponseNoData;
export type ForgotPasswordApiResponse = ApiResponseNoData;
export type ResetPasswordApiResponse = ApiResponseNoData;
export type VerificationEmailApiResponse = ApiResponseNoData;
export type ResendVerificationEmailApiResponse = ApiResponseNoData;
export type ValidateResetTokenApiResponse = ApiResponse<{ expiresAt: Date; remainingTimeMs: number }>;

export type AuthOperationMode = "register" | "login" | "refresh-session" | "verify-email" | "resend-verification-email" | "forgot-password" | "validate-reset-token" | "reset-password" | "logout";
export type InteractiveAuthMode = Extract<AuthOperationMode, "register" | "login" | "forgot-password" | "reset-password">;
