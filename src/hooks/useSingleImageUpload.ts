"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { fileToBuffer, sanitizeFileName, createImagePreview, revokeImagePreview, isValidImageType, isValidImageSize } from "@/lib/image-helpers";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024;

interface ImageData {
  fileBuffer: Buffer;
  fileName: string;
  mimeType: string;
  fileSize: number;
}

interface UseSingleImageUploadReturn {
  previewImage: { file: File; url: string; id: string } | null;
  imageData: ImageData | null;
  isLoading: boolean;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => Promise<void>;
  removeImage: () => void;
  clearImage: () => void;
}

export function useSingleImageUpload(onSuccess?: (imageData: ImageData) => void, onError?: (error: string) => void): UseSingleImageUploadReturn {
  const [previewImage, setPreviewImage] = useState<{ file: File; url: string; id: string } | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const processImage = useCallback(
    async (file: File) => {
      setIsLoading(true);

      if (!isValidImageType(file)) {
        toast.error("Only image files are allowed.");
        if (onError) onError("Only image files are allowed.");
        setIsLoading(false);
        return;
      }

      if (!isValidImageSize(file, MAX_IMAGE_SIZE)) {
        toast.error("Image size must not exceed 1MB");
        if (onError) onError("Image size must not exceed 1MB");
        setIsLoading(false);
        return;
      }

      try {
        const buffer = await fileToBuffer(file);
        const imageData: ImageData = {
          fileBuffer: buffer,
          fileName: sanitizeFileName(file.name),
          mimeType: file.type,
          fileSize: file.size,
        };

        setImageData(imageData);
        setPreviewImage({
          file,
          url: createImagePreview(file),
          id: `${file.name}-${Date.now()}`,
        });

        if (onSuccess) onSuccess(imageData);
      } catch (error) {
        const err = error instanceof Error ? error.message : String(error);
        toast.error(err);
        if (onError) onError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess, onError],
  );

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      await processImage(files[0]);
    }
    e.target.value = "";
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files[0]) {
      await processImage(files[0]);
    }
  };

  const removeImage = useCallback(() => {
    if (previewImage) {
      revokeImagePreview(previewImage.url);
    }
    setPreviewImage(null);
    setImageData(null);
  }, [previewImage]);

  const clearImage = useCallback(() => {
    removeImage();
  }, [removeImage]);

  return {
    previewImage,
    imageData,
    isLoading,
    handleImageChange,
    handleDrop,
    removeImage,
    clearImage,
  };
}
