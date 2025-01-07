import React from "react";

type OrderSummaryProps = {
  totalAmount: number;
  shippingCost: number;
  discountAmount: number;
  finalTotal: number;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  totalAmount,
  shippingCost,
  discountAmount,
  finalTotal,
}) => {
  return (
    <div className="relative pb-4 after:absolute after:w-full after:h-full after:top-0 after:left-0 after:border-b-2 after:border-b-solid after:border-b-gray-100 after:pointer-events-none">
      <div className="order-summary pb-2 bg-white rounded-xl px-3 py-2 ">
        <div className="felx felx-col space-y-3 relative pb-3 after:absolute after:w-full after:h-full after:top-0 after:left-0 after:border-b-2 after:border-b-solid after:border-b-gray-100 after:pointer-events-none">
          <div className="flex flex-row  justify-between items-center px-1 font-semibold text-sm">
            <span className="text-zinc-500">Amount:</span>
            <span className="text-zinc-700"> ${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex flex-row justify-between items-center px-1 font-semibold text-sm">
            <span className="text-zinc-500">Shipping:</span>
            <span className="text-zinc-700">${shippingCost.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex flex-row py-3 justify-between items-center px-1 font-semibold text-sm">
          
            <span className="text-zinc-500">Total:</span>
          
            <span className="text-zinc-700">${finalTotal.toFixed(2)}</span>
         
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
