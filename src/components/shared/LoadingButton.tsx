import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

interface LoadingButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function LoadingButton({ type = "button", variant = "default", size = "sm", children, isLoading = false, disabled = false, onClick, className = "" }: LoadingButtonProps) {
  return (
    <Button type={type} variant={variant} size={size} disabled={disabled || isLoading} onClick={onClick} className={className}>
      {isLoading ? (
        <>
          <Loader2Icon className="animate-spin size-4 mr-2" />
          Please wait
        </>
      ) : (
        children
      )}
    </Button>
  );
}
