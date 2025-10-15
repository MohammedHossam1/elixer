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
    // ✅ إعداد الهيدر الأساسي
    const headers: Record<string, string> = {
      "Content-Language": lang,
      ...(options?.headers as Record<string, string>),
    };

    // ✅ لا تضف Content-Type لو body هو FormData
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    // ✅ بناء خيارات الفetch
    const fetchOptions: RequestInit = {
      method,
      headers,
      ...options,
    };

    // ✅ تجهيز البودي
    if (body !== undefined) {
      fetchOptions.body =
        body instanceof FormData ? body : JSON.stringify(body);
    }

    // ✅ تنفيذ الطلب
    const res = await fetch(baseUrl + url, fetchOptions);

    // ✅ محاولة قراءة JSON
    let data: ApiResponse<T>;
    try {
      data = (await res.json()) as ApiResponse<T>;
    } catch {
      throw new ApiError("Invalid JSON response", res.status);
    }

    // ✅ التحقق من النجاح
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
