import { apiRequest } from "@/lib/api-request";
import { generateFileName } from "@/lib/image-helpers";
import { CreateProductSchemaType } from "@/features/product/schemas/product.schema";
import { BrowseProductsFilter, ProductStatus } from "@/features/product/types/product.type";
import {
  CreateProductApiResponse,
  GetProductDetailByIdApiResponse,
  GetProductsByIdsApiResponse,
  GetProductsBrowseApiResponse,
  UpdateProductStatusApiResponse,
} from "@/features/product/types/product.dto";

export async function getProductById(id: string) {
  const response = await apiRequest<GetProductDetailByIdApiResponse>(`/products/${id}`);
  return response.data;
}

export async function getProductsByIds(ids: string[]) {
  const response = await apiRequest<GetProductsByIdsApiResponse>("/products/by-ids", {
    params: { id: ids },
  });
  return { products: response.data, notFoundIds: response.notFoundIds };
}

export async function getProductsBrowse(filter: BrowseProductsFilter, cursor?: string) {
  const response = await apiRequest<GetProductsBrowseApiResponse>("/products/browse", {
    params: { ...filter, cursor },
  });

  return {
    products: response.data,
    nextCursor: response.nextCursor,
  };
}

export async function createProduct(values: CreateProductSchemaType) {
  return await apiRequest<CreateProductApiResponse>("/products/", {
    method: "POST",
    credentials: "include",
    body: toProductFormData(values),
  });
}

export async function setProductStatus({ id, status }: { id: string; status: ProductStatus }) {
  return await apiRequest<UpdateProductStatusApiResponse>(`/products/${id}/status`, {
    headers: { "content-type": "application/json" },
    method: "PATCH",
    credentials: "include",
    body: JSON.stringify({ setStatus: status }),
  });
}

function toProductFormData(values: CreateProductSchemaType) {
  const formData = new FormData();

  formData.append("categoryId", values.categoryId);
  formData.append("type", values.type);
  formData.append("status", values.status);
  formData.append("name", values.name);
  formData.append("price", values.price.toString());
  if (values.description) formData.append("description", values.description);
  if (values.stockQuantity) formData.append("stockQuantity", values.stockQuantity.toString());
  if (values.ingredients) formData.append("ingredients", values.ingredients);
  if (values.preparationTimeInMinutes) formData.append("preparationTimeInMinutes", values.preparationTimeInMinutes.toString());

  for (const image of values.images) {
    formData.append("images", image.file, generateFileName(values.name, image.file.name));
  }

  return formData;
}
