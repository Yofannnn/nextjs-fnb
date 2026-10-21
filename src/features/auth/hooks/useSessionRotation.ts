import { useEffect, useRef, useCallback } from "react";
import { useSession } from "@/stores/session.store";
import { useRefreshTokenSilently } from "./useAuthMutations";
import { useSessionHydrated } from "./useSessionHydrated";

interface UseSessionRotationOptions {
  rotationThresholdMs?: number;
  maxRetries?: number;
  retryDelayMs?: number;
  enableAutoRotation?: boolean;
}

export const useSessionRotation = (options: UseSessionRotationOptions = {}) => {
  const { rotationThresholdMs = 5 * 60 * 1000, maxRetries = 3, retryDelayMs = 1000, enableAutoRotation = true } = options;

  const { accessToken, isTokenExpiringSoon, isTokenExpired, getTimeUntilExpiration, isRotating, clearSession } = useSession();

  const hydrated = useSessionHydrated();

  const refreshMutation = useRefreshTokenSilently();
  const accessTokenRef = useRef(accessToken);
  const refreshRef = useRef(refreshMutation);
  const getTimeRef = useRef(getTimeUntilExpiration);
  const rotatingRef = useRef(isRotating);
  const mountedRef = useRef(false);
  const rotationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const retryTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lockRef = useRef(false);
  const retryCountRef = useRef(0);
  const lastRotationRef = useRef(0);

  useEffect(() => {
    accessTokenRef.current = accessToken;
  }, [accessToken]);

  useEffect(() => {
    refreshRef.current = refreshMutation;
  }, [refreshMutation]);

  useEffect(() => {
    getTimeRef.current = getTimeUntilExpiration;
  }, [getTimeUntilExpiration]);

  useEffect(() => {
    rotatingRef.current = isRotating;
  }, [isRotating]);

  const clearTimers = useCallback(() => {
    if (rotationTimerRef.current) {
      clearTimeout(rotationTimerRef.current);
      rotationTimerRef.current = null;
    }

    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  }, []);

  const refresh = useCallback(async () => {
    if (lockRef.current) {
      return false;
    }

    lockRef.current = true;

    try {
      const result = await refreshRef.current.mutateAsync();

      return !!result;
    } catch {
      return false;
    } finally {
      lockRef.current = false;
    }
  }, []);

  const scheduleRotation = useCallback(() => {
    if (!mountedRef.current || !accessTokenRef.current || !enableAutoRotation) {
      return;
    }

    clearTimers();

    const expires = getTimeRef.current();

    const delay = Math.max(1000, expires - rotationThresholdMs);

    rotationTimerRef.current = setTimeout(async () => {
      if (!mountedRef.current) {
        return;
      }

      if (rotatingRef.current || lockRef.current) {
        return;
      }

      const now = Date.now();

      if (now - lastRotationRef.current < 30000) {
        scheduleRotation();
        return;
      }

      const success = await refresh();

      if (success) {
        retryCountRef.current = 0;

        lastRotationRef.current = Date.now();

        scheduleRotation();

        return;
      }

      scheduleRetry();
    }, delay);
  }, [enableAutoRotation, clearTimers, rotationThresholdMs, refresh]);

  const scheduleRetry = useCallback(() => {
    retryCountRef.current++;

    if (retryCountRef.current > maxRetries) {
      clearSession();
      return;
    }

    const delay = retryDelayMs * Math.pow(2, retryCountRef.current - 1);

    retryTimerRef.current = setTimeout(async () => {
      if (!mountedRef.current) {
        return;
      }

      const success = await refresh();

      if (success) {
        retryCountRef.current = 0;

        lastRotationRef.current = Date.now();

        scheduleRotation();

        return;
      }

      scheduleRetry();
    }, delay);
  }, [maxRetries, retryDelayMs, refresh, scheduleRotation, clearSession]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    mountedRef.current = true;

    const start = async () => {
      const currentToken = useSession.getState().accessToken;

      if (!currentToken) {
        const success = await refresh();

        if (success) {
          retryCountRef.current = 0;
          lastRotationRef.current = Date.now();
          scheduleRotation();
        } else {
          clearTimers();
        }

        return;
      }

      if (isTokenExpired() || isTokenExpiringSoon(rotationThresholdMs)) {
        const success = await refresh();

        if (success) {
          retryCountRef.current = 0;

          lastRotationRef.current = Date.now();

          scheduleRotation();
        } else {
          scheduleRetry();
        }

        return;
      }

      scheduleRotation();
    };

    start();

    return () => {
      mountedRef.current = false;

      clearTimers();
    };
  }, [accessToken, rotationThresholdMs, isTokenExpired, isTokenExpiringSoon, refresh, scheduleRotation, scheduleRetry, clearTimers, hydrated]);

  useEffect(() => {
    const handler = async () => {
      if (document.visibilityState !== "visible") {
        return;
      }

      if (!hydrated) {
        return;
      }

      const currentToken = useSession.getState().accessToken;

      if (!currentToken) {
        const success = await refresh();

        if (success) {
          retryCountRef.current = 0;
          lastRotationRef.current = Date.now();
          scheduleRotation();
        }

        return;
      }

      if (isTokenExpired() || isTokenExpiringSoon(rotationThresholdMs)) {
        const success = await refresh();

        if (success) {
          retryCountRef.current = 0;

          lastRotationRef.current = Date.now();

          scheduleRotation();
        } else {
          scheduleRetry();
        }
      }
    };

    document.addEventListener("visibilitychange", handler);

    return () => {
      document.removeEventListener("visibilitychange", handler);
    };
  }, [rotationThresholdMs, isTokenExpired, isTokenExpiringSoon, refresh, scheduleRotation, scheduleRetry, hydrated]);
};
