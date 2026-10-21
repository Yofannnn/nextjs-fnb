import { formatCurrencyToIDR } from "@/lib/formatters/currency.formatter";
import { OrderItemDetail } from "@/features/order/types/order.type";
import Image from "next/image";

interface OrderItemProps {
  item: OrderItemDetail;
}

export function OrderItem({ item }: OrderItemProps) {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-between gap-4">
        <Image src={item.imageUrl || ""} className="h-32 w-auto aspect-square object-cover rounded-md" width={250} height={250} alt={item.productId} />

        <div className="min-w-0 flex-1 text-end">
          <h4 className="text-lg font-semibold">{item.productName}</h4>
          <p className="text-sm text-muted-foreground mt-2">x {item.quantity}</p>
          <p className="text-sm mt-8">{formatCurrencyToIDR(item.priceSnapshot * item.quantity)}</p>
        </div>
      </div>
      {item.note && (
        <div className="text-xs md:text-sm text-muted-foreground mt-2.5">
          <p className="mb-0.5">Note:</p>
          <p>{item.note}</p>
        </div>
      )}
    </div>
  );
}
