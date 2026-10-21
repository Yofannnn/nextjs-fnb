"use client";

import { useParams } from "next/navigation";
import { useProductDetail } from "@/features/product/hooks/useProductDetail";
import { ProductImageGallery } from "@/features/product/components/detail/ProductImageGallery";
import { ProductInformation } from "@/features/product/components/detail/ProductInformation";
import { ProductDescription } from "@/features/product/components/detail/ProductDescription";
import { ProductQuantityActions } from "@/features/product/components/detail/ProductQuantityActions";
import { LoadingBar } from "@/components/ui/loader";
import { ErrorAlert } from "@/components/shared/ErrorAlert";

export default function ProductDetailPage() {
  const params = useParams<{ productId: string }>();
  const productId = params.productId;

  const { product, error, isLoading, quantity, incrementQuantity, decrementQuantity, addToCart, buyNow } = useProductDetail(productId);

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full h-svh">
        <LoadingBar />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center w-full h-svh">
        <ErrorAlert error={error} />
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center w-full h-svh">
        <ErrorAlert error={new Error("Product not found")} />
      </div>
    );

  return (
    <main className="grid w-full min-w-0 grid-cols-1 gap-4 overflow-hidden px-4 pb-28 pt-20 md:grid-cols-5 md:px-10 md:pb-10">
      <div className="col-span-5 md:col-span-3 p-2 flex justify-center items-center w-full">
        <ProductImageGallery images={product.images} productName={product.name} />
      </div>

      <div className="col-span-1 flex min-w-0 w-full flex-col justify-center p-2 md:col-span-2">
        <ProductInformation product={product} />
        <ProductQuantityActions quantity={quantity} onIncrement={incrementQuantity} onDecrement={decrementQuantity} onAddToCart={addToCart} onBuyNow={buyNow} />
      </div>

      <div className="col-span-5 p-2 space-y-4">
        <ProductDescription description={product.description} ingredients={product.ingredients} />
      </div>
    </main>
  );
}
