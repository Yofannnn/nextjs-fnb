"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { toastApiError } from "@/lib/toast-api-error";
import { createProductCategory } from "@/features/product/product-category/services/product-category.service";
import { productCategoryKeys } from "./useProductCategories";

export function useCreateProductCategory() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductCategory,
    onSuccess: (result) => {
      toast(result.message || "Category created successfully!", { duration: 4000 });
      queryClient.invalidateQueries({ queryKey: productCategoryKeys.all });
      router.back();
    },
    onError: (error) => {
      toastApiError(error, "Failed to create category.");
    },
  });
}
