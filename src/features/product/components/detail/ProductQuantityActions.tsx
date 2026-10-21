import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, ShoppingCartPlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProductQuantityActionsProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export function ProductQuantityActions({ quantity, onIncrement, onDecrement, onAddToCart, onBuyNow }: ProductQuantityActionsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background lg:static grid grid-cols-3 gap-2 p-4 lg:p-0">
      <Separator className="col-span-3 h-px bg-muted-foreground mb-2 lg:hidden" />
      <div className="col-span-1 flex flex-row justify-center items-center border-2 border-foreground rounded-full overflow-hidden">
        <Button variant="ghost" onClick={onDecrement}>
          <MinusIcon />
        </Button>
        <h5 className="px-4">{quantity}</h5>
        <Button variant="ghost" onClick={onIncrement}>
          <PlusIcon />
        </Button>
      </div>
      <Button className="col-span-1" onClick={onAddToCart} disabled={quantity === 0}>
        <ShoppingCartPlusIcon /> Add to Cart
      </Button>
      <Button className="col-span-1" onClick={onBuyNow} disabled={quantity === 0}>
        Buy Now
      </Button>
    </div>
  );
}
