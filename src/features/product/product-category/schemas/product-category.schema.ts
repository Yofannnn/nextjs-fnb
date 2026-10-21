import z from "zod";
import { ImageSchema } from "@/lib/schemas/image.schema";

export const CreateProductCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name must be at least 1 character long" })
    .refine((val) => val.trim().length > 0, {
      message: "Name cannot only contain spaces",
    }),
  description: z.string().trim().optional(),
  image: ImageSchema.optional(),
});

export type CreateProductCategorySchemaType = z.infer<typeof CreateProductCategorySchema>;
