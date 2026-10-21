"use client";

import { LoadingBar } from "@/components/ui/loader";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { useCart } from "@/features/cart/hooks/useCart";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CartItem } from "@/features/cart/components/CartItem";
import { useRouter } from "next/navigation";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { SummarySection } from "@/features/cart/components/SummarySection";

export default function CartPage() {
  const router = useRouter();
  const {
    cartItems,
    availableItems,
    isLoading,
    error,
    selectedItems,
    isAllAvailableItemChecked,
    isProductSelected,
    handleIncrement,
    handleDecrement,
    handleRemove,
    handleToggleProduct,
    handleCheckAll,
  } = useCart();

  const subtotal = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  if (isLoading) {
    return (
      <div className="w-full h-svh flex justify-center items-center p-4">
        <LoadingBar />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-svh flex justify-center items-center p-4">
        <ErrorAlert error={error} />
      </div>
    );
  }

  return (
    <div className="w-full pt-20">
      <div className="w-full grid grid-cols-5 px-2">
        <div className="col-span-5 md:col-span-3 px-1 md:px-4 mb-20 md:mb-4">
          <div>
            <div className="w-full flex justify-between items-center pb-4">
              <h1 className="text-2xl font-semibold">Cart</h1>
              <div className="flex items-center gap-2">
                <Label htmlFor="check-all">Checkout All</Label>
                <Checkbox id="check-all" onCheckedChange={(checked) => handleCheckAll(!!checked)} checked={isAllAvailableItemChecked} disabled={availableItems.length === 0} />
              </div>
            </div>

            <div>
              {cartItems.length === 0 ? (
                <div className="w-full h-svh flex justify-center items-center">
                  <h1 className="text-center text-2xl">Cart is Empty</h1>
                </div>
              ) : (
                cartItems.map(
                  (product) =>
                    product && (
                      <CartItem
                        key={product.id}
                        product={product}
                        isSelected={isProductSelected(product.id)}
                        onToggle={(checked) => handleToggleProduct(product.id, checked)}
                        onIncrement={() => handleIncrement(product)}
                        onDecrement={() => handleDecrement(product)}
                        onRemove={() => handleRemove(product.id)}
                      />
                    ),
                )
              )}
            </div>
          </div>
        </div>

        <div className="hidden md:block md:col-span-2 px-4">
          <div className="sticky top-20">
            <h1 className="text-2xl font-semibold mb-8">Summary</h1>
            <SummarySection subtotal={subtotal} total={total} onCheckout={() => router.push("/checkout")} isDisabledToCheckout={selectedItems.length === 0} />
          </div>
        </div>

        <div className="col-span-full px-2 py-4 bg-background fixed bottom-0 left-0 right-0 md:hidden">
          <Drawer>
            <DrawerTrigger render={<Button className="w-full">Summary</Button>} />
            <DrawerContent className="p-4">
              <DrawerHeader className="mb-4">
                <DrawerTitle className="text-2xl font-semibold">Summary</DrawerTitle>
                <DrawerDescription>Summary of your order</DrawerDescription>
              </DrawerHeader>
              <SummarySection subtotal={subtotal} total={total} onCheckout={() => router.push("/checkout")} isDisabledToCheckout={selectedItems.length === 0} />
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
