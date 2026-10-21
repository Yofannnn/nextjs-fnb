import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/class-name.util";

interface ImageDropZoneProps {
  previewImage: { file: File; url: string } | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  error?: string;
  disabled?: boolean;
}

export function ImageDropZone({ previewImage, onImageChange, onDrop, error, disabled = false }: ImageDropZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="grid gap-2">
      <div className="size-full rounded-md">
        {previewImage && <Image src={previewImage.url} className="aspect-square w-full rounded-md object-cover" height="200" width="200" alt="Product image" />}
      </div>
      <div onDrop={disabled ? undefined : onDrop} onDragOver={(event) => (disabled ? event.preventDefault() : event.preventDefault())} className={cn("relative", error && "pb-10")}>
        <label
          htmlFor="image"
          className={`flex flex-col justify-center items-center size-full border-dashed border-2 rounded-md cursor-pointer py-14 transition-colors ${
            disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-accent/50"
          }`}
        >
          <Upload className="size-6 text-muted-foreground" />
          <span className="mt-2 text-sm text-muted-foreground">Select or Drop Image here.</span>
          <span className="mt-1 text-xs text-muted-foreground">Max size: 1MB</span>
        </label>
        <Input ref={fileInputRef} className="hidden" id="image" name="image" type="file" accept="image/png, image/jpg, image/jpeg, image/webp" onChange={onImageChange} disabled={disabled} />
        {error && <span className="text-xs bg-destructive text-destructive-foreground p-2 w-full rounded mt-2 inline-block">{error}</span>}
      </div>
    </div>
  );
}
