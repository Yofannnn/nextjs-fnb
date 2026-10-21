import Image from "next/image";
import { ProductStatus, ProductDetail } from "@/features/product/types/product.type";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import { cn } from "@/lib/class-name.util";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatCurrencyToIDR } from "@/lib/formatters/currency.formatter";
import { formatProductStatus } from "@/features/product/utils/product.formatter";

interface CartItemProps {
  product: ProductDetail & { quantity: number };
  isSelected: boolean;
  onToggle: (checked: boolean) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export function CartItem({ product, isSelected, onToggle, onIncrement, onDecrement, onRemove }: CartItemProps) {
  return (
    <div className={cn("flex outline-1 outline-white px-3 py-8 rounded-2xl my-3 relative", isSelected && "bg-card", product.status !== ProductStatus.AVAILABLE && "bg-muted")}>
      {product.status !== ProductStatus.AVAILABLE && (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center">
          <p className="text-orange-500 text-sm text-center py-3">Product is {formatProductStatus(product.status)}</p>
        </div>
      )}

      <div className="pr-2 md:pr-4">
        <Checkbox className="size-4 md:size-5" onCheckedChange={(e) => onToggle(!!e)} checked={isSelected} disabled={product.status !== ProductStatus.AVAILABLE} />
      </div>

      <div className="max-w-min">
        <Image className="w-full object-cover aspect-square pointer-events-none" src={product.images[0].url} width={100} height={100} alt={product.name} priority />
        <div className="flex items-center border border-foreground rounded-full gap-2">
          <Button className="rounded-full p-2 md:p-4" variant="ghost" onClick={onDecrement} disabled={product.status !== ProductStatus.AVAILABLE || product.quantity === 1} size="sm">
            <MinusIcon className="size-3 md:size-4" />
          </Button>
          <h6 className="text-sm md:text-base min-w-5 text-center">{product.quantity}</h6>
          <Button className="rounded-full p-2 md:p-4" variant="ghost" onClick={onIncrement} disabled={product.status !== ProductStatus.AVAILABLE} size="sm">
            <PlusIcon className="size-3 md:size-4" />
          </Button>
        </div>
      </div>

      <div className="w-full pl-4 text-nowrap truncate">
        <h2 className="text-base md:text-xl font-medium">{product.name}</h2>
        <h6 className="text-sm md:text-base mt-2">{formatCurrencyToIDR(product.price)}</h6>
      </div>

      <div className="relative">
        <h6 className="text-sm md:text-base absolute top-0 right-0">{formatCurrencyToIDR(product.price * (product.quantity || 0))}</h6>
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button className="absolute bottom-0 right-0 rounded-full p-3" variant="ghost" size="sm">
                <Trash2 className="size-4" />
              </Button>
            }
          ></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle />
              <AlertDialogDescription>Wanna remove {product.name} from cart?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onRemove}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
