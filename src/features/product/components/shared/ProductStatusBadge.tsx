import { cn } from "@/lib/class-name.util";
import { ProductStatus } from "@/features/product/types/product.type";
import { formatProductStatus } from "@/features/product/utils/product.formatter";
import { Badge } from "@/components/ui/badge";

export function ProductStatusBadge({ status, className }: { status: ProductStatus; className?: string }) {
  return (
    <Badge
      className={cn(
        "text-xs",
        className,
        status === ProductStatus.UPCOMING && "text-yellow-50 bg-yellow-700 dark:text-yellow-950 dark:bg-yellow-300",
        status === ProductStatus.AVAILABLE && "text-green-50 bg-green-700 dark:text-green-950 dark:bg-green-300",
        status === ProductStatus.OUT_OF_STOCK && "text-orange-50 bg-orange-700 dark:text-orange-950 dark:bg-orange-300",
        status === ProductStatus.UNAVAILABLE && "text-red-50 bg-red-700 dark:text-red-950 dark:bg-red-300",
        status === ProductStatus.DISCONTINUED && "text-gray-50 bg-gray-700 dark:text-gray-950 dark:bg-gray-300",
      )}
    >
      {formatProductStatus(status)}
    </Badge>
  );
}
