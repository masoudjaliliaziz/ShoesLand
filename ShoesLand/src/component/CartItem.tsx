import React from "react";
import { CartItem as CartItemType } from "./base/Interfaces";
import stash from "../assets/trash.svg";
import clsx from "clsx";

interface CartItemProps {
  item: CartItemType;
  onUpdate: (productId: number, count: number) => void;
  onRemove: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdate, onRemove }) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = parseInt(e.target.value, 10);
    onUpdate(item.productId, isNaN(newCount) ? 1 : newCount);
  };
  console.log(item);

  return (
    <div className="flex items-start justify-start space-x-2 shadow-sm mr-2 shadow-slate-300 bg-white border-b py-2 px-3 rounded-3xl">
      <img
        src={item.images[0]}
        alt={item.name}
        className="w-1/3 h-full rounded-xl"
      />
      <div className=" flex flex-col py-2 w-full ">
        <div className="flex flex-row  justify-between">
          <h4
            className={clsx(
              "font-semibold w-[90%] h-7 overflow-y-hidden",
              item.name.length < 20 ? " text-base" : "text-sx"
            )}
          >
            {item.name}
          </h4>
          <button
            onClick={() => onRemove(item.productId)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            <img src={stash} className="w-5" />
          </button>
        </div>
        <div className="flex flex-col space-y-2 py-2 h-1/2">

        <div className="text-sm text-gray-500  font-semibold flex flex-row h-4 justify-item-start items-start ">
          <div
            className="relative justify-items-center flex flex-row space-x-1"
          >
            <div
              className={`bg-${item.color}-500 h-3 w-3  place-self-center inline-flex rounded-full items-center`}
            ></div>

            <span className=""> {item.color}</span>
          </div>
          <span className="px-1">|</span>
          <span>
            size <small>=</small> {item.size}
          </span>
        </div>
        <div className="flex items-center flex-row justify-between">
          <p className="font-semibold text-base">${item.total_price}.00</p>
          <input
            type="number"
            min="1"
            value={item.count}
            onChange={handleQuantityChange}
            className="w-12 border-none text-center bg-transparent outline-none font-semibold text-base"
            />
        </div>
            </div>
      </div>
    </div>
  );
};

export default CartItem;
