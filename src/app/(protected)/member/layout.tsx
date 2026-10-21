"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/stores/session.store";
import { UserRoleType } from "@/features/user/types/user.type";

export default function MemberDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useSession((s) => s.user);
  const hasHydrated = useSession((s) => s._hasHydrated);
  const isAuthorized = user?.role === UserRoleType.MEMBER;

  useEffect(() => {
    if (!hasHydrated) return;
    if (!isAuthorized) router.replace("/");
  }, [hasHydrated, isAuthorized, router]);

  if (!hasHydrated || !isAuthorized) return null;

  return <>{children}</>;
}
