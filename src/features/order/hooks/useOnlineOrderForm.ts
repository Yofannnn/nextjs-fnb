import { CheckoutSchema, CheckoutSchemaType } from "@/features/order/schemas/order.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useOnlineOrderForm() {
  return useForm<CheckoutSchemaType>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      guestName: undefined,
      guestEmail: undefined,
      deliveryType: undefined,
      deliveryAddress: undefined,
      deliveryLatitude: undefined,
      deliveryLongitude: undefined,
      scheduledAt: undefined,
    },
  });
}
