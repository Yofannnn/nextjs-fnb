"use client";

import { ProfileHeader } from "@/features/user/components/ProfileHeader";
import { LoyaltyCard } from "@/features/user/components/LoyaltyCard";
import { ProfileMenuList } from "@/features/user/components/ProfileMenuList";
import { AuthLogOutDialog } from "@/features/auth/components/AuthLogOutDialog";
import { useUserProfile } from "@/features/user/hooks/useUser";
import { LoadingBar } from "@/components/ui/loader";
import { ErrorAlert } from "@/components/shared/ErrorAlert";

export default function MemberProfilePage() {
  const { data, isLoading, error } = useUserProfile();

  if (isLoading) {
    return (
      <div className="w-full h-svh flex justify-center items-center p-4">
        <LoadingBar />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-svh flex justify-center items-center p-4">
        <ErrorAlert error={error} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-svh flex justify-center items-center p-4">
        <ErrorAlert error={error || new Error("User not found.")} />
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-muted font-sans">
      <ProfileHeader username={data.name} />
      <main className="max-w-2xl mx-auto px-4 py-5 pb-28 space-y-5">
        <LoyaltyCard points={0} tier="Bronze" reward={{ target: 1000, label: "Reward", description: "Description" }} />
        <ProfileMenuList />
        <AuthLogOutDialog />
      </main>
    </div>
  );
}
