import { apiRequest } from "@/lib/api-request";
import { CheckoutSchemaType } from "@/features/order/schemas/order.schema";
import { CreateOnlineOrderApiResponse, GetOrderQuoteApiResponse } from "@/features/order/types/order.dto";
import { DeliveryLocation } from "@/features/order/stores/delivery-location.store";

export interface OrderQuotePayload {
  items: Array<{ productId: string; quantity: number }>;
  deliveryCoordinate?: DeliveryLocation;
}

export async function getOrderQuote(payload: OrderQuotePayload) {
  const response = await apiRequest<GetOrderQuoteApiResponse>("/orders/online-orders/quotes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return response.data;
}

export function createOnlineOrder(values: CheckoutSchemaType, items: { productId: string; quantity: number }[]) {
  return apiRequest<CreateOnlineOrderApiResponse>("/orders/online-orders", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...values, items }),
  });
}
