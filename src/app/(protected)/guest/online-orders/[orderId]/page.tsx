"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useOrderById } from "@/features/order/hooks/useOrder";
import { OrderType } from "@/features/order/types/order.type";
import { OnlineOrderDetailView } from "@/features/order/components/online-order/detail/OnlineOrderDetailView";
import { ApiError } from "@/lib/api-error";
import { GuestOrderAccessExpiredDialog } from "@/features/order/components/guest/GuestOrderAccessExpiredDialog";

export default function GuestOnlineOrderDetailPage() {
  const params = useParams<{ orderId: string }>();
  const orderId = params.orderId;
  const searchParams = useSearchParams();
  const guestToken = searchParams.get("guestToken");
  const router = useRouter();
  const query = useOrderById(orderId, OrderType.ONLINE, guestToken ?? undefined);
  const [isGuestTokenExpired, setIsGuestTokenExpired] = useState(false);

  useEffect(() => {
    if (query.error && ApiError.isApiError(query.error) && query.error.message.includes("expired")) {
      const timeoutId = setTimeout(() => setIsGuestTokenExpired(true), 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [orderId, query.error, router]);

  return (
    <>
      <OnlineOrderDetailView query={query} />
      <GuestOrderAccessExpiredDialog open={isGuestTokenExpired} />
    </>
  );
}
