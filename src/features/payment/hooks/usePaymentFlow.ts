"use client";

import { useInitiatePayment, usePayPayment } from "@/features/payment/hooks/usePaymentMutations";
import { useCallback, useEffect, useRef } from "react";
import { useSession } from "@/stores/session.store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function usePaymentFlow({ orderId, snapLoaded, guestToken }: { orderId: string; snapLoaded: boolean; guestToken?: string }) {
  const router = useRouter();
  const accessToken = useSession((state) => state.accessToken);
  const isAuth = accessToken !== null;
  const redirectUrl = isAuth ? `/member/online-orders/${orderId}` : `/guest/online-orders/${orderId}?guestToken=${guestToken}`;

  const { mutate: initiate, error: errorInitiating, isPending: isInitiating } = useInitiatePayment();
  const { mutate: pay, error: errorPaying, isPending: isPaying } = usePayPayment();

  const hasStarted = useRef(false);

  const startPayment = useCallback(() => {
    if (!orderId || !snapLoaded || hasStarted.current) return;

    hasStarted.current = true;

    initiate(
      { orderId, guestToken },
      {
        onSuccess: ({ data }) => {
          const { id, snapToken } = data;

          window.snap.pay(snapToken, {
            onSuccess: () => pay({ paymentId: id }, { onSuccess: () => router.push(redirectUrl) }),
            onClose: () => router.push(redirectUrl),
            onError: () => toast.error("Failed to process payment. Please try again."),
          });
        },
        onError: () => toast.error("Failed to initiate payment. Please try again."),
      },
    );
  }, [orderId, snapLoaded, initiate, guestToken, pay, router, redirectUrl]);

  useEffect(() => {
    startPayment();
  }, [startPayment]);

  return {
    isInitiating,
    isPaying,
    errorInitiating,
    errorPaying,
  };
}
