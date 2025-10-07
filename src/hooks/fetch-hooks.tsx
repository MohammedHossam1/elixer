import { ApiResponse, fetcher } from "@/lib/fetch-methods";
import { HomePageData, IFAQ, IProduct, TArticle, appointmentType } from "@/types/Index";
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
export const useGetProducts = (lang: string, page: number) => {
  return useQuery<ApiResponse<IProductsResponse>>({
    queryKey: ["products", lang, page],
    queryFn: () =>
      fetcher<IProductsResponse>({
        url: `/products?page=${page}`,
        lang,
      }),
    staleTime: 1000 * 60 * 60,
  });
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





// --- POST method example ---
export const usePostContact = () => {
  // This hook allows you to post contact form data to the backend
  // Usage: const mutation = usePostContact(); mutation.mutate(formData)
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (data: any) => {
      // You can adjust the endpoint and payload as needed
      return fetcher({
        url: "/book-appointment",
        method: "POST",
        body: data,
      });
    },
  });
};