export interface ImageData {
  fileBuffer: Buffer;
  fileName: string;
  mimeType: string;
  fileSize: number;
}

export function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export function getImageMimeType(file: File): string {
  return file.type;
}

export function sanitizeFileName(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();
}

export function generateFileName(name: string, originalFileName: string): string {
  const sanitizedName = sanitizeFileName(name);
  const extension = originalFileName.substring(originalFileName.lastIndexOf(".")).toLowerCase();
  return `${sanitizedName}_${crypto.randomUUID()}${extension}`;
}

export async function processImageFile(file: File): Promise<ImageData> {
  const fileBuffer = await fileToBuffer(file);
  return {
    fileBuffer,
    fileName: sanitizeFileName(file.name),
    mimeType: getImageMimeType(file),
    fileSize: file.size,
  };
}

export function getFileExtension(filename: string): string {
  return filename.split(".").pop() || "";
}

export function isValidImageType(file: File): boolean {
  return file.type.startsWith("image/");
}

export function isValidImageSize(file: File, maxSize: number = 1024 * 1024): boolean {
  return file.size <= maxSize;
}

export function createImagePreview(file: File): string {
  return URL.createObjectURL(file);
}

export function revokeImagePreview(url: string): void {
  URL.revokeObjectURL(url);
}
