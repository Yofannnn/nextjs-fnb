import { ProductSummary, ProductDetail } from "@/features/product/types/product.type";
import { ApiResponse } from "@/lib/types/api-response.type";

export type CreateProductApiResponse = ApiResponse<{ id: string }>;
export type UpdateProductApiResponse = ApiResponse<{ id: string }>;
export type UpdateProductStatusApiResponse = ApiResponse<{ id: string }>;
export type UpdateProductStockApiResponse = ApiResponse<{ id: string }>;
export type UpdateProductImageApiResponse = ApiResponse<{ id: string }>;
export type GetProductDetailByIdApiResponse = ApiResponse<ProductDetail>;

export interface GetProductsBrowseApiResponse extends ApiResponse<ProductSummary[]> {
  nextCursor: string | null;
}

export interface GetProductsByIdsApiResponse extends ApiResponse<ProductDetail[]> {
  notFoundIds: string[];
}

export interface SearchProductsApiResponse extends ApiResponse<ProductSummary[]> {
  total: number;
  didYouMean?: string;
}
