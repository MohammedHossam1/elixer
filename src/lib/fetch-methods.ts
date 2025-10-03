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

// Enhanced fetcher to handle GET and POST (with body) requests
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
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Content-Language": lang,
        ...(options?.headers || {}),
      },
      ...options,
    };

    if (body !== undefined) {
      fetchOptions.body = JSON.stringify(body);
    }

    const res = await fetch(baseUrl + url, fetchOptions);

    const data = (await res.json()) as ApiResponse<T>;

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
