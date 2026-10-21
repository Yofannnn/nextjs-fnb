"use client";

import { useInfiniteProducts } from "@/features/product/hooks/useProducts";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export function useProductManagement() {
  const { products, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteProducts({});

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return {
    products,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    loadMoreRef,
  };
}
