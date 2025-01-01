import { authHooks, cartHooks, productHooks } from "../../api/queryClinet";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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
  const { mutate: updateCartMutate } = cartHooks.useUpdateCartItemCount();
  const { data: userData, isLoading: userLoading, isError, isSuccess } = authHooks.useWhoAmI();
  const { data: cartData, isLoading: cartLoading, } = cartHooks.useFetchCart();
  const [value, setValue] = useLocalStorage([], "cart");




  const getCart = () => {
    if (userLoading || cartLoading) return null
    if (isError) {
      return value;
    } else if (isSuccess) {
      return cartData
    }
  };
  const addToCart = ({
    productId,
    color,
    size,
    count,
  }: {
    productId: number;
    color: string;
    size: number;
    count: number;
  }) => {
    if (userLoading || cartLoading) return null
    if (!userData) {
      setValue((state) => {
        return state.map((item) => {
          if (item.productId == productId) {
            return { ...item, count: count };
          } else {
            return item;
          }
        });
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
            console.log("cart updated successfully");
          },
          onError: (err) => {
            console.error("Failed to update cart", err);
          },
        }
      );
    }
  };
  const removeFromCart = ({ productId }) => {
    if (userLoading || cartLoading) return null
    if (!userData) {
      setValue((prevCart) => {
        return prevCart.map((item) =>
          item.productId === productId && item.count > 1
            ? { ...item, count: count }
            : item
        );
      });
    } else {
      updateCartMutate(
        {
          productId,
          count,
        },
        {
          onSuccess: () => {
            console.log("cart updated successfully");
          },
          onError: (err) => {
            console.error("Failed to update cart", err);
          },
        }
      );
    }
  };
  return { getCart, addToCart, removeFromCart };
}

export default useCart;
