import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "@/components/shared/FormField";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { CreateProductSchemaType } from "@/features/product/schemas/product.schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductStatus, ProductType } from "@/features/product/types/product.type";
import { useCategoriesQuery } from "@/features/product/product-category/hooks/useProductCategories";
import { ProductCategoryStatus } from "@/features/product/product-category/types/product-category.type";

interface ProductDetailFormProps {
  control: Control<CreateProductSchemaType>;
  errors: FieldErrors<CreateProductSchemaType>;
  disabled?: boolean;
}

const productTypes = [
  { value: ProductType.FOOD, label: "Food" },
  { value: ProductType.DRINK, label: "Drink" },
  { value: ProductType.SNACK, label: "Snack" },
];

const productStatuses = [
  { value: ProductStatus.UPCOMING, label: "Upcoming" },
  { value: ProductStatus.AVAILABLE, label: "Available" },
  { value: ProductStatus.UNAVAILABLE, label: "Unavailable" },
  { value: ProductStatus.DISCONTINUED, label: "Discontinued" },
];

export function ProductDetailForm({ control, errors, disabled = false }: ProductDetailFormProps) {
  const { data } = useCategoriesQuery({ status: ProductCategoryStatus.ACTIVE });
  const categories = data ? data.map((category) => ({ label: category.name, value: category.id })) : [{ label: "Loading...", value: "" }];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Detail</CardTitle>
        <CardDescription>Enter detail for new product</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <FormField label="Category" htmlFor="categoryId" error={errors.categoryId?.message} required>
                <Select items={categories} id="categoryId" name="categoryId" disabled={disabled} value={field.value || ""} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            )}
          />

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <FormField label="Type" htmlFor="type" error={errors.type?.message} required>
                <Select items={productTypes} id="type" name="type" disabled={disabled} value={field.value || ""} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            )}
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormField label="Status" htmlFor="status" error={errors.status?.message} required>
                <Select items={productStatuses} id="status" name="status" disabled={disabled} value={field.value || ""} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    {productStatuses.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            )}
          />

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormField label="Name" htmlFor="name" error={errors.name?.message} required>
                <Input id="name" placeholder="Enter product name" disabled={disabled} {...field} />
              </FormField>
            )}
          />

          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <FormField label="Price" htmlFor="price" error={errors.price?.message} required>
                <Input id="price" type="number" placeholder="0" min={0} step={1} disabled={disabled} {...field} value={field.value ?? ""} />
              </FormField>
            )}
          />

          <Controller
            name="stockQuantity"
            control={control}
            render={({ field }) => (
              <FormField label="Stock Quantity" htmlFor="stockQuantity" error={errors.stockQuantity?.message}>
                <Input id="stockQuantity" type="number" placeholder="0" min={0} step={1} disabled={disabled} {...field} value={field.value ?? ""} />
              </FormField>
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <FormField label="Description" htmlFor="description" error={errors.description?.message}>
                <Textarea id="description" className="min-h-48" disabled={disabled} {...field} />
              </FormField>
            )}
          />

          <Controller
            name="ingredients"
            control={control}
            render={({ field }) => (
              <FormField label="Ingredients" htmlFor="ingredients" error={errors.ingredients?.message}>
                <Textarea id="ingredients" className="min-h-48" disabled={disabled} {...field} />
              </FormField>
            )}
          />

          <Controller
            name="preparationTimeInMinutes"
            control={control}
            render={({ field }) => (
              <FormField label="Preparation Time (in minutes)" htmlFor="preparationTimeInMinutes" error={errors.preparationTimeInMinutes?.message}>
                <Input id="preparationTimeInMinutes" type="number" placeholder="0" min={0} step={1} disabled={disabled} {...field} value={field.value ?? ""} />
              </FormField>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
