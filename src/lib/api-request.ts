import { useSession } from "@/stores/session.store";
import { ApiError } from "@/lib/api-error";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

type QueryValue = string | number | boolean | null | undefined | Array<string | number>;

export interface ApiRequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  params?: Record<string, QueryValue>;
}

function buildQuery(params?: ApiRequestOptions["params"]) {
  if (!params) return "";

  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      value.forEach((item) => search.append(key, String(item)));
    } else {
      search.append(key, String(value));
    }
  }

  const query = search.toString();
  return query ? `?${query}` : "";
}

async function toApiError(response: Response) {
  try {
    return ApiError.fromPayload(await response.json());
  } catch {
    return new Error(`HTTP ${response.status} ${response.statusText}`);
  }
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { timeout, retries = 0, params, ...init } = options;

  const accessToken = useSession.getState().accessToken;

  const headers = new Headers(init.headers);

  if (accessToken != null) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const url = `${BASE_URL}${path}${buildQuery(params)}`;

  for (let attempt = 0; ; attempt++) {
    const controller = new AbortController();
    const timeoutId = timeout ? setTimeout(() => controller.abort(), timeout) : undefined;

    try {
      const response = await fetch(url, { ...init, headers, signal: controller.signal });

      if (!response.ok) throw await toApiError(response);

      return (await response.json()) as T;
    } catch (error) {
      const canRetry = attempt < retries && error instanceof Error && error.name !== "AbortError";

      if (!canRetry) throw error;

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
