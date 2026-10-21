import { ProductSort, ProductType } from "@/features/product/types/product.type";

export function formatProductSort(sort: ProductSort): string {
  return sort
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatProductStatus(status: string): string {
  return status
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatProductType(type: ProductType): string {
  return type.charAt(0) + type.slice(1).toLowerCase();
}
