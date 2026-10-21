"use client";

import { useState, useCallback } from "react";
import { fileToBase64 } from "@/lib/image-helpers";
import { toast } from "sonner";
import { ImageSchemaType } from "@/lib/schemas/image.schema";

const MAX_IMAGES = 5;

interface UseProductImagesReturn {
  images: ImageSchemaType[];
  previewImages: { file: File; url: string }[];
  addImages: (files: FileList | File[]) => Promise<void>;
  removeImage: (index: number) => void;
  reorderImages: (startIndex: number, endIndex: number) => void;
  clearImages: () => void;
  getBase64Images: () => Promise<string[]>;
}

export function useProductImages(onChange: (images: ImageSchemaType[]) => void): UseProductImagesReturn {
  const [images, setImages] = useState<ImageSchemaType[]>([]);
  const [previewImages, setPreviewImages] = useState<{ file: File; url: string }[]>([]);

  const addImages = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);

      if (images.length + fileArray.length > MAX_IMAGES) {
        toast.error(`Maximum ${MAX_IMAGES} images allowed. You can add ${MAX_IMAGES - images.length} more.`);
        return;
      }

      const newImages: ImageSchemaType[] = [];
      const newPreviewImages: { file: File; url: string }[] = [];

      for (const file of fileArray) {
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} is not an image file.`);
          continue;
        }

        if (file.size > 1024 * 1024) {
          toast.error(`${file.name} exceeds 1MB limit.`);
          continue;
        }

        newImages.push({ file });
        newPreviewImages.push({ file, url: URL.createObjectURL(file) });
      }

      if (newImages.length > 0) {
        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        setPreviewImages([...previewImages, ...newPreviewImages]);
        onChange(updatedImages);
      }
    },
    [images, previewImages, onChange],
  );

  const removeImage = useCallback(
    (index: number) => {
      const updatedImages = images.filter((_, i) => i !== index);
      const updatedPreviewImages = previewImages.filter((_, i) => i !== index);

      URL.revokeObjectURL(previewImages[index].url);

      setImages(updatedImages);
      setPreviewImages(updatedPreviewImages);
      onChange(updatedImages);
    },
    [images, previewImages, onChange],
  );

  const reorderImages = useCallback(
    (startIndex: number, endIndex: number) => {
      const result = Array.from(images);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      setImages(result);
      onChange(result);
    },
    [images, onChange],
  );

  const getBase64Images = useCallback(async () => {
    const base64Images: string[] = [];
    for (const image of images) {
      if (image.file) {
        const base64 = await fileToBase64(image.file);
        base64Images.push(base64);
      }
    }
    return base64Images;
  }, [images]);

  const clearImages = useCallback(() => {
    previewImages.forEach(({ url }) => URL.revokeObjectURL(url));
    setImages([]);
    setPreviewImages([]);
    onChange([]);
  }, [previewImages, onChange]);

  return {
    images,
    previewImages,
    addImages,
    removeImage,
    reorderImages,
    clearImages,
    getBase64Images,
  };
}
