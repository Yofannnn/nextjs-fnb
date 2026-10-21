"use client";

import { useProductFilters } from "./useProductFilters";
import { useCategoryOptions } from "@/features/product/product-category/hooks/useProductCategories";
import { useInfiniteProducts } from "./useProducts";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { ProductStatus } from "@/features/product/types/product.type";

export function useProductCatalog() {
  const { selectedCategory, setSelectedCategory, selectedSort, setSelectedSort, sortOptions } = useProductFilters();

  const { options: categoryOptions } = useCategoryOptions();

  const { products, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteProducts({
    categoryId: selectedCategory,
    sort: selectedSort,
    status: ProductStatus.AVAILABLE,
  });

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return {
    selectedCategory,
    selectedSort,
    categoryOptions,
    sortOptions,
    products,
    isLoading,
    error,
    isFetchingNextPage,
    hasNextPage,
    loadMoreRef,
    setSelectedCategory,
    setSelectedSort,
  };
}
