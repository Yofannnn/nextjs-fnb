"use client";

import { ProductSort } from "@/features/product/types/product.type";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard, ProductCardSkeleton } from "@/features/product/components/shared/ProductCard";
import { useProductCatalog } from "@/features/product/hooks/useProductCatalog";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { LoadingDot } from "@/components/ui/loader";

export default function MenusPage() {
  const { selectedCategory, setSelectedCategory, selectedSort, setSelectedSort, categoryOptions, sortOptions, products, isLoading, error, isFetchingNextPage, hasNextPage, loadMoreRef } =
    useProductCatalog();

  return (
    <div className="w-full px-4 md:px-8 pt-20">
      <div className="w-full bg-card px-4 py-24 rounded-lg">
        <h1 className="text-xl md:text-3xl font-bold text-center leading-10 md:leading-12">
          Shop environment <br /> friendly quality goods
        </h1>
      </div>
      <div className="my-7 flex justify-between items-center gap-4 px-0 md:px-10">
        <div className="hidden md:block w-full overflow-x-auto">
          <Tabs value={selectedCategory ?? "all"} onValueChange={(e) => setSelectedCategory(e === "all" ? undefined : e)}>
            <TabsList variant="line">
              <TabsTrigger className="text-sm md:text-base font-normal" value="all">
                All
              </TabsTrigger>
              {categoryOptions.map((category) => (
                <TabsTrigger className="text-sm md:text-base font-normal" key={category.value} value={category.value}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <Select items={categoryOptions} value={selectedCategory ?? "all"} onValueChange={(value) => setSelectedCategory(value === "all" ? undefined : value || undefined)}>
          <SelectTrigger className="w-fit md:hidden">
            <SelectValue>{selectedCategory ? categoryOptions.find((item) => item.value === selectedCategory)?.label : "All"}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All</SelectItem>
              {categoryOptions.length ? (
                categoryOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="loading" disabled>
                  Loading...
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select items={sortOptions} value={selectedSort ?? "Sort by"} onValueChange={(value) => setSelectedSort(value === "Sort by" ? undefined : (value as ProductSort))}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {sortOptions.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 md:gap-2 px-0 md:px-10 pb-8">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => <ProductCardSkeleton key={index} />)
        ) : error ? (
          <div className="col-span-full flex justify-center px-4 py-20">
            <ErrorAlert error={error} />
          </div>
        ) : (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        )}

        {hasNextPage && (
          <div ref={loadMoreRef} className="col-span-full flex justify-center py-8">
            {isFetchingNextPage && <LoadingDot />}
          </div>
        )}
      </div>
    </div>
  );
}
