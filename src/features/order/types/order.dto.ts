import { DineInOrderDetail, OnlineOrderDetail, OrderPricing, OrderSummary, OrderType, ReservationOrderDetail } from "@/features/order/types/order.type";
import { ApiResponse, ApiResponseNoData } from "@/lib/types/api-response.type";

type OrderDataMap = {
  [OrderType.ONLINE]: OnlineOrderDetail;
  [OrderType.RESERVATION]: ReservationOrderDetail;
  [OrderType.DINEIN]: DineInOrderDetail;
};

export type GetOrderByIdApiResponse<T extends OrderType> = ApiResponse<OrderDataMap[T]>;
export type GetOrdersApiResponse = ApiResponse<OrderSummary[]>;
export type GetOrderQuoteApiResponse = ApiResponse<OrderPricing>;
export type CreateOnlineOrderApiResponse = ApiResponse<{ id: string }>;

export type GuestRequestOrderAccessApiResponse = ApiResponseNoData;
