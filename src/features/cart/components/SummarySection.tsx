import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { formatCurrencyToIDR } from "@/lib/formatters/currency.formatter";

interface SummarySectionProps {
  subtotal: number;
  total: number;
  onCheckout: () => void;
  isDisabledToCheckout: boolean;
}

export function SummarySection({ subtotal, total, onCheckout, isDisabledToCheckout }: SummarySectionProps) {
  return (
    <div className="leading-8">
      <div className="flex items-center justify-between">
        <span>Subtotal</span>
        <span>{formatCurrencyToIDR(subtotal)}</span>
      </div>

      <div className="flex items-center justify-between">
        <span>Discount</span>
        <span>-</span>
      </div>

      <div className="flex items-center justify-between">
        <span>Estimated Delivery & Handling</span>
        <span>-</span>
      </div>

      <Separator className="bg-foreground my-6 h-[0.5px]" />

      <div className="flex items-center justify-between">
        <span>Total</span>
        <span>{formatCurrencyToIDR(total)}</span>
      </div>
      <Separator className="bg-foreground my-6 h-[0.5px]" />

      <Button className="w-full rounded-full" onClick={onCheckout} disabled={isDisabledToCheckout}>
        Checkout
      </Button>
    </div>
  );
}
