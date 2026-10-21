import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OrderStatusStepper } from "./OrderStatusStepper";
import { OrderItem } from "./OrderItem";
import { OnlineOrderDetail } from "@/features/order/types/order.type";

interface OrderTrackingCardProps {
  order: OnlineOrderDetail;
}

export function OrderTrackingCard({ order }: OrderTrackingCardProps) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="border-b md:px-4 py-4">
        <OrderStatusStepper orderId={order.id} orderStatus={order.status} deliveryType={order.fulfillment.deliveryType} />
      </CardHeader>
      <CardContent className="md:px-4 py-4 space-y-4">
        {order.items.map((item) => (
          <OrderItem key={item.productId} item={item} />
        ))}
      </CardContent>
    </Card>
  );
}
