
import React from "react";
import { CartItem as CartItemType } from "./../component/base/Interfaces";
import useCart from './../component/base/hooks'
import CartItem from "./../component/CartItem";

const Cart: React.FC = () => {
  const { getCart, editCart, removeFromCart } = useCart();
  const cartItems = getCart();

  const handleUpdate = (productId: number, count: number) => {
    editCart({ productId, count });
  };

  const handleRemove = (productId: number) => {
    removeFromCart({ productId });
  };

  if (!cartItems || cartItems.length === 0) {
    return <div className="p-4 text-center">Your cart is empty.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      <div className="space-y-4">
        {cartItems.map((item: CartItemType) => (
          <CartItem
            key={item.productId}
            item={item}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default Cart;
