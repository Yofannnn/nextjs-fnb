import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Mail, RefreshCw, HomeIcon, Server, HeadphonesIcon, KeyRound, LucideIcon, Hourglass } from "lucide-react";
import { cn } from "@/lib/class-name.util";
import { ApiError } from "@/lib/api-error";

type TokenType = "verification-email" | "password-reset";

enum ErrorType {
  VerificationEmailExpired = "verification-email-expired",
  InvalidVerificationToken = "invalid-verification-token",
  PasswordResetExpired = "password-reset-expired",
  InvalidPasswordResetToken = "invalid-password-reset-token",
  ServerError = "server-error",
}

interface ErrorConfig {
  title: string;
  description: string;
  defaultMessage: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  primaryActionLabel?: string;
  message?: string;
}

const ERROR_CONFIGS: Record<ErrorType, ErrorConfig> = {
  [ErrorType.VerificationEmailExpired]: {
    title: "Verification Link Expired",
    description: "The verification link has expired. Please request a new verification email.",
    defaultMessage: "The verification link has expired. Please request a new one.",
    icon: Hourglass,
    iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    primaryActionLabel: "Resend Verification Email",
  },

  [ErrorType.PasswordResetExpired]: {
    title: "Password Reset Link Expired",
    description: "The password reset link has expired. Please request a new reset email.",
    defaultMessage: "The password reset link has expired. Please request a new one.",
    icon: Hourglass,
    iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    primaryActionLabel: "Resend Password Reset Email",
  },

  [ErrorType.InvalidVerificationToken]: {
    title: "Invalid Verification Token",
    description: "This verification token is invalid or has already been used.",
    defaultMessage: "Please request a new verification email and try again.",
    icon: KeyRound,
    iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    primaryActionLabel: "Request New Verification Email",
  },

  [ErrorType.InvalidPasswordResetToken]: {
    title: "Invalid Reset Token",
    description: "This password reset token is invalid or has already been used.",
    defaultMessage: "Please request a new password reset email and try again.",
    icon: KeyRound,
    iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    primaryActionLabel: "Request New Password Reset Email",
  },

  [ErrorType.ServerError]: {
    title: "Server Error",
    description: "Something went wrong on our servers.",
    defaultMessage: "Our team has been notified. Please try again later.",
    icon: Server,
    iconBgColor: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-600 dark:text-red-400",
    primaryActionLabel: "Retry",
  },
};

function mapTokenError(error: unknown, tokenType?: TokenType): ErrorType {
  if (ApiError.isApiError(error)) {
    const normalized = error.message.toLowerCase();

    if (normalized.includes("expired") && tokenType) {
      return tokenType === "verification-email" ? ErrorType.VerificationEmailExpired : ErrorType.PasswordResetExpired;
    }

    if (normalized.includes("invalid") && tokenType) {
      return tokenType === "verification-email" ? ErrorType.InvalidVerificationToken : ErrorType.InvalidPasswordResetToken;
    }
  }

  return ErrorType.ServerError;
}

function getErrorConfig(error: unknown, errorType: ErrorType): ErrorConfig {
  if (ApiError.isApiError(error)) return { ...ERROR_CONFIGS[errorType], message: error.message };

  return { ...ERROR_CONFIGS[ErrorType.ServerError], message: error instanceof Error ? error.message : String(error) };
}

interface AuthVerifyingTokenErrorCardProps {
  error: unknown;
  tokenType: TokenType;
  onAction?: () => void;
}

export function AuthVerifyingTokenErrorCard({ error, tokenType, onAction }: AuthVerifyingTokenErrorCardProps) {
  const errorType = mapTokenError(error, tokenType);
  const config = getErrorConfig(error, errorType);

  return (
    <Card className="max-w-md w-full mx-4 my-10 shadow-lg">
      <CardHeader className="text-center space-y-4 mt-4">
        <div className={cn(config.iconBgColor, "mx-auto flex items-center justify-center size-22 md:size-24 rounded-full")}>
          <config.icon className={cn(config.iconColor, "size-11 md:size-12")} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">{config.title}</h2>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 mb-4">
        <div className={cn(config.iconBgColor, config.iconColor, "border-l-4 md:border-l-5 p-4 rounded-r-lg")}>
          <div className="flex gap-3">
            <Mail className={cn(config.iconColor, "size-4 md:size-5 shrink-0 mt-0.5")} />
            <p className={cn(config.iconColor, "text-sm")}>{config.message || config.defaultMessage}</p>
          </div>
        </div>
        <p className="text-center text-xs md:text-sm text-muted-foreground">{config.description}</p>
        <div className="space-y-3">
          {config.primaryActionLabel && onAction && (
            <Button onClick={onAction} className="w-full group" size="lg">
              <RefreshCw className="size-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              {config.primaryActionLabel || "Retry"}
            </Button>
          )}
          <Button variant="outline" className="w-full" size="lg" asChild>
            <Link href="/">
              <HomeIcon className="size-4 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>
      </CardContent>

      <CardFooter className="border-t">
        <Link
          as="button"
          href="/contact-support"
          className="w-full text-center  text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors py-2 flex items-center justify-center gap-2"
        >
          <HeadphonesIcon className="size-4" />
          Contact Support
        </Link>
      </CardFooter>
    </Card>
  );
}
