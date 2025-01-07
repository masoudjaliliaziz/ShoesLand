import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryKey,
} from "@tanstack/react-query";
import { axiosClient, authAxiosClient } from "./axiosClient";

const fetchData = async (url: string, authRequired: boolean = false) => {
  const client = authRequired ? authAxiosClient : axiosClient;
  const { data } = await client.get(url);
  return data;
};

const postData = async (
  { url, body }: { url: string; body: any },
  authRequired: boolean = false
) => {
  const client = authRequired ? authAxiosClient : axiosClient;
  const { data } = await client.post(url, body);
  return data;
};

const putData = async (
  { url, body }: { url: string; body: any },
  authRequired: boolean = false
) => {
  const client = authRequired ? authAxiosClient : axiosClient;
  const { data } = await client.put(url, body);
  return data;
};

export const deleteData = async (
  url: string,
  authRequired: boolean = false
) => {
  const client = authRequired ? authAxiosClient : axiosClient;
  return client.delete(url);
};

export const useFetch = ({
  categoryKey,
  queryKey,
  url,
  authRequired = false,
}: {
  categoryKey: string;
  queryKey: string;
  url: string;
  authRequired?: boolean;
}) => {
  return useQuery({
    queryKey: [categoryKey, queryKey, url],
    queryFn: async () => await fetchData(url, authRequired),
    retry: 1
  });
};


export const usePost = (categoryKey: string, url: string, authRequired = false) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: any) =>
      await postData({ url, body }, authRequired),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [categoryKey] });
    },
  });
};

export const usePut = (categoryKey: string, url: string, authRequired = false) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: any) =>
      await putData({ url, body }, authRequired),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [categoryKey] });
    },
  });
};

export const useDelete = (categoryKey: string, url: string, authRequired = false) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => await deleteData(url, authRequired),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [categoryKey] });
    },
  });
};

export const authHooks = {
  useLogin: () => usePost("auth", "/auth/login"),
  useSignup: () => usePost("auth", "/auth/register"),
  useForgotPassword: () => usePost("auth", "/auth/forgot-password"),
  useResetPassword: () => usePost("auth", "/auth/reset-password"),
  useWhoAmI: () =>
    useFetch({
      categoryKey: "auth",
      queryKey: "whoami",
      url: "/auth/whoami",
      authRequired: true,
    }),
  useRefreshToken: () => usePost("auth", "/auth/refresh"),
};
export const productHooks = {
  useFetchProducts: () =>
    useFetch({
      categoryKey: "product",
      queryKey: "all",
      url: "/api/products",
    }),
  useFetchBrands: () =>
    useFetch({
      categoryKey: "product",
      queryKey: "brands",
      url: "/api/brands",
    }),
  useFetchProductById: (id: number) =>
    useFetch({
      categoryKey: "product",
      queryKey: `product-${id}`,
      url: `/api/products/${id}`,
    }),
  useFetchPopularProducts: () =>
    useFetch({
      categoryKey: "product",
      queryKey: "popular-products",
      url: "/api/products?is_popular=true",
    }),
  useFetchProductByBrand: (brands: string[]) => {
    const brandTerms = brands.join()
    console.log(brandTerms)
    return useFetch({
      categoryKey: 'product',
      queryKey: "product-brand",
      url: `/api/products/?brands=${brandTerms}`

    })
  },
  useSearchProducts: (searchTerm: string) =>
    useFetch({
      categoryKey: "product",
      queryKey: `search-${searchTerm}`,
      url: `/api/products?search=${searchTerm}`,
    }),
  useAddProduct: () => usePost("product", "/api/products"),
  useUpdateProduct: (id: number) =>
    usePut("product", `/api/products/${id}`),
  useDeleteProduct: (id: number) =>
    useDelete("product", `/api/products/${id}`),
};
export const wishlistHooks = {
  useFetchWishlist: () =>
    useFetch({
      categoryKey: "wishlist",
      queryKey: "all",
      url: "/api/wishlist",
      authRequired: true,
    }),
  useAddRemoveWishlist: () => usePost("wishlist", "/api/wishlist", true),
  useSearchWishlist: (searchTerm: string) =>
    useFetch({
      categoryKey: "wishlist",
      queryKey: `search-${searchTerm}`,
      url: `/api/wishlist?search=${searchTerm}`,
      authRequired: true,
    }),
};
export const historySearchHooks = {
  useFetchHistorySearch: () =>
    useFetch({
      categoryKey: "history-search",
      queryKey: "all",
      url: "/api/search",
      authRequired: true,
    }),
  useAddHistorySearch: () => usePost("history-search", "/api/search", true),
  useRemoveHistorySearch: () => useDelete("history-search", "/api/search", true),
  useRemoveAllHistorySearch: () =>
    useDelete("history-search", "/api/search", true),
};
export const cartHooks = {
  useFetchCart: () =>
    useFetch({
      categoryKey: "cart",
      queryKey: "all",
      url: "/api/cart",
      authRequired: true,
    }),
  useAddToCartItem: () => usePost("cart", "/api/cart", true),
  useUpdateCartItemCount: () => usePut("cart", "/api/cart", true),
  useRemoveCartItem: () => useDelete("cart", "/api/cart", true),
};
export const addressHooks = {
  useFetchAddress: () =>
    useFetch({
      categoryKey: "address",
      queryKey: "all",
      url: "/api/address",
      authRequired: true,
    }),
  useFetchSelectedAddress: () =>
    useFetch({
      categoryKey: "address",
      queryKey: "selected",
      url: "/api/address?isSelected=true",
      authRequired: true,
    }),
  useAddToAddress: () => usePost("address", "/api/address", true),
  useUpdateAddress: () => usePut("address", "/api/address", true),
  useRemoveAddress: (id: number) =>
    useDelete("address", `/api/address/${id}`, true),
};
export const orderHooks = {
  useDiscount: (code: string) =>
    useFetch({
      categoryKey: "order",
      queryKey: `discount-${code}`,
      url: `/api/discount/${code}`,
    }),
  useFetchOrder: () =>
    useFetch({
      categoryKey: "order",
      queryKey: "all",
      url: "/api/orders",
      authRequired: true,
    }),
  useCreateOrder: () => usePost("order", "/api/orders", true),
};

