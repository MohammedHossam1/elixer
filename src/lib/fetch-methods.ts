/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse<T> {
  status: number;
  success: boolean;
  message?: string;
  data: T;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const fetcher = async <T>({
  url,
  lang = "en",
  method = "GET",
  body,
  options,
}: {
  url: string;
  lang?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  options?: RequestInit;
}): Promise<ApiResponse<T>> => {
  const baseUrl = import.meta.env.VITE_BASE_URL as string;

  try {
    const headers: Record<string, string> = {
      "Content-Language": lang,
      ...(options?.headers as Record<string, string>),
    };

    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const fetchOptions: RequestInit = {
      method,
      headers,
      ...options,
    };

    if (body !== undefined) {
      fetchOptions.body =
        body instanceof FormData ? body : JSON.stringify(body);
    }

    const res = await fetch(baseUrl + url, fetchOptions);

    let data: ApiResponse<T>;
    try {
      data = (await res.json()) as ApiResponse<T>;
    } catch {
      throw new ApiError("Invalid JSON response", res.status);
    }

    if (!res.ok || !data.success) {
      throw new ApiError(data.message || "Error fetching data", res.status);
    }

    return data;
  } catch (error: any) {
    if (error instanceof ApiError) throw error;

    throw new ApiError(
      error?.message || "Unexpected error occurred",
      error?.status || 500
    );
  }
};
