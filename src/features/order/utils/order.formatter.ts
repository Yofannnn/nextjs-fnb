import { OrderStatus } from "@/features/order/types/order.type";

export function formatOrderStatus(status: OrderStatus): string {
  return status.charAt(0) + status.slice(1).toLowerCase();
}
