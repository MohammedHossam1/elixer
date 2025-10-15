/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse, fetcher } from "@/lib/fetch-methods";
import { HomePageData, IAdrress, IContact, IFAQ, IProduct, TArticle, appointmentType } from "@/types/Index";
import { useMutation, useQuery } from "@tanstack/react-query";




export const useGetHomePage = (lang: string) => {
  return useQuery<ApiResponse<HomePageData>>({
    queryKey: ["home", lang],
    queryFn: () => fetcher<HomePageData>({ url: "/home", lang }),
    staleTime: 1000 * 60 * 60,
  });
};

interface ICategory {
  id: number;
  name: string;
}
export const useGetCategories = (lang: string) => {
  return useQuery<ApiResponse<ICategory[]>>({
    queryKey: ["categories", lang],
    queryFn: () => fetcher<ICategory[]>({ url: "/categories", lang }),
    staleTime: 1000 * 60 * 60,
  });
};
interface IProductsResponse {
  items: IProduct[],
  meta: {
    has_more_pages: boolean,
    has_pages: boolean,
    is_first_page: boolean,
    is_last_page: boolean,
    links: {
      first: string,
      last: string,
      prev: string | null,
      next: string | null
    },
    pagination: {
      total_items: number;
      total_pages: number;
      current_page: number;
    }

  }
}
// hooks/fetch-hooks.ts
export const useGetProducts = (lang: string, page?: number, category_id?: number | string) => {
  return useQuery<ApiResponse<IProductsResponse>>({
    queryKey: ["products", lang, page, category_id],
    queryFn: () =>
      fetcher<IProductsResponse>({
        url: `/products?page=${page}&category_id=${category_id}`,
        lang,
      }),
    suspense: category_id ? false : true, // ✅ Never suspend for search results

    staleTime: 1000 * 60 * 60,
  } as any);
};
export const useGetProductsSearch = (lang: string, page: number, search?: string) => {
  const shouldFetch = Boolean(search && search.trim().length > 0);

  return useQuery<ApiResponse<IProductsResponse>>({
    queryKey: ["products-search", lang, page, search],
    queryFn: () =>
      fetcher<IProductsResponse>({
        url: `/products?page=${page}&search=${encodeURIComponent(search || "")}`,
        lang,
      }),
    enabled: shouldFetch, // ✅ Only fetch if search has non-empty text
    suspense: false, // ✅ Never suspend for search results
  } as any);
};


export const useGetFAQ = (lang: string) => {
  return useQuery<ApiResponse<IFAQ>>({
    queryKey: ["faqs", lang],
    queryFn: () => fetcher<IFAQ>({ url: "/faqs", lang }),
    staleTime: 1000 * 60 * 60,
  });
};



export const useGetAppointmentsTypes = (lang: string) => {
  //hanlde react query fetch
  const query = useQuery({
    queryKey: ["appointment-types", lang],
    queryFn: () => fetcher<appointmentType[]>({ url: "/appointment-types", lang }),
    staleTime: 1000 * 60 * 60,
  })
  return query
};

export const useGetSingleBlog = (id: number, lang: string) => {
  //hanlde react query fetch
  const query = useQuery({
    queryKey: ["articles", id, lang],
    queryFn: () => fetcher<TArticle>({ url: `/articles/${id}`, lang }),
    staleTime: 1000 * 60 * 60,
  })
  return query
};


export const useGetSingleProduct = (slug: string, lang: string) => {
  //hanlde react query fetch
  const query = useQuery({
    queryKey: ["product", slug, lang],
    queryFn: () => fetcher<IProduct>({ url: `/products/${slug}`, lang }),
    staleTime: 1000 * 60 * 60,
  })
  return query
};
export const useGetAdresses = (lang: string) => {
  //hanlde react query fetch
  const query = useQuery({
    queryKey: ["addresses", lang],
    queryFn: () => fetcher<IAdrress[]>({ url: `/addresses`, lang }),
    staleTime: 1000 * 60 * 60,
  })
  return query
};





// --- POST usePostContact ---
export const usePostContact = () => {
  return useMutation({
    mutationFn: async (data: IContact) => {
      return fetcher({
        url: "/contact-us",
        method: "POST",
        body: data,
      });
    },
  });
};
export const usePostCheckout = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      return fetcher({
        url: "/orders/checkout",
        method: "POST",
        body: data,
      });
    },
  });
};