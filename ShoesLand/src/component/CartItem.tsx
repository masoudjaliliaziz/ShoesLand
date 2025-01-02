import React from "react";
import { CartItem as CartItemType } from "./base/Interfaces";

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
  console.log(item)

  return (
    <div className="flex items-center justify-between border-b py-2">
      <img
        src={item.images[0]}
        alt={item.name}
        className="w-16 h-16 rounded"
      />
      <div className="flex-1 ml-4">
        <h4 className="font-bold">{item.name}</h4>
        <p className="text-gray-500">
          Color: {item.color} | Size: {item.size}
        </p>
        <p className="text-gray-500">Product ID: {item.productId}</p>
      </div>
      <div className="flex items-center">
        <input
          type="number"
          min="1"
          value={item.count}
          onChange={handleQuantityChange}
          className="w-12 border text-center"
        />
        <button
          onClick={() => onRemove(item.productId)}
          className="ml-2 text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;

