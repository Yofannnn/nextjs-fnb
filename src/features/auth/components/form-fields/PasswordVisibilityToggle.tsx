import { EyeIcon, EyeOffIcon } from "lucide-react";

interface PasswordVisibilityToggleProps {
  showPassword: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function PasswordVisibilityToggle({ showPassword, onToggle, disabled }: PasswordVisibilityToggleProps) {
  return (
    <button
      type="button"
      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      onClick={onToggle}
      disabled={disabled}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <EyeIcon className="size-5" /> : <EyeOffIcon className="size-5" />}
    </button>
  );
}
