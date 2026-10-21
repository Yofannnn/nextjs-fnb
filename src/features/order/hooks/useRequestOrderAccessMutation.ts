"use client";

import { useMutation } from "@tanstack/react-query";
import { guestRequestOrderAccess } from "@/features/order/services/order.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useGuestRequestOrderAccess() {
  const router = useRouter();

  return useMutation({
    mutationFn: guestRequestOrderAccess,
    onSuccess: (result) => {
      toast(result.message || "Renew access success, please check your email.", { duration: 7000 });
      setTimeout(() => toast("Redirecting to home page...", { duration: 3000 }), 7000);
      setTimeout(() => router.push("/"), 10000);
    },
  });
}
