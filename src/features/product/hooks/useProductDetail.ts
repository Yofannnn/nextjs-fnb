"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useProductById } from "@/features/product/hooks/useProducts";
import { useCartStore } from "@/features/cart/stores/cart.store";
import { useCheckoutStore } from "@/features/order/stores/checkout.store";

export function useProductDetail(productId: string) {
  const router = useRouter();

  const { data: product, error, isLoading } = useProductById(productId);

  const [quantity, setQuantity] = useState(0);

  const { addItem, getItemQuantity } = useCartStore((state) => state);
  const { addProduct } = useCheckoutStore((state) => state);

  const incrementQuantity = () => {
    if (!product) return;

    setQuantity((prev) => Math.min(prev + 1, product.stockQuantity));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 0));
  };

  const addToCart = () => {
    if (!product || quantity === 0) return;

    const quantityInCart = getItemQuantity(product.id);
    const totalQuantity = quantityInCart + quantity;

    if (totalQuantity > product.stockQuantity) {
      toast.error(`You can't add more than ${product.stockQuantity} of ${product.name} to your cart`);
      return;
    }

    addItem(product.id, quantity);

    toast.success("Added to cart!", {
      description: `${product.name} has been added to your cart`,
      duration: 2000,
    });
  };

  const buyNow = () => {
    if (!product || quantity === 0) return;

    addProduct({
      productId: product.id,
      quantity,
    });

    router.push("/checkout");
  };

  return {
    product,
    error,
    isLoading,
    quantity,
    incrementQuantity,
    decrementQuantity,
    addToCart,
    buyNow,
  };
}
