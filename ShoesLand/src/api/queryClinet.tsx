import { useQuery, useMutation, useQueryClient, QueryKey } from "@tanstack/react-query";
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

const deleteData = async (url: string, authRequired: boolean = false) => {
  const client = authRequired ? authAxiosClient : axiosClient;
  const { data } = await client.delete(url);
  return data;
};

export const useFetch = ({
  key,
  url,
  authRequired = false,
}: {
  key: string;
  url: string;
  authRequired?: boolean;
}) => {
  return useQuery({
    queryKey: [key, url],
    queryFn: async () => await fetchData(url, authRequired),
  });
};

export const usePost = (url: string, authRequired = false) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: any) => await postData({ url, body }, authRequired),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const usePut = (url: string, authRequired = false) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: any) => putData({ url, body }, authRequired),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const useDelete = (url: string, authRequired = false) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => await deleteData(url, authRequired),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};


export const authHooks = {
  useLogin: () => usePost("/auth/login"),
  useSignup: () => usePost("/auth/register"),
  useForgotPassword: () => usePost("/auth/forgot-password"),
  useResetPassword: () => usePost("/auth/reset-password"),
  useWhoAmI: () => useFetch({ key: "whoami", url: "/auth/whoami" }),
  useRefreshToken: () => usePost("/auth/refresh"),
};

export const productHooks = {
  useFetchProducts: () => useFetch({ key: "products", url: "/api/products" }),
  useFetchProductById: (id: number) =>
    useFetch({ key: `product-${id}`, url: `/api/products/${id}` }),
  useFetchPopularProducts: () =>
    useFetch({ key: "popular-products", url: "/api/products?is_popular=true" }),
  useFetchProductsByBrand: (brands: string[]) => {

    const formattedBrands = brands.join(",");
    return useFetch({
      key: `products-by-brand-${formattedBrands}`,
      url: `/api/products?brands=${formattedBrands}`,
    });
  },
  useFetchProductsByColor: (colors: string[]) => {
    const formattedColors = colors.join(",");
    return useFetch({
      key: `products-by-color-${formattedColors}`,
      url: `/api/products?colors=${formattedColors}`,
    });
  },
  useFetchProductsBySize: (sizes: number[]) => {
    const formattedSizes = sizes.join(",");
    return useFetch({
      key: `products-by-size-${formattedSizes}`,
      url: `/api/products?sizes=${formattedSizes}`,
    });
  },
  useSearchProducts: (searchTerm: string) =>
    useFetch({
      key: `search-products-${searchTerm}`,
      url: `/api/products?search=${searchTerm}`,
    }),
};

export const wishlistHooks = {
  useFetchWishlist: () => useFetch({ key: "wishlist", url: "/api/wishlist", authRequired: true }),
  useAddRemoveWishlist: () => usePost("/api/wishlist"),
  useSearchWishlist: (searchTerm: string) =>
    useFetch({
      key: `wishlist-search-${searchTerm}`,
      url: `/api/wishlist?search=${searchTerm}`,
    }),
};

export const historySearchHooks = {
  useFetchHistorySearch: () => useFetch({ key: "history-search", url: "/api/search", authRequired: true }),
  useAddHistorySearch: () => usePost("/api/search", true),
  useRemoveHistorySearch: () => useDelete("/api/search", true),
  useRemoveAllHistorySearch: () => useDelete("/api/search", true),
};

export const cartHooks = {
  useFetchCart: () => useFetch({ key: "cart", url: "/api/cart" }),
  useAddToCartItem: () => usePost("/api/cart"),
  useUpdateCartItemCount: () => usePut("/api/cart"),
  useRemoveCartItem: () => useDelete("/api/cart"),
};
