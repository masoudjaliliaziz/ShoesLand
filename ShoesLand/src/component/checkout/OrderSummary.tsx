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
    <div className="order-summary">
      <h2>Order Summary</h2>
      <p>Amount: ${totalAmount.toFixed(2)}</p>
      <p>Shipping: ${shippingCost.toFixed(2)}</p>
      <p>Promo: -${discountAmount.toFixed(2)}</p>
      <h3>Total: ${finalTotal.toFixed(2)}</h3>
    </div>
  );
};

export default OrderSummary;
