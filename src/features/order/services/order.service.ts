import { apiRequest } from "@/lib/api-request";
import { BrowseOrdersFilter, OrderType } from "@/features/order/types/order.type";
import { GetOrderByIdApiResponse, GetOrdersApiResponse, GuestRequestOrderAccessApiResponse } from "@/features/order/types/order.dto";
import { GuestRequestOrderAccessSchemaType } from "@/features/order/schemas/order.schema";

export async function getOrderById<T extends OrderType>(id: string, type: T, guestToken?: string) {
  const response = await apiRequest<GetOrderByIdApiResponse<T>>(`/orders/${id}`, { params: { guestToken } });

  if (response.data.type !== type) {
    throw new Error("Order type mismatch.");
  }

  return response.data;
}

export async function getOrdersBrowse(filter: BrowseOrdersFilter) {
  const response = await apiRequest<GetOrdersApiResponse>("/orders/browse", {
    params: { ...filter },
  });

  return response.data;
}

export function guestRequestOrderAccess(values: GuestRequestOrderAccessSchemaType) {
  return apiRequest<GuestRequestOrderAccessApiResponse>("/orders/guest-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
}
