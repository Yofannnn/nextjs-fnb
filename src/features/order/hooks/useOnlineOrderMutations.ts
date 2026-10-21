import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckoutSchemaType } from "@/features/order/schemas/order.schema";
import { useCheckoutStore } from "@/features/order/stores/checkout.store";
import { useSession } from "@/stores/session.store";
import { createOnlineOrder } from "@/features/order/services/online-order.service";
import { orderKeys } from "./useOrder";

export function useCreateOnlineOrder() {
  const router = useRouter();
  const { accessToken } = useSession();
  const isAuthenticated = !!accessToken;
  const { productsCheckout } = useCheckoutStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: CheckoutSchemaType) => createOnlineOrder(values, productsCheckout),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      if (isAuthenticated) {
        router.push(`checkout/pay/${result.data.id}`);
      } else {
        toast("Order success, please check your email to complete the payment", { duration: 7000 });
      }
    },
  });
}
