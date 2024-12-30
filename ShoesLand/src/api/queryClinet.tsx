import { useQuery, useMutation, useQueryClient, QueryKey } from "@tanstack/react-query";
import axiosClient from "./axiosClient";



const fetchData = async (queryKey: string) => {
  console.log('querykey', queryKey)
  const url = queryKey;
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


export const usePost = (url: string, options = {}) => {
  const queryClient = useQueryClient();
  return useMutation((body: any) => postData({ url, body }), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    ...options,
  });
};

export const usePut = (url: string, options = {}) => {
  const queryClient = useQueryClient();
  return useMutation((body: any) => putData({ url, body }), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    ...options,
  });
};

export const useDelete = (url: string, options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteData(url), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    ...options,
  });
};

export const useLogin = () => usePost("/auth/login");
export const useSignup = () => usePost("/auth/register");
export const useFetchProducts = () => useFetch({ key: "products", url: "/api/products" });
export const useAddToCart = () => usePost("/api/cart");
export const useChangeCartCount = () => usePut("/api/cart");
export const useRemoveFromCart = () => useDelete("/api/cart");

export const useForgotPassword = () => usePost("/auth/forgot-password");
export const useResetPassword = () => usePost("/auth/reset-password");
export const useWhoAmI = () => useFetch("whoami", "/auth/whoami");
export const useRefreshToken = () => usePost("/auth/refresh");

export const useFetchProductById = (id: number) =>
  useFetch({ key: `product-${id}`, url: `/api/products/${id}` });
export const useFetchPopularProducts = () =>
  useFetch("popular-products", "/api/products?is_popular=true");
export const useFetchProductsByBrand = (brands: string[]) => {
  const formattedBrands = brands.join(",");
  return useFetch(
    `products-by-brand-${formattedBrands}`,
    `/api/products?brands=${formattedBrands}`
  );
};
export const useFetchProductsByColor = (colors: string[]) => {
  const formattedColors = colors.join(",");
  return useFetch(
    `products-by-color-${formattedColors}`,
    `/api/products?colors=${formattedColors}`
  );
};
export const useFetchProductsBySize = (sizes: number[]) => {
  const formattedSizes = sizes.join(",");
  return useFetch(
    `products-by-size-${formattedSizes}`,
    `/api/products?sizes=${formattedSizes}`
  );
};
export const useSearchProducts = (searchTerm: string) =>
  useFetch(
    `search-products-${searchTerm}`,
    `/api/products?search=${searchTerm}`
  );

export const useFetchWishlist = () => useFetch("wishlist", "/api/wishlist");
export const useAddRemoveWishlist = () => usePost("/api/wishlist");
export const useSearchWishlist = (searchTerm: string) =>
  useFetch(
    `wishlist-search-${searchTerm}`,
    `/api/wishlist?search=${searchTerm}`
  );

export const useFetchHistorySearch = () =>
  useFetch("history-search", "/api/search");
export const useAddHistorySearch = () => usePost("/api/search");
export const useRemoveHistorySearch = () => useDelete("/api/search");
export const useRemoveAllHistorySearch = () => useDelete("/api/search");

export const useFetchCart = () => useFetch("cart", "/api/cart");
export const useAddToCartItem = () => usePost("/api/cart");
export const useUpdateCartItemCount = () => usePut("/api/cart");
export const useRemoveCartItem = () => useDelete("/api/cart");

