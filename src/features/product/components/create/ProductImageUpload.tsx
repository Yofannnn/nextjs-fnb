import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUploadZone } from "@/components/shared/ImageUploadZone";

interface ProductImageUploadProps {
  previewImages: { file: File; url: string }[];
  onAddImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onRemoveImage: (index: number) => void;
  error?: string;
  disabled?: boolean;
  maxImages?: number;
}

export function ProductImageUpload({ previewImages, onAddImages, onDrop, onRemoveImage, error, disabled = false, maxImages = 5 }: ProductImageUploadProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
        <CardDescription>{previewImages.length === 0 ? "Upload product images (max 5)" : `${previewImages.length} of ${maxImages} images uploaded`}</CardDescription>
      </CardHeader>
      <CardContent>
        <ImageUploadZone previewImages={previewImages} onAddImages={onAddImages} onDrop={onDrop} onRemoveImage={onRemoveImage} error={error} disabled={disabled} maxImages={maxImages} />
      </CardContent>
    </Card>
  );
}
