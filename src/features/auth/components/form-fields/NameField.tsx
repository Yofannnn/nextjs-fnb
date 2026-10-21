import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

interface NameFieldProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  disabled?: boolean;
  name?: Path<TFormValues>;
}

export function NameField<TFormValues extends FieldValues>({ control, disabled, name = "name" as Path<TFormValues> }: NameFieldProps<TFormValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="John Doe" type="text" disabled={disabled} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
