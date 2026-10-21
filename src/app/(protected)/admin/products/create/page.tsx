"use client";

import { Form } from "@/components/ui/form";
import { useProductForm } from "@/features/product/hooks/useProductForm";
import { useProductImages } from "@/features/product/hooks/useProductImages";
import { useCreateProduct } from "@/features/product/hooks/useProductMutations";
import { ProductDetailForm } from "@/features/product/components/create/ProductDetailForm";
import { ProductImageUpload } from "@/features/product/components/create/ProductImageUpload";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { SubmitButton } from "@/components/shared/SubmitButton";

export default function AdminCreateProductPage() {
  const router = useRouter();
  const form = useProductForm();
  const mutation = useCreateProduct();
  const { previewImages, addImages, removeImage, clearImages } = useProductImages((images) => form.setValue("images", images));

  const handleAddImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) await addImages(files);
    e.target.value = "";
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files) await addImages(files);
  };

  const onSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values);
  });

  const handleDiscard = () => {
    clearImages();
    router.back();
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="grid auto-rows-max p-3 sm:p-4 md:p-5 gap-4" onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
          <div className="flex items-center gap-4">
            <Button type="button" variant="outline" size="icon" onClick={() => router.back()}>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">Add New Product</h1>
          </div>

          <div className="grid md:grid-cols-[1fr_250px] lg:grid-cols-3 gap-4">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <ProductDetailForm control={form.control} errors={form.formState.errors} disabled={mutation.isPending} />
            </div>

            <div className="grid auto-rows-max items-start gap-4">
              <ProductImageUpload
                previewImages={previewImages}
                onAddImages={handleAddImages}
                onDrop={handleDrop}
                onRemoveImage={removeImage}
                error={form.formState.errors.images?.message}
                disabled={mutation.isPending}
                maxImages={5}
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
