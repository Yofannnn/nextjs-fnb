import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/formatters/date.formatter";
import { OrderSummary } from "@/features/order/types/order.type";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatCurrencyToIDR } from "@/lib/formatters/currency.formatter";
import { OrderStatusChangeDropdown } from "@/features/order/components/shared/OrderStatusChangeDropdown";
import { OrderStatusBadge } from "@/features/order/components/shared/OrderStatusBadge";
import { useSession } from "@/stores/session.store";
import { UserRoleType } from "@/features/user/types/user.type";

export function OrderListItem({ order }: { order: OrderSummary }) {
  const route = useRouter();
  const user = useSession((state) => state.user);
  const url = user?.role === UserRoleType.MEMBER ? `/member/online-orders/${order.id}` : `/admin/online-orders/${order.id}`;

  return (
    <Card key={order.id} className="border shadow-sm overflow-hidden">
      <div className="px-4 py-3 bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/30 transition-colors">
        <div className="w-full flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-6 gap-y-2 text-sm overflow-hidden">
          <div className="w-full sm:w-fit truncate">
            <span className="text-muted-foreground">Order </span>
            <span className="font-medium">#{order.id}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Date placed </span>
            <span>{formatDate(order.createdAt, { dateStyle: "short" })}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Total </span>
            <span className="font-medium">{formatCurrencyToIDR(order.total)}</span>
          </div>
        </div>
        <div className="w-full sm:w-fit flex justify-between items-center gap-2 ml-auto sm:ml-0">
          <OrderStatusBadge status={order.status} />
          <Button variant="ghost" size="sm" className="h-8 px-3 text-xs gap-1 cursor-pointer" onClick={() => route.push(url)}>
            <Eye className="h-3.5 w-3.5" />
            View Order
          </Button>
          <OrderStatusChangeDropdown orderStatus={order.status} />
        </div>
      </div>
    </Card>
  );
}
