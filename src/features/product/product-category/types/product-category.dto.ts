import { ProductCategoryDetail, ProductCategorySummary } from "@/features/product/product-category/types/product-category.type";
import { ApiResponse, ApiResponseNoData } from "@/lib/types/api-response.type";

export type CreateProductCategoryApiResponse = ApiResponse<{ id: string }>;
export type UpdateProductCategoryApiResponse = ApiResponse<{ id: string }>;
export type ReorderProductCategoryApiResponse = ApiResponseNoData;
export type GetProductCategoryByIdApiResponse = ApiResponse<ProductCategoryDetail>;
export type GetProductCategoriesQueryApiResponse = ApiResponse<ProductCategorySummary[]>;
