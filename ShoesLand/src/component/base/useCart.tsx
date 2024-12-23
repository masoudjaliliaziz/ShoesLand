import { useState, useEffect } from 'react';
import useData from './useData'; // Assume this is your custom data-fetching hook

const useCart = () => {
  const [cart, setCart] = useState([]);
  const { fetchData, postData, putData, deleteData } = useData(); // Destructure methods from your `useData` hook

  // Retrieve cart items
  const getCartItems = async () => {
    try {
      const data = await fetchData('/cart'); // API endpoint for fetching cart data
      setCart(data);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    }
  };

  // Add item to cart
  const addItem = async (item) => {
    try {
      const newItem = await postData('/cart', item); // API endpoint for adding an item
      setCart((prevCart) => [...prevCart, newItem]);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  // Edit item in the cart
  const editItem = async (itemId, updatedItem) => {
    try {
      const updated = await putData(`/cart/${itemId}`, updatedItem); // API endpoint for editing an item
      setCart((prevCart) =>
        prevCart.map((item) => (item.id === itemId ? updated : item))
      );
    } catch (error) {
      console.error('Failed to edit item in cart:', error);
    }
  };

  // Delete item from cart
  const deleteItem = async (itemId) => {
    try {
      await deleteData(`/cart/${itemId}`); // API endpoint for deleting an item
      setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Failed to delete item from cart:', error);
    }
  };

  // Automatically fetch cart items when the hook is used
  useEffect(() => {
    getCartItems();
  }, []);

  return {
    cart,
    getCartItems,
    addItem,
    editItem,
    deleteItem,
  };
};

export default useCart;
