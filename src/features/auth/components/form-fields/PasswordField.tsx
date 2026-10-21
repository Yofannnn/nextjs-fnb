import Link from "next/link";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";
import { AuthOperationMode } from "@/features/auth/types/auth.dto";
import { PasswordVisibilityToggle } from "./PasswordVisibilityToggle";

interface PasswordFieldProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  showPassword: boolean;
  onTogglePassword: () => void;
  disabled?: boolean;
  mode: AuthOperationMode;
  name?: Path<TFormValues>;
}

export function PasswordField<TFormValues extends FieldValues>({ control, showPassword, onTogglePassword, disabled, mode, name = "password" as Path<TFormValues> }: PasswordFieldProps<TFormValues>) {
  const showForgotPassword = mode === "login";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between items-center gap-2">
            <FormLabel>Password</FormLabel>
            {showForgotPassword && (
              <Link href="/forgot-password" className="ml-auto text-sm underline-offset-4 hover:underline">
                Forgot your password?
              </Link>
            )}
          </div>
          <FormControl>
            <div className="w-full relative">
              <Input type={showPassword ? "text" : "password"} className="w-full pr-10" disabled={disabled} {...field} />
              <PasswordVisibilityToggle showPassword={showPassword} onToggle={onTogglePassword} disabled={disabled} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
