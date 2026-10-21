"use client";

import { useCallback, useMemo } from "react";
import { useCartStore } from "@/features/cart/stores/cart.store";
import { useCheckoutStore } from "@/features/order/stores/checkout.store";
import { ProductDetail, ProductStatus } from "@/features/product/types/product.type";
import { useProductsByIds } from "@/features/product/hooks/useProducts";

export function useCart() {
  const items = useCartStore((state) => state.items);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const getItemQuantity = useCartStore((state) => state.getItemQuantity);
  const productsCheckout = useCheckoutStore((state) => state.productsCheckout);
  const addProduct = useCheckoutStore((state) => state.addProduct);
  const removeProduct = useCheckoutStore((state) => state.removeProduct);
  const updateProductQuantity = useCheckoutStore((state) => state.updateProductQuantity);
  const isProductSelected = useCheckoutStore((state) => state.isProductSelected);

  const { data, ...productsQuery } = useProductsByIds(items.map((item) => item.productId));

  const cartItems = useMemo(() => {
    if (!data) return [];

    const productMap = new Map(data.products.map((p) => [p.id, p]));

    return items
      .map((item) => {
        const product = productMap.get(item.productId);
        if (!product) return null;
        return {
          ...product,
          quantity: product.stockQuantity < item.quantity ? product.stockQuantity : item.quantity,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [data, items]);

  const availableItems = useMemo(() => cartItems.filter((item) => item.status === ProductStatus.AVAILABLE), [cartItems]);

  const selectedProductIds = useMemo(() => new Set(productsCheckout.map((item) => item.productId)), [productsCheckout]);

  const selectedItems = useMemo(() => availableItems.filter((item) => selectedProductIds.has(item.id)), [availableItems, selectedProductIds]);

  const isAllAvailableItemChecked = availableItems.length > 0 && availableItems.every((item) => selectedProductIds.has(item.id));

  const handleIncrement = useCallback(
    (product: ProductDetail) => {
      const currentQuantity = getItemQuantity(product.id);
      if (currentQuantity >= product.stockQuantity) return;

      incrementItem(product.id);

      if (isProductSelected(product.id)) updateProductQuantity(product.id, currentQuantity + 1);
    },
    [getItemQuantity, incrementItem, isProductSelected, updateProductQuantity],
  );

  const handleDecrement = useCallback(
    (product: ProductDetail) => {
      const currentQuantity = getItemQuantity(product.id);
      if (currentQuantity <= 0) return;

      decrementItem(product.id);

      if (isProductSelected(product.id)) updateProductQuantity(product.id, currentQuantity - 1);
    },
    [getItemQuantity, decrementItem, isProductSelected, updateProductQuantity],
  );

  const handleRemove = useCallback(
    (productId: string) => {
      removeItem(productId);
      if (isProductSelected(productId)) removeProduct(productId);
    },
    [removeItem, isProductSelected, removeProduct],
  );

  const handleToggleProduct = useCallback(
    (productId: string, checked: boolean) => {
      const product = availableItems.find((item) => item.id === productId);
      if (!product) return;

      const isSelected = selectedProductIds.has(productId);

      if (!checked) {
        if (isSelected) removeProduct(productId);
        return;
      }

      if (isSelected) {
        updateProductQuantity(productId, product.quantity);
        return;
      }

      addProduct({
        productId: product.id,
        quantity: product.quantity,
      });
    },
    [availableItems, selectedProductIds, addProduct, removeProduct, updateProductQuantity],
  );

  const handleCheckAll = useCallback(
    (checked: boolean) => {
      if (!checked) {
        availableItems.forEach((item) => {
          removeProduct(item.id);
        });
        return;
      }

      availableItems.forEach((item) => {
        if (selectedProductIds.has(item.id)) {
          updateProductQuantity(item.id, item.quantity);
        } else {
          addProduct({
            productId: item.id,
            quantity: item.quantity,
          });
        }
      });
    },
    [availableItems, selectedProductIds, addProduct, removeProduct, updateProductQuantity],
  );

  return {
    ...productsQuery,
    cartItems,
    availableItems,
    selectedItems,
    isAllAvailableItemChecked,
    isProductSelected,
    handleIncrement,
    handleDecrement,
    handleRemove,
    handleToggleProduct,
    handleCheckAll,
    clearCart,
  };
}
