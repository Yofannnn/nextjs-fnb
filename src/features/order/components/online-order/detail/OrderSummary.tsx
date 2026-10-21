import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrencyToIDR } from "@/lib/formatters/currency.formatter";
import { DeliveryType, OrderPricing } from "@/features/order/types/order.type";

interface OrderSummaryProps {
  pricing: OrderPricing;
  deliveryType: DeliveryType;
}

export function OrderSummary({ pricing, deliveryType }: OrderSummaryProps) {
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <h3 className="font-semibold">Order Summary</h3>
      </CardHeader>
      <CardContent className="px-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Subtotal:</span>
          <span className="text-sm">{formatCurrencyToIDR(pricing.subtotal)}</span>
        </div>
        {deliveryType === DeliveryType.DELIVERY && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Delivery Fee:</span>
            <span className="text-sm">{formatCurrencyToIDR(pricing.deliveryFee)}</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Service Charge:</span>
          <span className="text-sm">{pricing.serviceCharge > 0 ? formatCurrencyToIDR(pricing.serviceCharge) : "-"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Tax:</span>
          <span className="text-sm">{formatCurrencyToIDR(pricing.tax)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Discount:</span>
          <span className="text-sm">{pricing.discount > 0 ? formatCurrencyToIDR(pricing.discount) : "-"}</span>
        </div>
        <Separator className="my-6 h-0.5" />
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">{formatCurrencyToIDR(pricing.total)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
