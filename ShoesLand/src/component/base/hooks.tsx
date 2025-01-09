import { authHooks, cartHooks, productHooks, usePut } from "../../api/queryClinet";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CartItem, EditCartParams, AddToCartParams, RemoveFromCartParams } from './Interfaces.ts'
import { authAxiosClient } from "../../api/axiosClient.tsx";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
type PersistedState<T> = [T, Dispatch<SetStateAction<T>>];

function useLocalStorage<T>(defaultValue: T, key: string): PersistedState<T> {
  const [value, setValue] = useState<T>(() => {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

export { useLocalStorage };


function useCart() {
  const { mutate: addToCartMutate } = cartHooks.useAddToCartItem();
  const updateCartItemCountMutate = cartHooks.useUpdateCartItemCount
  const { data: userData, isLoading: userLoading, isError, isSuccess } = authHooks.useWhoAmI();
  const { data: cartData, isLoading: cartLoading } = cartHooks.useFetchCart();
  const [value, setValue] = useLocalStorage<CartItem[]>([], "cart");
  const isLoading = cartLoading || userLoading
  const queryClient = useQueryClient();
  const getCart = (): CartItem[] | null => {
    if (userLoading || cartLoading) return null;
    if (isError) {
      return value;
    } else if (isSuccess) {
      return cartData as CartItem[];
    }
    return null;
  };

  const addToCart = ({
    productId,
    color,
    size,
    count,
  }: AddToCartParams): void => {
    if (userLoading || cartLoading) return;
    if (!userData) {
      setValue((state) => {
        const existingItemIndex = state.findIndex(
          (item) => item.productId === productId
        );
        if (existingItemIndex !== -1) {
          const updatedState = [...state];
          updatedState[existingItemIndex].count += count;
          return updatedState;
        }
        return [
          ...state,
          {
            name: "",
            count,
            color,
            size,
            images: [],
            productId,
          },
        ];
      });
    } else {
      addToCartMutate(
        {
          productId,
          color,
          size,
          count,
        },
        {
          onSuccess: () => {
            console.log("Cart updated successfully");
          },
          onError: (err) => {
            console.error("Failed to update cart", err);
          },
        }
      );
    }
  };

  const removeFromCart = async ({ productId }: RemoveFromCartParams) => {
    if (userLoading || cartLoading) return;
    if (!userData) {
      setValue((prevCart) =>
        prevCart.filter((item) => item.productId !== productId)
      );
    } else {

      try {
        const response = await authAxiosClient.put(`/api/cart/${productId}`, {
          count: 0,
        });
        console.log("Cart updated successfully", response.data);
        queryClient.invalidateQueries({ queryKey: ['cart'] });
      } catch (error) {
        console.error("Failed to update cart", error);
      }
    }


  };

  const editCart = async ({ productId, count }: EditCartParams) => {
    if (userLoading || cartLoading) return;
    if (!userData) {
      setValue((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId ? { ...item, count } : item
        )
      );
    } else {
      try {
        const response = await authAxiosClient.put(`/api/cart/${productId}`, {
          count,
        });
        console.log("Cart updated successfully", response.data);
        queryClient.invalidateQueries({ queryKey: ['cart'] });
      } catch (error) {
        console.error("Failed to update cart", error);
      }

    }


  };
  const mergeCartOnLogin = () => {
    if (!userData || !cartData) return;

    const localCart = value;
    const apiCart = cartData as CartItem[];
    const mergedCart: CartItem[] = [...apiCart];

    localCart.forEach((localItem) => {
      const apiItemIndex = mergedCart.findIndex(
        (apiItem) =>
          apiItem.productId === localItem.productId &&
          apiItem.color === localItem.color &&
          apiItem.size === localItem.size
      );

      if (apiItemIndex !== -1) {
        mergedCart[apiItemIndex].count = localItem.count;
      } else {
        mergedCart.push(localItem);
      }
    });

    setValue([]);
    mergedCart.forEach((item) => {
      addToCartMutate(
        {
          productId: item.productId,
          color: item.color,
          size: item.size,
          count: item.count,
        },
        {
          onSuccess: () => {
            console.log(`Merged item ${item.productId} to API cart`);
          },
          onError: (err) => {
            console.error(`Failed to merge item ${item.productId}`, err);
          },
        }
      );
    });
  };

  return { getCart, addToCart, removeFromCart, editCart, mergeCartOnLogin, isLoading };
}

export default useCart;
