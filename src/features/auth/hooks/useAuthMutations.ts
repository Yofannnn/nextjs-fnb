"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { toastApiError } from "@/lib/toast-api-error";
import { useSession } from "@/stores/session.store";
import { forgotPassword, login, logout, refreshSession, register, resendVerificationEmail, resetPassword, validateResetToken, verifyEmail } from "@/features/auth/services/auth.service";
import { getRedirectPath } from "@/lib/redirect";

export function useRefreshTokenSilently() {
  const { setAccessToken, clearSession, setRotatingState } = useSession();

  return useMutation({
    mutationFn: refreshSession,
    onMutate: () => setRotatingState(true),
    onSuccess: (result) => {
      if (result.data.accessToken) setAccessToken(result.data.accessToken);
    },
    onError: (error) => {
      console.log("Silent token refresh failed:", error.message);
      clearSession();
    },
    onSettled: () => setRotatingState(false),
  });
}

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAccessToken } = useSession();

  return useMutation({
    mutationFn: login,
    onSuccess: (result) => {
      toast(result.message, { duration: 3000 });

      if (result.data.accessToken) {
        setAccessToken(result.data.accessToken);
        router.push(getRedirectPath(searchParams.get("redirect")));
      }
    },
    onError: (error) => toastApiError(error, "Login failed."),
  });
}

export function useRegister() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAccessToken } = useSession();

  return useMutation({
    mutationFn: register,
    onSuccess: (result) => {
      toast(result.message, { duration: 4000 });

      if (result.data.accessToken) {
        setAccessToken(result.data.accessToken);
        router.push(getRedirectPath(searchParams.get("redirect")));
      }
    },
    onError: (error) => toastApiError(error, "Registration failed."),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (result) => toast(result.message, { duration: 4000 }),
    onError: (error) => toastApiError(error, "Password reset failed."),
  });
}

export function useValidateResetToken() {
  return useMutation({
    mutationFn: validateResetToken,
    onSuccess: (result) => toast(result.message, { duration: 4000 }),
    onError: (error) => toastApiError(error, "Token validation failed."),
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (result) => {
      toast(result.message, { duration: 4000 });
      router.push("/login");
    },
    onError: (error) => toastApiError(error, "Password reset failed."),
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (result) => toast(result.message, { duration: 4000 }),
    onError: (error) => toastApiError(error, "Email verification failed."),
  });
}

export function useResendVerificationEmail() {
  return useMutation({
    mutationFn: resendVerificationEmail,
    onSuccess: (result) => toast(result.message, { duration: 4000 }),
    onError: (error) => toastApiError(error, "Email verification failed."),
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { clearSession } = useSession();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearSession();
      queryClient.clear();
      router.push("/");
    },
    onError: () => {
      clearSession();
      queryClient.clear();
      router.push("/");
    },
  });
}
