import { formatCurrencyToIDR } from "@/lib/formatters/currency.formatter";

interface OnlineOrderSummaryProps {
  subtotal: number;
  tax: number;
  serviceCharge: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

export function OnlineOrderSummary({ subtotal, tax, serviceCharge, deliveryFee, discount, total }: OnlineOrderSummaryProps) {
  return (
    <div className="grid gap-1 text-sm md:text-base">
      <div className="flex justify-between items-center text-muted-foreground">
        <span>Subtotal</span>
        <span>{formatCurrencyToIDR(subtotal)}</span>
      </div>
      <div className="flex justify-between items-center text-muted-foreground">
        <span>Tax</span>
        <span>+ {formatCurrencyToIDR(tax)}</span>
      </div>
      <div className="flex justify-between items-center text-muted-foreground">
        <span>Handling</span>
        <span>+ {formatCurrencyToIDR(serviceCharge)}</span>
      </div>
      <div className="flex justify-between items-center text-muted-foreground">
        <span>Delivery/Shipping</span>
        <span>+ {formatCurrencyToIDR(deliveryFee)}</span>
      </div>
      <div className="flex justify-between items-center text-muted-foreground">
        <span>Discount</span>
        <span>- {formatCurrencyToIDR(discount)}</span>
      </div>
      <div className="flex justify-between items-center font-medium">
        <span>Total</span>
        <span>{formatCurrencyToIDR(total)}</span>
      </div>
    </div>
  );
}
