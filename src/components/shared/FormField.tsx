import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
  error?: string;
  required?: boolean;
}

export function FormField({ label, htmlFor, children, error, required = false }: FormFieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
      {error && <span className="text-xs bg-destructive text-destructive-foreground p-2 w-full rounded">{error}</span>}
    </div>
  );
}
