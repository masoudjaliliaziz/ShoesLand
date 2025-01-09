import React, { useState } from "react";
import { CartItem as CartItemType } from "./base/Interfaces";
import stash from "../assets/trash.svg";
import clsx from "clsx";
import Decrease from "../assets/Decrease.svg";
import Increase from "../assets/Increase.svg";

interface CartItemProps {
  item: CartItemType;
  onUpdate: (productId: number, count: number) => void;
  onRemove: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdate, onRemove }) => {
  const [count, setCount] = useState(item.count);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newCount = parseInt(value, 10);

    if (!isNaN(newCount) && newCount > 0) {
      setCount(newCount);
      onUpdate(item.productId, newCount);
    } else if (value === "") {
      setCount(0);
    }
  };

  const handleBlur = () => {
    if (count === 0) {
      setCount(1); onUpdate(item.productId, 1);
    }
  };

  const increaseCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    onUpdate(item.productId, newCount);
  };

  const decreaseCount = () => {
    const newCount = count > 1 ? count - 1 : 1;
    setCount(newCount);
    onUpdate(item.productId, newCount);
  };

  return (
    <div className="flex items-start justify-start p-2 space-x-2 shadow-sm mr-2 shadow-slate-300 bg-white border-b py-2 px-3 rounded-3xl">
      <img
        src={item.images[0]}
        alt={item.name}
        className="w-1/3 h-full rounded-xl m-2"
      />
      <div className="flex flex-col py-2 w-full">
        <div className="flex flex-row justify-between">
          <h4
            className={clsx(
              "font-semibold w-[90%] h-7 overflow-y-hidden",
              item.name.length < 20 ? "text-base" : "text-sx"
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
          <div className="text-sm text-gray-500 font-semibold flex flex-row h-4 justify-item-start items-start">
            <div className="relative justify-items-center flex flex-row space-x-1">
              <div
                className={`bg-${item.color}-500 h-3 w-3 place-self-center inline-flex rounded-full items-center`}
              ></div>
              <span>{item.color}</span>
            </div>
            <span className="px-1">|</span>
            <span>
              size <small>=</small> {item.size}
            </span>
          </div>
          <div className="flex items-center flex-row justify-between">
            <p className="font-semibold text-base">${item.total_price}.00</p>

            <div className="w-20 h-9 rounded-2xl bg-gray-100 flex justify-between items-center px-2 py-[5.5px]">
              <button
                className="text-xs cursor-pointer"
                onClick={decreaseCount}
              >
                <img src={Decrease} className="w-5 pr-1" />
              </button>
              <input
                type="text"
                disabled
                readOnly
                value={count}
                onChange={handleQuantityChange}
                onBlur={handleBlur}
                className="w-5 text-center font-bold bg-gray-100 focus:outline-none"
              />
              <button
                className="text-xs cursor-pointer"
                onClick={increaseCount}
              >
                <img src={Increase} className="w-5 pl-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

