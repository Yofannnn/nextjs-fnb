"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProductSchema, CreateProductSchemaType } from "@/features/product/schemas/product.schema";

export function useProductForm() {
  return useForm<CreateProductSchemaType>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      categoryId: undefined,
      type: undefined,
      status: undefined,
      name: "",
      price: undefined,
      stockQuantity: undefined,
      ingredients: "",
      description: "",
      preparationTimeInMinutes: undefined,
      images: [],
    },
  });
}
