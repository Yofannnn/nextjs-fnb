import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageDropZone } from "@/components/shared/ImageDropZone";

interface ProductCategoryImageUploadProps {
  previewImage: { file: File; url: string } | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  error?: string;
  disabled?: boolean;
}

export function ProductCategoryImageUpload({ previewImage, onImageChange, onDrop, error, disabled = false }: ProductCategoryImageUploadProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Category Image</CardTitle>
        <CardDescription>{!previewImage ? "Upload a category image" : "Change image by uploading new image"}</CardDescription>
      </CardHeader>
      <CardContent>
        <ImageDropZone previewImage={previewImage} onImageChange={onImageChange} onDrop={onDrop} error={error} disabled={disabled} />
      </CardContent>
    </Card>
  );
}
