import z from "zod";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024;

export const ImageSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_IMAGE_SIZE, {
      message: `Image size must not exceed ${MAX_IMAGE_SIZE / (1024 * 1024)}MB`,
    })
    .refine(
      (file) => {
        const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
        return validTypes.includes(file.type);
      },
      {
        message: "Image must be in JPEG, PNG, or WebP format",
      },
    ),
});

export type ImageSchemaType = z.infer<typeof ImageSchema>;
