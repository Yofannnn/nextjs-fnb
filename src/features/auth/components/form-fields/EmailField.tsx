import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

interface EmailFieldProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  disabled?: boolean;
  name?: Path<TFormValues>;
}

export function EmailField<TFormValues extends FieldValues>({ control, disabled, name = "email" as Path<TFormValues> }: EmailFieldProps<TFormValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="m@example.com" type="email" disabled={disabled} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
