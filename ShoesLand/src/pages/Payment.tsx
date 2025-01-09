import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  clearDiscount,
  selectDiscount,
  selectFinalTotal,
} from "../config/slice";
import { cartHooks, orderHooks } from "../api/queryClinet";
import { Link, useNavigate } from "react-router-dom";
import Backward from "../assets/Backward.svg";
import plus from "../assets/plus.svg";
import wallet from "../assets/wallet-svgrepo-com.svg";
import paypal from "../assets/paypal-svgrepo-com.svg";
import google from "../assets/google-color-svgrepo-com.svg";
import apple from "../assets/apple-173-svgrepo-com.svg";
import userpen from "../assets/user-pen-alt-svgrepo-com.svg";
import MasterCard from "../assets/MasterCard.svg";

const paymentMethods = [
  { id: 1, name: "My Wallet", icon: wallet },
  { id: 2, name: "PayPal", icon: paypal },
  { id: 3, name: "Google Pay", icon: google },
  { id: 4, name: "Apple Pay", icon: apple },
  { id: 5, name: ".... .... .... 4679", icon: MasterCard },
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
    <div className="h-screen px-5">
      <div className="flex flex-row justify-between items-center py-3">
        <div className="flex flex-row  items-center space-x-2">
          <button onClick={() => navigate(-1)}>
            <img src={Backward} alt="back" className="w-7" />
          </button>
          <h2 className="font-semibold text-base">Select Payment Method</h2>
        </div>
        <button>
          <img src={plus} className="w-6" />
        </button>
      </div>
      <div className="pb-4 pt-1 font-semibold text-sm text-gray-500">
        <span>Select the payment method you want to use.</span>
      </div>
      <div className=" space-y-3">
        {paymentMethods.map((method) => (
          <div
            className="bg-white flex flex-row justify-between items-center px-4 py-7 rounded-lg "
            key={method.id}
            onClick={() => handlePaymentMethodSelect(method.name)}
          >
            <div className="flex felx-row space-x-2 justify-center items-center">
              <img className="w-8" src={method.icon} />
              <span className="font-semibold text-sm ">{method.name}</span>
            </div>
            <div className="flex flex-row items-center space-x-2">

              {selectedPaymentMethod == method.name &&
                <span className="font-semibold text-md text-gray-700"> ${finalTotal}</span>
              }
              <input type="radio" name="method" id="method"
                className="w-5 h-5 accent-black"
                checked={selectedPaymentMethod == method.name}
              />
            </div>
          </div>
        ))}
      </div>

      {/* {selectedPaymentMethod && (
        <div>
          <h3>You have selected: {selectedPaymentMethod}</h3>
        </div>
      )} */}
      <button onClick={handleCreateOrder} >
        <div className=" fixed bottom-4 w-[420px] mx-auto">
          <div className="h-1/2 bg-black font-semibold text-base py-4 text-center text-white w-[85%] rounded-full">
            <span className="font-semibold text-sm text-white py-5">
              Confrim Payment
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Payment;
