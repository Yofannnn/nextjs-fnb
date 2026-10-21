"use client";

import { useImageUpload } from "./useImageUpload";
import { ImageData } from "@/lib/image-helpers";

interface UseMultipleImageUploadReturn {
  previewImages: { file: File; url: string; id: string }[];
  imagesData: ImageData[];
  isLoading: boolean;
  addImages: (files: FileList | File[]) => Promise<void>;
  removeImage: (index: number) => void;
  clearImages: () => void;
  getBase64Images: () => Promise<string[]>;
  reorderImages: (startIndex: number, endIndex: number) => void;
}

export function useMultipleImageUpload(maxImages: number = 5, onSuccess?: (imageData: ImageData[]) => void, onError?: (error: string) => void): UseMultipleImageUploadReturn {
  const { previewImages, setPreviewImages, setImageData, imageData, isLoading, addImages, removeImage, clearImages, getBase64Images } = useImageUpload({
    maxImages,
    onSuccess: (data) => {
      if (onSuccess && data) {
        onSuccess(data as ImageData[]);
      }
    },
    onError,
  });

  const reorderImages = (startIndex: number, endIndex: number) => {
    setPreviewImages((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });

    setImageData((prev) => {
      if (Array.isArray(prev)) {
        const result = Array.from(prev);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
      }
      return prev;
    });
  };

  return {
    previewImages,
    imagesData: imageData as ImageData[],
    isLoading,
    addImages,
    removeImage,
    clearImages,
    getBase64Images,
    reorderImages,
  };
}
