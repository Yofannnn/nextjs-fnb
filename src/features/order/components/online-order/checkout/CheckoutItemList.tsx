import { ProductDetail } from "@/features/product/types/product.type";
import { CheckoutItem } from "./CheckoutItem";

interface CheckoutItemListProps {
  checkoutItems: Array<ProductDetail & { quantity: number }>;
}

export function CheckoutItemList({ checkoutItems }: CheckoutItemListProps) {
  return (
    <div>
      {checkoutItems.map((product, i) => (
        <CheckoutItem key={i} item={product} />
      ))}
    </div>
  );
}
