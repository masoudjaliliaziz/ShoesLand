import React from "react";
import { CartItem as CartItemType } from "./../component/base/Interfaces";
import useCart from "./../component/base/hooks";
import CartItem from "./../component/CartItem";
import backward from "../assets/Backward.svg"
import { useNavigate } from "react-router-dom";
import search from "../assets/SearchIcon.svg"

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { getCart, editCart, removeFromCart } = useCart();
  const cartItems = getCart();

  const handleUpdate = (productId: number, count: number) => {
    editCart({ productId, count });
  };

  const handleRemove = (productId: number) => {
    removeFromCart({ productId });
  };

  if (!cartItems || cartItems.length === 0) {
    return <div className="p-4 text-center h-screen font-semibold text-base flex justify-center items-center">Your cart is empty.</div>;
  }

  return (
    <div className="px-5 py-2 h-screen">
        <div className="header flex items-center justify-between py-2 font-semibold text-lg">
        <div className="flex items-center ">
          <button onClick={() => navigate(-1)}>
            <img src={backward} alt="backward" className="w-6" />
          </button>
          <h1 className="font-semibold">Your Cart</h1>
        </div>
        <button>
          <img src={search} className="w-6" />
        </button>
      </div>
      <div className="space-y-4 h-[86%] overflow-y-scroll">
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
