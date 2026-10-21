import { toast } from "sonner";
import { ApiError } from "./api-error";

export function toastApiError(error: unknown, fallback = "Something went wrong", duration = 7000) {
  if (ApiError.isApiError(error)) {
    toast(error.message || fallback, {
      description: `Request ID: ${error.requestId}`,
      duration,
    });
  } else if (error instanceof Error) {
    toast(fallback, { description: error.message, duration });
  } else {
    toast(fallback);
  }
}
