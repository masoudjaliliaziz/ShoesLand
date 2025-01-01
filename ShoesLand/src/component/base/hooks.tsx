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
  const [value, setValue] = useLocalStorage([], "cart");
  const getCart = () => {
    const { data, isLoading, isError, isSuccess } = authHooks.useWhoAmI();
    if (isLoading) return <div>Loading...</div>;
    if (isError) {
      return value;
    } else if (isSuccess) {
      return cartHooks.useFetchCart();
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
    const { mutate } = cartHooks.useAddToCartItem();

    const { data, isLoading, isError, isSuccess } = authHooks.useWhoAmI();
    if (isLoading) return <div>Loading...</div>;
    if (isError) {
      setValue((state) => {
        return state.map((item) => {
          if (item.productId == productId) {
            return { ...item, count: count };
          } else {
            return item;
          }
        });
      });
    } else if (isSuccess) {
      mutate(
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
    const { data, isLoading, isError, isSuccess } = authHooks.useWhoAmI();
    if (isLoading) return <div>Loading...</div>;
    if (isError) {
      setValue((prevCart) => {
        return prevCart.map((item) =>
          item.productId !== productId ? item : null
        );
      });
    } else if (isSuccess) {
      const { mutate } = cartHooks.useUpdateCartItemCount();
      mutate(
        {
          productId,
          count: 0,
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
  const EditCart = ({ productId, count }) => {
    const { data, isLoading, isError, isSuccess } = authHooks.useWhoAmI();
    if (isLoading) return <div>Loading...</div>;
    if (isError) {
      setValue((prevCart) => {
        return prevCart.map((item) =>
          item.productId === productId && item.count > 1
            ? { ...item, count: count }
            : item
        );
      });
    } else if (isSuccess) {
      const { mutate } = cartHooks.useUpdateCartItemCount();
      mutate(
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
  return { getCart, addToCart, removeFromCart, EditCart };
}

export default useCart;
