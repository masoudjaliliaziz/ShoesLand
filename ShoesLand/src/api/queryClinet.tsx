import { useQuery, useMutation, useQueryClient, QueryKey } from "@tanstack/react-query";
import axiosClient from "./axiosClient";



const fetchData = async (url: string) => {
  console.log('querykey', url)
  const { data } = await axiosClient.get(url);
  console.log(data)
  return data;
};

const postData = async ({ url, body }: { url: string; body: any }) => {
  const { data } = await axiosClient.post(url, body);
  return data;
};

const putData = async ({ url, body }: { url: string; body: any }) => {
  const { data } = await axiosClient.put(url, body);
  return data;
};

const deleteData = async (url: string) => {
  const { data } = await axiosClient.delete(url);
  return data;
};

export const useFetch = ({ key, url }: { key: string; url: string; }) => {
  console.log(url)
  return useQuery({
    queryKey: [key, url],
    queryFn: async () => await fetchData(url)
  });
};

export const usePost = (url: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: async (body: any) => {
        console.log(body)
        return await postData({ url, body })
      },
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    });
};

export const usePut = (url: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: any) => putData({ url, body }),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  });
};

export const useDelete = (url: string) => {
  const queryClient = useQueryClient();
  return useMutation(

    {
      mutationFn: async () => await deleteData(url),
      onSuccess: () =>
        queryClient.invalidateQueries()
    },
  );
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
  useFetchWishlist: () => useFetch({ key: "wishlist", url: "/api/wishlist" }),
  useAddRemoveWishlist: () => usePost("/api/wishlist"),
  useSearchWishlist: (searchTerm: string) =>
    useFetch({
      key: `wishlist-search-${searchTerm}`,
      url: `/api/wishlist?search=${searchTerm}`,
    }),
};

export const historySearchHooks = {
  useFetchHistorySearch: () => useFetch({ key: "history-search", url: "/api/search" }),
  useAddHistorySearch: () => usePost("/api/search"),
  useRemoveHistorySearch: () => useDelete("/api/search"),
  useRemoveAllHistorySearch: () => useDelete("/api/search"),
};

export const cartHooks = {
  useFetchCart: () => useFetch({ key: "cart", url: "/api/cart" }),
  useAddToCartItem: () => usePost("/api/cart"),
  useUpdateCartItemCount: () => usePut("/api/cart"),
  useRemoveCartItem: () => useDelete("/api/cart"),
};
