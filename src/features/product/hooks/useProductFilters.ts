"use client";

import { useMemo, useState } from "react";
import { ProductSort } from "@/features/product/types/product.type";
import { formatProductSort } from "@/features/product/utils/product.formatter";

export function useProductFilters() {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedSort, setSelectedSort] = useState<ProductSort>();

  const sortOptions = useMemo(
    () =>
      Object.values(ProductSort).map((value) => ({
        label: formatProductSort(value),
        value,
      })),
    [],
  );

  const clearCategory = () => setSelectedCategory(undefined);
  const clearSort = () => setSelectedSort(undefined);

  return {
    selectedCategory,
    setSelectedCategory,
    selectedSort,
    setSelectedSort,
    sortOptions,
    clearCategory,
    clearSort,
  };
}
