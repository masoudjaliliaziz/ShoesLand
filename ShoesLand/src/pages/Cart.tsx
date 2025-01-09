import React from "react";
import { CartItem as CartItemType } from "./../component/base/Interfaces";
import useCart from "./../component/base/hooks";
import CartItem from "./../component/CartItem";
import backward from "../assets/Backward.svg";
import { Link, useNavigate } from "react-router-dom";
import search from "../assets/SearchIcon.svg";
import emptyIcon from "../assets/emptypage.png";
import shoea from "../../public/img/Vector1.png";
import nextCheckout from "../assets/nextCheckout.svg";

import Loading from '../component/base/Loading'

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { getCart, editCart, removeFromCart, isLoading } = useCart();
  if (isLoading) return <Loading />
  const cartItems = getCart();

  const handleUpdate = (productId: number, count: number) => {
    editCart({ productId, count });
  };

  const handleRemove = (productId: number) => {
    removeFromCart({ productId });
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="p-4 text-center w-full h-screen font-semibold text-2xl text-slate-600 flex flex-col justify-center items-center">
        <img src={emptyIcon} className="w-[80%] mx-auto" />

        <span className="mx-auto ">Your cart is empty.</span>
      </div>
    );
  }

  return (
    <div className='flex justify-items-center'>
      <div className="px-5 py-2 h-screen relative">
        <div className="header flex items-center justify-between py-2 font-semibold text-lg">
          <div className="flex items-center space-x-3">
            <img src={shoea} className="w-[14px]" />
            <h1 className="font-semibold">My Cart</h1>
          </div>
          <button>
            <img src={search} className="w-6" />
          </button>
        </div>
        <div className="space-y-4 h-[86%] ">
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
      <div className="ml-4 h-16 items-center bg-slate-50 fixed m-auto bottom-[56px] justify-self-center py-2 flex justify-around w-[370px] ">
        <div className="w-/3 flex flex-col justify-between itmes-start">
          <span className="font-semibold text-xs text-gray-400">
            Total price
          </span>
          <span className="font-bold text-base">${10000}.00</span>
        </div>
        <div className="w-2/3 py-2 bg-slate-950 text-slate-50 shadow-sm drop-shadow-lg  shadow-slate-500 items-center justify-center rounded-3xl my-3">
          <Link to={"/checkout"}>
            <button className="flex flex-row space-x-3 justify-center items-center mx-auto">
              <span className="font-semibold text-base ">Checkout</span>
              <img src={nextCheckout} className="w-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
