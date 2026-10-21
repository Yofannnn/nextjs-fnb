export interface ApiErrorDetail {
  [key: string]: any;
}

export interface ApiErrorPayload {
  requestId: string;
  code: string;
  message: string;
  timestamp: string;
  retryable: boolean;
  detail?: ApiErrorDetail;
}

export class ApiError extends Error {
  readonly requestId: string;
  readonly code: string;
  readonly timestamp: string;
  readonly retryable: boolean;
  readonly detail?: ApiErrorDetail;

  constructor(payload: ApiErrorPayload) {
    super(payload.message);

    this.name = "ApiError";

    this.requestId = payload.requestId;
    this.code = payload.code;
    this.timestamp = payload.timestamp;
    this.retryable = payload.retryable;
    this.detail = payload.detail;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  static isApiErrorPayload(value: unknown): value is ApiErrorPayload {
    if (typeof value !== "object" || value === null) {
      return false;
    }

    const candidate = value as Record<string, unknown>;

    const hasRequiredFields =
      typeof candidate.requestId === "string" &&
      typeof candidate.message === "string" &&
      typeof candidate.code === "string" &&
      typeof candidate.timestamp === "string" &&
      typeof candidate.retryable === "boolean";

    if (!hasRequiredFields) return false;

    if ("detail" in candidate && (typeof candidate.detail !== "object" || candidate.detail === null || Array.isArray(candidate.detail))) {
      return false;
    }

    return true;
  }

  static fromPayload(value: unknown): ApiError {
    if (!ApiError.isApiErrorPayload(value)) {
      throw value;
    }

    return new ApiError(value);
  }

  static isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
  }
}
