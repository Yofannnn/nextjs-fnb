import { useQuery } from "@tanstack/react-query";
import { BrowseOrdersFilter, OrderType } from "@/features/order/types/order.type";
import { getOrderById, getOrdersBrowse } from "@/features/order/services/order.service";

const STALE_TIME = 5 * 60 * 1000;

export const orderKeys = {
  all: ["orders"] as const,
  detail: (id: string, type: OrderType) => [...orderKeys.all, "detail", id, type] as const,
  browse: (filter: BrowseOrdersFilter) => [...orderKeys.all, "browse", filter] as const,
};

export function useOrderById<T extends OrderType>(id: string, type: T, guestToken?: string) {
  return useQuery({
    queryKey: orderKeys.detail(id, type),
    queryFn: () => getOrderById(id, type, guestToken),
    staleTime: STALE_TIME,
  });
}

export function useOrdersQuery(filter: BrowseOrdersFilter) {
  return useQuery({
    queryKey: orderKeys.browse(filter),
    queryFn: () => getOrdersBrowse(filter),
    staleTime: STALE_TIME,
  });
}
