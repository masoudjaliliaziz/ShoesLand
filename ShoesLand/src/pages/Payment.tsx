import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  clearDiscount,
  selectDiscount,
  selectFinalTotal,
} from "../config/slice";
import { cartHooks, orderHooks } from "../api/queryClinet";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import plus from "../assets/plus.svg";
import wallet from "../assets/wallet-svgrepo-com.svg";
import paypal from "../assets/paypal-svgrepo-com.svg";
import google from "../assets/google-color-svgrepo-com.svg";
import apple from "../assets/apple-173-svgrepo-com.svg";
import MasterCard from "../assets/MasterCard.svg";
import Loading from "../component/base/Loading";

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
  const { mutate, isPending } = orderHooks.useCreateOrder();
  const { data, isLoading } = cartHooks.useFetchCart();
  const selectedDiscount = useSelector(selectDiscount);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading || isPending) return <Loading />;
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
          alert("Order created");
          clearDiscount();
          setIsModalOpen(true);
        },
      }
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/orders");
  };

  return (
    <div className="h-screen px-5">
      <div className="flex flex-row justify-between items-center py-3">
        <div className="flex flex-row items-center space-x-2">
          <button onClick={() => navigate(-1)}>
            <IoMdArrowRoundBack className="w-7" />
          </button>
          <h2 className="font-semibold text-base">Payment Method</h2>
        </div>
        <button>
          <img src={plus} className="w-6" />
        </button>
      </div>
      <div className="pb-4 pt-1 font-semibold text-sm text-gray-500">
        <span>Select the payment method you want to use.</span>
      </div>
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <div
            className="bg-white flex flex-row justify-between items-center px-4 py-7 rounded-lg"
            key={method.id}
            onClick={() => handlePaymentMethodSelect(method.name)}
          >
            <div className="flex flex-row space-x-2 items-center">
              <img className="w-8" src={method.icon} />
              <span className="font-semibold text-sm">{method.name}</span>
            </div>
            <div className="flex flex-row items-center space-x-2">
              {selectedPaymentMethod === method.name && (
                <span className="font-semibold text-md text-gray-700">
                  ${finalTotal}
                </span>
              )}
              <input
                type="radio"
                name="method"
                id="method"
                className="w-5 h-5 accent-black"
                checked={selectedPaymentMethod === method.name}
                readOnly
              />
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleCreateOrder}>
        <div className="fixed bottom-4 w-[420px] mx-auto">
          <div className="h-1/2 bg-black font-semibold text-base py-4 text-center text-white w-[85%] rounded-full">
            <span className="font-semibold text-sm text-white py-5">
              Confirm Payment
            </span>
          </div>
        </div>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white px-10 rounded-3xl shadow-lg max-w-2/5 h-1/2 flex-col items-center justify-center">
            <img src="/img/PaymentConfirm.png" alt="img" className="scale-90" />
            <h3 className="text-lg font-bold mb-4 text-center">
              Order Successful!
            </h3>
            <p className="text-gray-600 mb-4 text-center">
              You have successfully made order
            </p>
            <button
              className="bg-black text-white font-semibold w-full px-4 py-4 rounded-full hover:bg-gray-800"
              onClick={closeModal}
            >
              View Orders
            </button>
            <button
              className="bg-gray-200 font-semibold mt-3 text-gray-800 w-full px-4 py-4 rounded-full hover:bg-gray-400"
              onClick={closeModal}
            >
              View E-Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
