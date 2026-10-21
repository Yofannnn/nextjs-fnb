import { DeliveryType } from "@/features/order/types/order.type";
import z from "zod";

export const CheckoutSchema = z.object({
  guestEmail: z.email().optional(),
  guestName: z.string().trim().min(1).optional(),
  deliveryType: z.enum(Object.values(DeliveryType), { error: "Please select a delivery type." }),
  deliveryAddress: z.string().trim().min(1).optional(),
  deliveryLatitude: z.coerce.number().min(-90).max(90).optional() as z.ZodOptional<z.ZodCoercedNumber<number>>,
  deliveryLongitude: z.coerce.number().min(-180).max(180).optional() as z.ZodOptional<z.ZodCoercedNumber<number>>,
  scheduledAt: z
    .string()
    .min(1, { message: "Delivery date is required" })
    .refine(
      (val) => {
        const date = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      },
      { message: "Delivery date must be today or in the future" },
    )
    .optional(),
});

export const GuestRequestOrderAccessSchema = z.object({
  orderId: z.uuid({ error: "Invalid order ID, please enter a valid order ID." }),
  email: z.email(),
});

export type CheckoutSchemaType = z.infer<typeof CheckoutSchema>;
export type GuestRequestOrderAccessSchemaType = z.infer<typeof GuestRequestOrderAccessSchema>;
