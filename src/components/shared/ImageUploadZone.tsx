import { Upload, X, GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/class-name.util";

interface ImagePreviewProps {
  url: string;
  index: number;
  onRemove: (index: number) => void;
}

function ImagePreview({ url, index, onRemove }: ImagePreviewProps) {
  return (
    <div className="relative group aspect-square">
      <Image src={url} className="w-full h-full object-cover rounded-md" height="120" width="120" alt={`Product image ${index + 1}`} />
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="size-4" />
      </button>
      <div className="absolute top-1 left-1 p-1 bg-background/80 rounded cursor-move">
        <GripVertical className="size-4 text-muted-foreground" />
      </div>
    </div>
  );
}

interface ImageUploadZoneProps {
  previewImages: { file: File; url: string }[];
  onAddImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onRemoveImage: (index: number) => void;
  error?: string;
  disabled?: boolean;
  maxImages?: number;
}

export function ImageUploadZone({ previewImages, onAddImages, onDrop, onRemoveImage, error, disabled = false, maxImages = 5 }: ImageUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const remainingSlots = maxImages - previewImages.length;

  return (
    <div className="grid gap-4">
      <div onDrop={disabled ? undefined : onDrop} onDragOver={(event) => event.preventDefault()} className="relative">
        <label
          htmlFor="images"
          className={cn(
            "flex flex-col justify-center items-center w-full border-dashed border-2 rounded-md cursor-pointer py-14 transition-colors",
            disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-accent/50",
            remainingSlots <= 0 && "opacity-50 cursor-not-allowed",
          )}
        >
          <Upload className="size-8 text-muted-foreground" />
          <span className="mt-2 text-sm text-muted-foreground">Select or Drop Images here</span>
          <span className="mt-1 text-xs text-muted-foreground">{remainingSlots > 0 ? `${remainingSlots} of ${maxImages} remaining (Max 1MB each)` : "Maximum images reached"}</span>
        </label>
        <Input
          ref={fileInputRef}
          className="hidden"
          id="images"
          name="images"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/webp"
          onChange={onAddImages}
          disabled={disabled || remainingSlots <= 0}
          multiple
        />
      </div>

      {error && <span className="text-xs bg-destructive text-destructive-foreground p-2 w-full rounded">{error}</span>}

      {previewImages.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {previewImages.map((preview, index) => (
            <ImagePreview key={preview.url} url={preview.url} index={index} onRemove={onRemoveImage} />
          ))}
        </div>
      )}
    </div>
  );
}
