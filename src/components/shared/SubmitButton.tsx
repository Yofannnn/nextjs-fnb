import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/class-name.util";

interface SubmitButtonProps {
  isSubmitting: boolean;
  submitText?: string;
  submittingText?: string;
  className?: string;
}

export function SubmitButton({ isSubmitting, submitText = "Submit", submittingText = "Please wait", className = "w-full" }: SubmitButtonProps) {
  return (
    <Button type="submit" className={cn(className, "mt-3 mb-5")} disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          {submittingText}
        </>
      ) : (
        submitText
      )}
    </Button>
  );
}
