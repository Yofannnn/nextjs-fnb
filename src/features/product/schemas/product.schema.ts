import z from "zod";
import { ImageSchema } from "@/lib/schemas/image.schema";
import { ProductStatus, ProductType } from "@/features/product/types/product.type";

const MAX_IMAGES = 5;

export const CreateProductSchema = z.object({
  categoryId: z.string(),
  type: z.enum(Object.values(ProductType)),
  status: z.enum(Object.values(ProductStatus)),
  name: z
    .string()
    .min(1, { message: "Name must be at least 1 character long" })
    .refine((val) => val.trim().length > 0, {
      message: "Name cannot only contain spaces",
    }),
  price: z.coerce.number().positive({ message: "Price must be greater than 0" }) as z.ZodCoercedNumber<number>,
  stockQuantity: z.coerce.number().nonnegative({ message: "Stock quantity must be non-negative" }).optional() as z.ZodOptional<z.ZodCoercedNumber<number>>,
  description: z.string().trim().optional(),
  ingredients: z.string().trim().optional(),
  preparationTimeInMinutes: z.coerce.number().nonnegative({ message: "Preparation time must be non-negative" }).optional() as z.ZodOptional<z.ZodCoercedNumber<number>>,
  images: z
    .array(ImageSchema)
    .min(1, { message: "At least one image is required" })
    .max(MAX_IMAGES, { message: `Maximum ${MAX_IMAGES} images allowed` }),
});

export type CreateProductSchemaType = z.infer<typeof CreateProductSchema>;
