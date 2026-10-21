"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { toastApiError } from "@/lib/toast-api-error";
import { createProduct, setProductStatus } from "@/features/product/services/product.service";
import { productKeys } from "./useProducts";

export function useCreateProduct() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (result) => {
      toast(result.message || "Product created successfully!", { duration: 4000 });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      router.back();
    },
    onError: (error) => {
      toastApiError(error, "Failed to create product.");
    },
  });
}

export function useSetProductStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setProductStatus,
    onSuccess: (result) => {
      toast(result.message || "Product status updated successfully!", { duration: 4000 });
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
    onError: (error) => {
      toastApiError(error, "Failed to update product status.");
    },
  });
}
