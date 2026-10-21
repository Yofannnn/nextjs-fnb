import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { CreateProductCategorySchemaType } from "@/features/product/product-category/schemas/product-category.schema";
import { FormField } from "@/components/shared/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProductCategoryFormProps {
  control: Control<CreateProductCategorySchemaType>;
  errors: FieldErrors<CreateProductCategorySchemaType>;
  disabled?: boolean;
}

export function ProductCategoryForm({ control, errors, disabled = false }: ProductCategoryFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Detail</CardTitle>
        <CardDescription>Enter detail for new product category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormField label="Name" htmlFor="name" error={errors.name?.message} required>
                <Input id="name" placeholder="Enter category name" disabled={disabled} {...field} />
              </FormField>
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <FormField label="Description" htmlFor="description" error={errors.description?.message} required>
                <Textarea id="description" className="min-h-48" placeholder="Enter category description" disabled={disabled} {...field} />
              </FormField>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
