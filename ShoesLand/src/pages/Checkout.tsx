import React, { useState, useEffect } from "react";
import { addressHooks, cartHooks } from "../api/queryClinet";
import AddressSelection from "../component/checkout/Address";
import OrderSummary from "../component/checkout/OrderSummary";
import PromoCode from "../component/checkout/Promo";
import ShippingSelection from "../component/checkout/Shipping";
import OrderItems from "../component/checkout/OrderItems";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDiscount,
  selectFinalTotal,
  setFinalTotal,
} from "../config/slice";
import { IoMdArrowRoundBack } from "react-icons/io";
import more from "../assets/more.svg";
import { useNavigate } from "react-router-dom";
import EditePen from "../assets/Edit.svg";
import Location from "../assets/Location.svg";
import Loading from "../component/base/Loading";
import chevronRight from "../assets/chevronRight.svg";
import Truck from "../assets/Truck.svg";
import Box from "../assets/Box.svg";
import nextCheckout from "../assets/nextCheckout.svg";
import ChooseShipping, {
  ShippingOption,
} from "../component/checkout/ChooseShipping";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shippingMethod, setShippingMethod] = useState<ShippingOption | null>(
    null
  );
  const selectedDiscount = useSelector(selectDiscount);
  const finalTotal = useSelector(selectFinalTotal);
  const [isSelectingAddress, setIsSelectingAddress] = useState(false);
  const [isSelectingShipping, setIsSelectingShipping] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  const { data: selectedAddress, isLoading: selectedAddressLoading } =
    addressHooks.useFetchSelectedAddress();
  const { data: cartItems, isLoading: cartItemLoading } =
    cartHooks.useFetchCart();

  useEffect(() => {
    const amount =
      cartItems?.reduce((sum, item) => sum + item.total_price, 0) || 0;
    const discount = selectedDiscount ? (amount * selectedDiscount) / 100 : 0;
    const total = amount + shippingCost - discount;

    setTotalAmount(amount);
    setDiscountAmount(discount);
    dispatch(setFinalTotal(total));
  }, [cartItems, shippingCost, selectedDiscount]);

  console.log(discountAmount);
  if (selectedAddressLoading || cartItemLoading) {
    return <Loading />;
  }

  console.log(finalTotal);
  console.log(cartItems);
  if (isSelectingShipping)
    return (
      <ChooseShipping
        onSelect={(method) => {
          setShippingMethod(method);
          setShippingCost(method.cost);
          setIsSelectingShipping(false);
        }}
        onClose={() => {
          setIsSelectingShipping(false);
        }}
        selectedMethod={shippingMethod}
      />
    );
  if (isSelectingAddress)
    return (
      <AddressSelection
        onClose={() => {
          setIsSelectingAddress(false);
        }}
      />
    );

  return (
    <div className="checkout px-5 pb-1">
      <div className="header flex items-center justify-between py-4 font-semibold text-lg">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)}>
            <IoMdArrowRoundBack className="w-6 mr-1" />
          </button>
          <h1 className="font-semibold">Checkout</h1>
        </div>
        <button>
          <img src={more} className="w-6" />
        </button>
      </div>

      {/* Selected Address */}
      <div className="w-full flex flex-col relative after:absolute pb-2  after:w-full after:h-full  after:top-0 after:left-0 after:border-b-2 after:border-b-solid after:border-b-gray-100 after:pointer-events-none">
        <h2 className="font-semibold text-base leading-7">Shipping Address</h2>
        <div
          className="w-[95%] bg-white my-3 flex flex-row justify-between items-center mx-auto rounded-xl px-3 py-4 shadow-md shadow-slate-200 transition-shadow"
          onClick={() => setIsSelectingAddress(true)}
        >
          <div className="flex flex-row items-center space-x-2">
            <div className="locationIcon">
              <div className="bg-gray-200 rounded-full w-9 p-1.5 items-center">
                <img
                  src={Location}
                  alt="location"
                  className="size-6 rounded-full bg-black p-1"
                />
              </div>
            </div>
            <div className="felx flex-col space-y-1 ml-2">
              {selectedAddress ? (
                <>
                  <h3 className="font-semibold text-base leading-none">
                    {selectedAddress.name}
                  </h3>
                  <span className="font-normal text-xs leading-none text-gray-500">
                    {selectedAddress.address}
                  </span>
                </>
              ) : (
                <span className="font-semibold text-sm text-black">
                  Choose Shipping Type
                </span>
              )}
            </div>
          </div>
          <button>
            <img src={EditePen} alt="EditLocation" className="size-6" />
          </button>
        </div>
      </div>

      {/* Cart Items */}
      <OrderItems orderItems={cartItems} />

      {/* Shipping Methods */}

      <div className="w-full flex flex-col relative after:absolute pb-2  after:w-full after:h-full  after:top-0 after:left-0 after:border-b-2 after:border-b-solid after:border-b-gray-100 after:pointer-events-none">
        <h2 className="font-semibold text-base leading-7">Choose Shipping</h2>
        <div
          className="w-[95%] bg-white my-3 flex flex-row justify-between items-center mx-auto rounded-xl px-3 py-4 shadow-md shadow-slate-200 transition-shadow"
          onClick={() => setIsSelectingShipping(true)}
        >
          <div className="flex flex-row items-center space-x-2">
            <div className="locationIcon">
              <img
                src={Truck}
                alt="location"
                className="size-14 rounded-full bg-black p-4"
              />
            </div>
            <div className="felx flex-col space-y-1 ml-2">
              {shippingMethod ? (
                <>
                  <h3 className="font-semibold text-base leading-none">
                    {shippingMethod.name}
                  </h3>
                  <span className="font-normal text-xs leading-none text-gray-500">
                    {shippingMethod.Description}
                  </span>
                </>
              ) : (
                <span className="font-semibold text-sm text-black">
                  Choose Shipping Type
                </span>
              )}
            </div>
          </div>
          <div className="flex space-x-3">
            {shippingMethod ? (
              <>
                <span className="font-bold text-xl">
                  ${shippingMethod?.cost}
                </span>
                <button>
                  <img src={EditePen} alt="EditLocation" className="size-6" />
                </button>
              </>
            ) : (
              <>
                <button>
                  <img src={EditePen} alt="EditLocation" className="size-6" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {}

      {/* Discount Input */}
      <PromoCode />

      {/* Order Summary */}
      <OrderSummary
        totalAmount={totalAmount}
        shippingCost={shippingCost}
        discountAmount={discountAmount}
        finalTotal={finalTotal}
      />

      {/* Continue to Payment Button */}
      <div className="py-4 bg-black text-slate-50 shadow-sm shadow-slate-500 items-center justify-center rounded-full my-3">
        <Link to={"/payment"}>
          <button className="flex flex-row space-x-3 justify-center items-center mx-auto">
            <span className="font-semibold text-base ">
              Continue to Payment
            </span>
            <img src={nextCheckout} className="w-4" />
          </button>
        </Link>
      </div>
    </div>
  );
};
export default CheckoutPage;
