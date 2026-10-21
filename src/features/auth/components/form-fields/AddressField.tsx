import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

interface AddressFieldProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  disabled?: boolean;
  name?: Path<TFormValues>;
}

export function AddressField<TFormValues extends FieldValues>({ control, disabled, name = "address" as Path<TFormValues> }: AddressFieldProps<TFormValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Address</FormLabel>
          <FormControl>
            <Input placeholder="Your address" type="text" disabled={disabled} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
