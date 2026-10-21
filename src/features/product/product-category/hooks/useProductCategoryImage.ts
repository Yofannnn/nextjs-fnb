"use client";

import { useState } from "react";
import { fileToBuffer, sanitizeFileName, createImagePreview, revokeImagePreview, ImageData } from "@/lib/image-helpers";
import { toast } from "sonner";

interface UseProductCategoryImageReturn {
  previewImage: { file: File; url: string } | null;
  imageData: ImageData | null;
  isLoading: boolean;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => Promise<void>;
  clearImage: () => void;
}

export function useProductCategoryImage(onChange: (file: File | null) => void): UseProductCategoryImageReturn {
  const [previewImage, setPreviewImage] = useState<{ file: File; url: string } | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const processImage = async (file: File) => {
    setIsLoading(true);

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      setIsLoading(false);
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.error("Image size must not exceed 1MB");
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
      onChange(file);
      setPreviewImage({ file, url: createImagePreview(file) });
    } catch (error) {
      console.error("🔴 Image processing error:", error);
      toast.error("Failed to process image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      await processImage(files[0]);
    } else {
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

  const clearImage = () => {
    if (previewImage) {
      revokeImagePreview(previewImage.url);
    }
    setPreviewImage(null);
    setImageData(null);
    onChange(null);
  };

  return {
    previewImage,
    imageData,
    isLoading,
    handleImageChange,
    handleDrop,
    clearImage,
  };
}
