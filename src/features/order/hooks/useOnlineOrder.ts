import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useCheckoutStore } from "@/features/order/stores/checkout.store";
import { useDeliveryLocationStore } from "@/features/order/stores/delivery-location.store";
import { getOrderQuote, OrderQuotePayload } from "@/features/order/services/online-order.service";
import { useProductsByIds } from "@/features/product/hooks/useProducts";
import { orderKeys } from "./useOrder";

export function useOnlineOrderItems() {
  const { productsCheckout } = useCheckoutStore();
  const productsQuery = useProductsByIds(productsCheckout.map((item) => item.productId));
  const data = productsQuery.data;

  const checkoutItems = useMemo(() => {
    if (!data) return [];

    const productMap = new Map(data.products.map((p) => [p.id, p]));

    return productsCheckout
      .map((item) => {
        const product = productMap.get(item.productId);
        if (!product) return null;

        return {
          ...product,
          quantity: product.stockQuantity < item.quantity ? product.stockQuantity : item.quantity,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [data, productsCheckout]);

  return {
    ...productsQuery,
    data: { products: checkoutItems, notFoundIds: productsQuery.data?.notFoundIds },
  };
}

export function useOnlineOrderQuote() {
  const productsCheckout = useCheckoutStore((state) => state.productsCheckout);
  const deliveryLocation = useDeliveryLocationStore((state) => state.deliveryLocation);

  const requestPayload = useMemo<OrderQuotePayload>(
    () => ({
      items: productsCheckout,
      deliveryCoordinate: deliveryLocation,
    }),
    [productsCheckout, deliveryLocation],
  );

  const debouncedRequest = useDebouncedValue(requestPayload, 400);

  return useQuery({
    queryKey: [orderKeys.all, "quote", debouncedRequest],
    queryFn: () => getOrderQuote(debouncedRequest),
    enabled: debouncedRequest.items.length > 0,
    staleTime: 0,
  });
}
