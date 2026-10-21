import Link from "next/link";
import { ProductSummary } from "@/features/product/types/product.type";
import Image from "next/image";
import { formatCurrencyToIDR } from "@/lib/formatters/currency.formatter";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/class-name.util";

interface ProductCardProps {
  product: ProductSummary;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link href={`/menu/${product.id}`} prefetch className={cn("h-fit p-2 md:p-3 rounded-lg border border-transparent hover:border-primary transition-colors", className)}>
      <div className="rounded-md overflow-hidden size-full">
        <Image src={product.primaryImageUrl} alt={product.name} width={100} height={100} className="w-full h-50 lg:h-75 object-cover object-center" />
      </div>

      <h3 className="text-base md:text-lg lg:text-xl font-semibold text-nowrap truncate mt-3 md:mt-5">{product.name}</h3>

      <div className="flex justify-between items-center gap-4 mt-2">
        <h6 className="text-sm md:text-base text-nowrap truncate text-semibold">{formatCurrencyToIDR(product.price)}</h6>
      </div>
    </Link>
  );
}

interface ProductCardSkeletonProps {
  className?: string;
}

export function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div className={cn("h-fit p-2 md:p-3 rounded-lg border border-transparent", className)}>
      <Skeleton className="w-full h-50 lg:h-75 rounded-md" />
      <Skeleton className="h-5 md:h-6 lg:h-7 w-3/4 rounded-md mt-3 md:mt-5" />
      <div className="flex justify-between items-center gap-4 mt-2">
        <Skeleton className="h-4 md:h-5 w-24 rounded-md" />
      </div>
    </div>
  );
}
