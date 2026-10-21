import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/formatters/date.formatter";
import { OnlineOrderDetail } from "@/features/order/types/order.type";

interface OrderInfoCardProps {
  order: OnlineOrderDetail;
}

export function OrderInfoCard({ order }: OrderInfoCardProps) {
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-4 flex flex-wrap flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <p className="font-semibold text-sm mb-1">Date Ordered</p>
          <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
        </div>
        <div>
          <p className="font-semibold text-sm mb-1">Order Number</p>
          <p className="text-sm text-muted-foreground">#{order.id}</p>
        </div>
      </CardContent>
    </Card>
  );
}
