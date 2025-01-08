import React, { useState } from "react";
import { useSelector } from "react-redux";
import { clearDiscount, selectDiscount, selectFinalTotal } from "../config/slice";
import { cartHooks, orderHooks } from "../api/queryClinet";
import { Link, useNavigate } from "react-router-dom";
import Backward from "../assets/Backward.svg";
import plus from "../assets/plus.svg";
import wallet from "../assets/wallet-svgrepo-com.svg";
import paypal from "../assets/paypal-svgrepo-com.svg";
import google from "../assets/google-color-svgrepo-com.svg";
import apple from "../assets/apple-173-svgrepo-com.svg";
import userpen from "../assets/user-pen-alt-svgrepo-com.svg"

const paymentMethods = [
  { id: 1, name: "My Wallet", icon: wallet },
  { id: 2, name: "PayPal", icon: paypal },
  { id: 3, name: "Google Pay", icon: google },
  { id: 4, name: "Apple Pay", icon: apple },
  { id: 5, name: ".... .... .... 4679", icon: userpen },

];

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const finalTotal = useSelector(selectFinalTotal);
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
    <div className="h-screen">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row  items-center">
          <button onClick={() => navigate(-1)}>
            <img src={Backward} alt="back" className="w-7" />
          </button>
          <h2>Select Payment Method</h2>
        </div>
        <button>
          <img src={plus} className="w-5" />
        </button>
      </div>
      <span>
        Select the payment method you want to use.
      </span>
      <div className="bg-sky-200 space-y-2">
        {paymentMethods.map((method) => (
          <div className="bg-rose-300"
            key={method.id}
            onClick={() => handlePaymentMethodSelect(method.name)}
          >
            <img className='w-4 bg-green-300 ' src={method.icon} />
            <span>{method.name}</span>
            <br />
            <span> {finalTotal}</span>
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
