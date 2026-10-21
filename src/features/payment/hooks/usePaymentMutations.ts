import { useMutation, useQueryClient } from "@tanstack/react-query";
import { initiatePayment, payPayment } from "@/features/payment/services/payment.service";
import { paymentKeys } from "./usePayment";

export function useInitiatePayment() {
  return useMutation({
    mutationFn: initiatePayment,
  });
}

export function usePayPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payPayment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: paymentKeys.all }),
  });
}
