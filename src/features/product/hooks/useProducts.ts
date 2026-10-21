import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getProductById, getProductsBrowse, getProductsByIds } from "@/features/product/services/product.service";
import { BrowseProductsFilter, ProductSort, ProductStatus } from "@/features/product/types/product.type";
import { useMemo } from "react";

const STALE_TIME = 5 * 60 * 1000;

export const productKeys = {
  all: ["products"] as const,
  detail: (id: string) => [...productKeys.all, "detail", id] as const,
  byIds: (ids: string[]) => [...productKeys.all, "by-ids", ids] as const,
  browse: (filter: BrowseProductsFilter) => [...productKeys.all, "browse", filter] as const,
};

export function useProductById(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
    staleTime: STALE_TIME,
  });
}

export function useProductsByIds(ids: string[]) {
  return useQuery({
    queryKey: productKeys.byIds(ids),
    queryFn: () => (ids.length !== 0 ? getProductsByIds(ids) : Promise.resolve({ products: [], notFoundIds: [] })),
    staleTime: STALE_TIME,
  });
}

export function useProductsBrowse(filter: BrowseProductsFilter) {
  return useInfiniteQuery({
    queryKey: productKeys.browse(filter),
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam }) => getProductsBrowse(filter, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: STALE_TIME,
  });
}

interface InfiniteProductsParams {
  categoryId?: string;
  sort?: ProductSort;
  status?: ProductStatus;
}

export function useInfiniteProducts({ categoryId, sort, status }: InfiniteProductsParams) {
  const query = useProductsBrowse({
    categoryId,
    sort,
    status,
  });

  const products = useMemo(() => query.data?.pages.flatMap((page) => page.products) ?? [], [query.data]);

  return { ...query, products };
}
