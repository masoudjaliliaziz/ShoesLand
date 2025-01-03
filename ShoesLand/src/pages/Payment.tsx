import React, { useState } from "react";
import { useSelector } from "react-redux";
import { clearDiscount, selectDiscount } from "../config/slice";
import { cartHooks, orderHooks } from "../api/queryClinet";

const paymentMethods = [
  { id: 1, name: "Credit Card", icon: "💳" },
  { id: 2, name: "PayPal", icon: "💰" },
  { id: 3, name: "Bank Transfer", icon: "🏦" },
];

const Payment: React.FC = () => {
  const { mutate } = orderHooks.useCreateOrder();
  const { data, isLoading } = cartHooks.useFetchCart();
  const selectedDiscount = useSelector(selectDiscount);
  console.log(selectedDiscount);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  if (isLoading) return <div>Loading...</div>;
  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
  };
  const handleCreateOrder = () => {
    mutate(
      {
        products: data,
        discount: selectedDiscount,
      },
      {
        onSuccess: () => {
          alert("ordercreated");
          clearDiscount();
        },
      }
    );
  };
  return (
    <div>
      <h2>Select Payment Method</h2>

      <div>
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => handlePaymentMethodSelect(method.name)}
          >
            <span>{method.icon}</span>
            <span>{method.name}</span>
          </div>
        ))}
      </div>

      {selectedPaymentMethod && (
        <div>
          <h3>You have selected: {selectedPaymentMethod}</h3>
        </div>
      )}

      <div>
        {selectedPaymentMethod && (
          <button onClick={handleCreateOrder}>
            Proceed with {selectedPaymentMethod}
          </button>
        )}
      </div>
    </div>
  );
};

export default Payment;
