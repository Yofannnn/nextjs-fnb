import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { decodeJwt, JWTPayload } from "jose";
import { AccessTokenPayload } from "@/features/auth/types/auth.type";

interface SessionState {
  accessToken: string | null;
  user: AccessTokenPayload | null;

  isRotating: boolean;
  lastRotationAttempt: number | null;

  _hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;

  setAccessToken: (accessToken: string) => void;
  clearSession: () => void;
  setRotatingState: (isRotating: boolean) => void;

  decodeToken: (token: string) => (AccessTokenPayload & JWTPayload) | null;

  isTokenExpired: () => boolean;
  getTimeUntilExpiration: () => number;
  isTokenExpiringSoon: (thresholdMs?: number) => boolean;
}

export const useSession = create<SessionState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,

      isRotating: false,
      lastRotationAttempt: null,

      _hasHydrated: false,
      setHasHydrated: (v) => set({ _hasHydrated: v }),

      decodeToken: (token) => {
        try {
          return decodeJwt<AccessTokenPayload & JWTPayload>(token);
        } catch (error) {
          console.error("Failed to decode token:", error);
          return null;
        }
      },

      setAccessToken: (accessToken) => {
        const user = get().decodeToken(accessToken);

        set({
          accessToken,
          user,
          lastRotationAttempt: Date.now(),
        });
      },

      clearSession: () => {
        set({
          accessToken: null,
          user: null,
          isRotating: false,
          lastRotationAttempt: null,
        });
      },

      setRotatingState: (isRotating) => {
        set({ isRotating });
      },

      isTokenExpired: () => {
        const { accessToken } = get();

        if (!accessToken) return true;

        const payload = get().decodeToken(accessToken);

        if (!payload?.exp) return true;

        return payload.exp * 1000 <= Date.now();
      },

      getTimeUntilExpiration: () => {
        const { accessToken } = get();

        if (!accessToken) return 0;

        const payload = get().decodeToken(accessToken);

        if (!payload?.exp) return 0;

        return payload.exp * 1000 - Date.now();
      },

      isTokenExpiringSoon: (thresholdMs = 5 * 60 * 1000) => {
        const remaining = get().getTimeUntilExpiration();

        return remaining > 0 && remaining <= thresholdMs;
      },
    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        accessToken: state.accessToken,
      }),

      onRehydrateStorage: () => (state) => {
        if (!state) return;

        if (state.accessToken) {
          state.user = state.decodeToken(state.accessToken);
        }

        state.setHasHydrated(true);
      },
    },
  ),
);
