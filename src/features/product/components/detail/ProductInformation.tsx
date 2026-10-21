import { formatCurrencyToIDR } from "@/lib/formatters/currency.formatter";
import { ProductDetail } from "@/features/product/types/product.type";
import { ProductStatusBadge } from "@/features/product/components/shared/ProductStatusBadge";

interface ProductInformationProps {
  product: ProductDetail;
}

export function ProductInformation({ product }: ProductInformationProps) {
  return (
    <div className="w-full min-w-0 space-y-1.5 overflow-hidden md:pb-10">
      <h6 className="font-semibold">{product.category.name}</h6>
      <div className="flex flex-nowrap items-center">
        <h1 className="text-2xl truncate overflow-hidden">{product.name}</h1>
        <ProductStatusBadge status={product.status} className="ml-2" />
      </div>
      <h6>{formatCurrencyToIDR(product.price)}</h6>
      <h6>Estimated Time: {product.preparationTimeInMinutes} minutes</h6>
    </div>
  );
}
