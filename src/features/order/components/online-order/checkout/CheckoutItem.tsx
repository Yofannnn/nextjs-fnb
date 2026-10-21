import { formatCurrencyToIDR } from "@/lib/formatters/currency.formatter";
import { ProductDetail } from "@/features/product/types/product.type";
import Image from "next/image";
import { formatProductType } from "@/features/product/utils/product.formatter";

interface CheckoutItemProps {
  item: ProductDetail & { quantity: number };
}

export function CheckoutItem({ item }: CheckoutItemProps) {
  return (
    <div className="flex gap-4 py-2">
      <div className="w-[30%] md:w-fit">
        <Image src={item.images[0].url} alt={item.name} width={100} height={100} className="w-full object-cover aspect-square pointer-events-none" />
      </div>
      <div className="w-full">
        <h4 className="font-medium text-base md:text-lg lg:text-xl">{item.name}</h4>
        <h6 className="text-muted-foreground text-xs md:text-sm lg:text-base">{formatProductType(item.type)}</h6>
        <h6 className="text-sm md:text-base">{formatCurrencyToIDR(item.price)}</h6>
        <div className="flex justify-between items-center text-sm md:text-base mt-2">
          <span>Quantity: {item.quantity}</span>
          <span>{formatCurrencyToIDR(item.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  );
}
