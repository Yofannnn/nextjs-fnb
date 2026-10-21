import { useQuery } from "@tanstack/react-query";
import { getPaymentById } from "@/features/payment/services/payment.service";

const STALE_TIME = 5 * 60 * 1000;

export const paymentKeys = {
  all: ["payments"] as const,
  detail: (id: string) => [...paymentKeys.all, "detail", id] as const,
};

export function usePaymentById({ orderId, paymentId, guestToken }: { orderId: string; paymentId: string; guestToken?: string }) {
  return useQuery({
    queryKey: paymentKeys.detail(paymentId),
    queryFn: () => getPaymentById({ orderId, paymentId, guestToken }),
    staleTime: STALE_TIME,
  });
}
