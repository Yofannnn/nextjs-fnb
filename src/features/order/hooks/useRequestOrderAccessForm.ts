import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GuestRequestOrderAccessSchema, GuestRequestOrderAccessSchemaType } from "@/features/order/schemas/order.schema";

export function useGuestRequestOrderAccessForm() {
  return useForm<GuestRequestOrderAccessSchemaType>({
    resolver: zodResolver(GuestRequestOrderAccessSchema),
    defaultValues: {
      email: "",
      orderId: "",
    },
  });
}
