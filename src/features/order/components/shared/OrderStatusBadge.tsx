import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/features/order/types/order.type";
import { formatOrderStatus } from "@/features/order/utils/order.formatter";
import { cn } from "@/lib/class-name.util";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs",
        status === OrderStatus.CONFIRMED || status === OrderStatus.PREPARING || status === OrderStatus.READY || status === OrderStatus.COMPLETED
          ? "text-green-50 bg-green-700 dark:text-green-950 dark:bg-green-300"
          : status === OrderStatus.PENDING
            ? "text-yellow-50 bg-yellow-700 dark:text-yellow-950 dark:bg-yellow-300"
            : "text-red-50 bg-red-700 dark:text-red-950 dark:bg-red-300",
      )}
    >
      {formatOrderStatus(status)}
    </Badge>
  );
}
