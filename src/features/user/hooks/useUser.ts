import { useQuery } from "@tanstack/react-query";
import { getCurrentUserProfile } from "@/features/user/services/user.service";

const STALE_TIME = 5 * 60 * 1000;

export const userKeys = {
  all: ["users"] as const,
  current: () => [...userKeys.all, "current"] as const,
};

export function useUserProfile() {
  return useQuery({
    queryKey: userKeys.current(),
    queryFn: () => getCurrentUserProfile(),
    staleTime: STALE_TIME,
  });
}
