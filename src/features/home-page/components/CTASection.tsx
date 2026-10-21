"use client";

import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import { GradualSpacing } from "@/components/ui/gradual-spacing";
import { useProductsBrowse } from "@/features/product/hooks/useProducts";
import { ProductStatus } from "@/features/product/types/product.type";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { ProductCard, ProductCardSkeleton } from "@/features/product/components/shared/ProductCard";

export function CTASection() {
  const { data, isLoading, error } = useProductsBrowse({ status: ProductStatus.AVAILABLE, limit: 5 });
  const products = data?.pages.flatMap((page) => page.products) ?? [];

  return (
    <div className="px-4 md:px-12 py-14">
      <div className="flex gap-7 flex-col md:flex-row items-center md:items-end mb-12">
        <div>
          <GradualSpacing className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter w-full" text="Best Product" />
        </div>
        <BlurFade delay={0.2} blur="0px">
          <Link
            href="/menu"
            className="inline-block px-8 py-1 md:px-9 md:py-1.5 lg:px-10 lg:py-2 rounded-full font-semibold border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-all duration-500"
          >
            Shop
          </Link>
        </BlurFade>
      </div>
      <div className="flex gap-3 md:gap-4 overflow-x-auto p-2 md:p-3">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => <ProductCardSkeleton key={index} className="w-52 md:w-62.5 rounded-[30px] relative border-2 shrink-0 grow-0" />)
        ) : error ? (
          <div className="w-full flex justify-center px-4 py-20">
            <ErrorAlert error={error} />
          </div>
        ) : (
          products.map((product) => <ProductCard key={product.id} product={product} className="w-52 md:w-62.5 rounded-[30px] relative border-2 shrink-0 grow-0" />)
        )}
      </div>
    </div>
  );
}
