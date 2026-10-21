"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductCategorySchema, CreateProductCategorySchemaType } from "@/features/product/product-category/schemas/product-category.schema";

export function useProductCategoryForm() {
  return useForm<CreateProductCategorySchemaType>({
    resolver: zodResolver(CreateProductCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      image: undefined,
    },
  });
}
