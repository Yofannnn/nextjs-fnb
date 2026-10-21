import { apiRequest } from "@/lib/api-request";
import { generateFileName } from "@/lib/image-helpers";
import { CreateProductCategorySchemaType } from "@/features/product/product-category/schemas/product-category.schema";
import { BrowseProductCategoriesFilter } from "@/features/product/product-category/types/product-category.type";
import { CreateProductCategoryApiResponse, GetProductCategoriesQueryApiResponse, GetProductCategoryByIdApiResponse } from "@/features/product/product-category/types/product-category.dto";

export async function getProductCategoryById(id: string) {
  const response = await apiRequest<GetProductCategoryByIdApiResponse>(`/product-categories/${id}`);
  return response.data;
}

export async function getProductCategoriesBrowse(filter: BrowseProductCategoriesFilter) {
  const response = await apiRequest<GetProductCategoriesQueryApiResponse>("/product-categories/browse", {
    params: { ...filter },
  });
  return response.data;
}

export async function createProductCategory(values: CreateProductCategorySchemaType) {
  return await apiRequest<CreateProductCategoryApiResponse>("/product-categories/", {
    method: "POST",
    body: toProductCategoryFormData(values),
  });
}

function toProductCategoryFormData(values: CreateProductCategorySchemaType) {
  const formData = new FormData();

  formData.append("name", values.name);
  if (values.description) formData.append("description", values.description);
  if (values.image?.file) {
    formData.append("image", values.image.file, generateFileName(values.name, values.image.file.name));
  }

  return formData;
}
