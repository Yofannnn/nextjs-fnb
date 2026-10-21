"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { processImageFile, createImagePreview, revokeImagePreview, isValidImageType, isValidImageSize, ImageData } from "@/lib/image-helpers";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024;

interface UseImageUploadOptions {
  maxSize?: number;
  maxImages?: number;
  onSuccess?: (imageData: ImageData | ImageData[]) => void;
  onError?: (error: string) => void;
}

interface UseImageUploadReturn {
  previewImages: { file: File; url: string; id: string }[];
  setPreviewImages: React.Dispatch<React.SetStateAction<{ file: File; url: string; id: string }[]>>;
  imageData: ImageData | ImageData[] | null;
  setImageData: React.Dispatch<React.SetStateAction<ImageData | ImageData[] | null>>;
  isLoading: boolean;
  addImages: (files: FileList | File[]) => Promise<void>;
  removeImage: (index: number) => void;
  clearImages: () => void;
  getBase64Images: () => Promise<string[]>;
}

export function useImageUpload(options: UseImageUploadOptions = {}): UseImageUploadReturn {
  const { maxSize = MAX_IMAGE_SIZE, maxImages = 1, onSuccess, onError } = options;

  const [previewImages, setPreviewImages] = useState<{ file: File; url: string; id: string }[]>([]);
  const [imageData, setImageData] = useState<ImageData | ImageData[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const processImages = useCallback(
    async (files: File[]) => {
      setIsLoading(true);
      const errors: string[] = [];
      const validFiles: File[] = [];
      const processedData: ImageData[] = [];
      const newPreviews: { file: File; url: string; id: string }[] = [];

      for (const file of files) {
        if (!isValidImageType(file)) {
          errors.push(`${file.name} is not an image file.`);
          continue;
        }

        if (!isValidImageSize(file, maxSize)) {
          errors.push(`${file.name} exceeds ${maxSize / (1024 * 1024)}MB limit.`);
          continue;
        }

        validFiles.push(file);
      }

      if (errors.length > 0) {
        errors.forEach((error) => toast.error(error));
        if (onError) onError(errors.join(", "));
      }

      for (const file of validFiles) {
        try {
          const data = await processImageFile(file);
          processedData.push(data);

          const preview = {
            file,
            url: createImagePreview(file),
            id: `${file.name}-${Date.now()}-${Math.random()}`,
          };
          newPreviews.push(preview);
        } catch (error) {
          const err = error instanceof Error ? error.message : `Failed to process ${file.name}`;
          toast.error(err);
        }
      }

      if (maxImages === 1) {
        setPreviewImages(newPreviews);
        setImageData(processedData[0] || null);
        if (onSuccess && processedData[0]) {
          onSuccess(processedData[0]);
        }
      } else {
        setPreviewImages((prev) => {
          const combined = [...prev, ...newPreviews];
          return combined.slice(0, maxImages);
        });

        setImageData((prev) => {
          const prevData = Array.isArray(prev) ? prev : [];
          const combined = [...prevData, ...processedData];
          return combined.slice(0, maxImages);
        });

        if (onSuccess && processedData.length > 0) {
          const currentData = Array.isArray(imageData) ? imageData : [];
          onSuccess([...currentData, ...processedData]);
        }
      }

      setIsLoading(false);
    },
    [maxSize, maxImages, onSuccess, onError, imageData],
  );

  const addImages = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);

      if (maxImages > 1 && previewImages.length + fileArray.length > maxImages) {
        const remaining = maxImages - previewImages.length;
        toast.error(`Maximum ${maxImages} images allowed. You can add ${remaining} more.`);
        return;
      }

      await processImages(fileArray);
    },
    [maxImages, previewImages.length, processImages],
  );

  const removeImage = useCallback((index: number) => {
    setPreviewImages((prev) => {
      revokeImagePreview(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });

    setImageData((prev) => {
      if (Array.isArray(prev)) {
        return prev.filter((_, i) => i !== index);
      }
      return null;
    });
  }, []);

  const clearImages = useCallback(() => {
    previewImages.forEach(({ url }) => revokeImagePreview(url));
    setPreviewImages([]);
    setImageData(null);
  }, [previewImages]);

  const getBase64Images = useCallback(async () => {
    const data = Array.isArray(imageData) ? imageData : imageData ? [imageData] : [];
    return data.map((img) => img.fileBuffer.toString("base64"));
  }, [imageData]);

  return {
    previewImages,
    setPreviewImages,
    setImageData,
    imageData,
    isLoading,
    addImages,
    removeImage,
    clearImages,
    getBase64Images,
  };
}
