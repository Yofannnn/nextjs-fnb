"use client";

import { useSessionRotation } from "@/features/auth/hooks/useSessionRotation";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useSessionRotation({
    rotationThresholdMs: 5 * 60 * 1000,
    maxRetries: 3,
    retryDelayMs: 1000,
    enableAutoRotation: true,
  });

  return <>{children}</>;
}
