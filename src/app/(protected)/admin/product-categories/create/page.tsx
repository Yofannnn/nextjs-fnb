"use client";

import { Form } from "@/components/ui/form";
import { useProductCategoryForm } from "@/features/product/product-category/hooks/useProductCategoryForm";
import { useProductCategoryImage } from "@/features/product/product-category/hooks/useProductCategoryImage";
import { useCreateProductCategory } from "@/features/product/product-category/hooks/useProductCategoryMutations";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCategoryForm } from "@/features/product/product-category/components/ProductCategoryForm";
import { ProductCategoryImageUpload } from "@/features/product/product-category/components/ProductCategoryImageUpload";
import { useRouter } from "next/navigation";
import { SubmitButton } from "@/components/shared/SubmitButton";

export default function AdminCreateProductCategoryPage() {
  const router = useRouter();
  const form = useProductCategoryForm();
  const mutation = useCreateProductCategory();
  const { previewImage, handleImageChange, handleDrop, clearImage } = useProductCategoryImage((file) => form.setValue("image", file ? { file } : undefined));

  const onSubmit = form.handleSubmit((values) => {
    mutation.mutate(values);
  });

  const handleDiscard = () => {
    clearImage();
    router.back();
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="grid auto-rows-max p-3 sm:p-4 md:p-5 gap-4" onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">Add New Product Category</h1>
          </div>

          <div className="grid md:grid-cols-[1fr_250px] lg:grid-cols-3 gap-4">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <ProductCategoryForm control={form.control} errors={form.formState.errors} disabled={mutation.isPending} />
            </div>

            <div className="grid auto-rows-max items-start gap-4">
              <ProductCategoryImageUpload
                previewImage={previewImage}
                onImageChange={handleImageChange}
                onDrop={handleDrop}
                error={form.formState.errors.image?.message}
                disabled={mutation.isPending}
              />

              <div className="flex gap-0.5 flex-col justify-center items-center w-full overflow-hidden">
                <Button className="w-full" type="button" variant="outline" onClick={handleDiscard}>
                  Discard
                </Button>

                <SubmitButton submitText="Save" isSubmitting={mutation.isPending} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
