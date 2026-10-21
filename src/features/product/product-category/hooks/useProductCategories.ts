"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductCategoriesBrowse, getProductCategoryById } from "@/features/product/product-category/services/product-category.service";
import { BrowseProductCategoriesFilter, ProductCategoryStatus } from "@/features/product/product-category/types/product-category.type";
import { useMemo } from "react";

const STALE_TIME = 5 * 60 * 1000;

export const productCategoryKeys = {
  all: ["product-categories"] as const,
  detail: (id: string) => [...productCategoryKeys.all, "detail", id] as const,
  browse: (filter: BrowseProductCategoriesFilter) => [...productCategoryKeys.all, "browse", filter] as const,
};

export function useCategoryById(id: string) {
  return useQuery({
    queryKey: productCategoryKeys.detail(id),
    queryFn: () => getProductCategoryById(id),
    staleTime: STALE_TIME,
  });
}

export function useCategoriesQuery(filter: BrowseProductCategoriesFilter) {
  return useQuery({
    queryKey: productCategoryKeys.browse(filter),
    queryFn: () => getProductCategoriesBrowse(filter),
    staleTime: STALE_TIME,
  });
}

export function useCategoryOptions() {
  const { data, ...rest } = useCategoriesQuery({
    status: ProductCategoryStatus.ACTIVE,
  });

  const options = useMemo(
    () =>
      data?.map((category) => ({
        label: category.name,
        value: category.id,
      })) ?? [],
    [data],
  );

  return { options, ...rest };
}
