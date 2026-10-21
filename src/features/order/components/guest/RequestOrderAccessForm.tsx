import { GuestRequestOrderAccessSchemaType } from "@/features/order/schemas/order.schema";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface RequestOrderAccessFormProps {
  control: Control<GuestRequestOrderAccessSchemaType>;
  errors: FieldErrors<GuestRequestOrderAccessSchemaType>;
  disabled?: boolean;
}

export function RequestOrderAccessForm({ control, errors, disabled }: RequestOrderAccessFormProps) {
  return (
    <FieldGroup>
      <Controller
        name="orderId"
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor="orderId">Order ID</FieldLabel>
            <Input id="orderId" type="text" placeholder="Enter order ID" required disabled={disabled} {...field} />
            <FieldError>{errors.orderId?.message}</FieldError>
          </Field>
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="Enter order ID" required disabled={disabled} {...field} />
            <FieldError>{errors.email?.message}</FieldError>
          </Field>
        )}
      />
    </FieldGroup>
  );
}
