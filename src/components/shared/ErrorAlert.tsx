import { ApiError } from "@/lib/api-error";
import { AlertTriangleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/class-name.util";
import { formatDate } from "@/lib/formatters/date.formatter";

interface ErrorCardProps {
  error: unknown;
  className?: string;
}

export function ErrorAlert({ error, className }: ErrorCardProps) {
  return (
    <Alert className={cn("max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50", className)}>
      <AlertTriangleIcon />
      <AlertTitle>Upss something went wrong.</AlertTitle>
      <AlertDescription className="space-y-1 mt-3 overflow-x-hidden">
        {ApiError.isApiError(error) ? (
          <>
            <div>
              <span>Request ID: </span>
              <strong>{error.requestId}</strong>
            </div>
            <div>
              <span>Message: </span>
              <strong>{error.message}</strong>
            </div>
            <div>
              <span>Code: </span>
              <span>{error.code}</span>
            </div>
            <div>
              <span>Timestamp: </span>
              <span>{formatDate(error.timestamp)}</span>
            </div>
            {error.detail && <div>{renderValue(error.detail)}</div>}
          </>
        ) : (
          <div>
            <span>Message: </span>
            <span>{error instanceof Error ? error.message : String(error)}</span>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
}

function renderValue(value: unknown): React.ReactNode {
  if (value == null) {
    return String(value);
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return (
      <ul className="list-disc pl-5">
        {value.map((item, index) => (
          <li key={index}>{renderValue(item)}</li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object") {
    return (
      <ul className="list-disc pl-5">
        {Object.entries(value).map(([key, nestedValue]) => (
          <li key={key}>
            <span>{key}:</span> {renderValue(nestedValue)}
          </li>
        ))}
      </ul>
    );
  }

  return String(value);
}
