import React, { useState, useEffect } from "react";
import { addressHooks, cartHooks } from "../api/queryClinet";
import AddressSelection from "../component/checkout/Address";
import OrderSummary from "../component/checkout/OrderSummary";
import PromoCode from "../component/checkout/Promo";
import ShippingSelection from "../component/checkout/Shipping";
import OrderItems from "../component/checkout/OrderItems";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectDiscount } from "../config/slice";
import backward from "../assets/Backward.svg";
import more from "../assets/more.svg";
import { useNavigate } from "react-router-dom";
import EditePen from "../assets/Edit.svg";
import Location from "../assets/Location.svg";
import chevronRight from "../assets/chevronRight.svg";
import Truck from "../assets/truck.svg";
import nextCheckout from "../assets/nextCheckout.svg";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [shippingMethod, setShippingMethod] = useState(null);
  const selectedDiscount = useSelector(selectDiscount);
  const [isSelectingAddress, setIsSelectingAddress] = useState(false);
  const [isSelectingShipping, setIsSelectingShipping] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

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
    setFinalTotal(total);
  }, [cartItems, shippingCost, selectedDiscount]);
  if (selectedAddressLoading || cartItemLoading) {
    return <div>loading...</div>;
  }
  return (
    <div className="checkout px-5 pb-1">
      <div className="header flex items-center justify-between py-4 font-semibold text-lg">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)}>
            <img src={backward} alt="backward" className="w-7" />
          </button>
          <h1 className="font-bold">Checkout</h1>
        </div>
        <button>
          <img src={more} className="w-6" />
        </button>
      </div>

      {/* Selected Address */}
      <div className="w-full flex flex-col relative after:absolute pb-2  after:w-full after:h-full  after:top-0 after:left-0 after:border-b-2 after:border-b-solid after:border-b-gray-100 after:pointer-events-none">
        <h2 className="font-semibold text-base leading-7">Shipping Address</h2>
        <div className="w-[95%] bg-white my-3 flex flex-row justify-between items-center mx-auto rounded-xl px-3 py-2 shadow-md shadow-slate-200 transition-shadow">
          <div className="flex flex-row items-center space-x-2">
            <div className="locationIcon">
              <div className="bg-gray-200 rounded-full w-9 p-1.5 items-center">
                <img
                  src={Location}
                  alt="location"
                  className="size-6 rounded-full bg-slate-800 p-1"
                />
              </div>
            </div>
            <div className="felx flex-col space-y-0">
              <h3 className="font-semibold text-base leading-none">Home</h3>
              <span className="font-semibold text-xs leading-none text-gray-500">
                61480 sunbrook pork, pc 5679
              </span>
            </div>
          </div>
          {selectedAddress ? (
            <div onClick={() => setIsSelectingAddress(true)} className="">
              <p>{selectedAddress.address}</p>
              <p>
                {selectedAddress.name}, {selectedAddress.address}
              </p>
            </div>
          ) : (
            <button>
              <img src={EditePen} alt="EditLocation" className="size-6" />
            </button>
          )}
        </div>
      </div>

      {/* Only render AddressSelection if needed */}
      {isSelectingAddress && (
        <AddressSelection onClose={() => setIsSelectingAddress(false)} />
      )}

      {/* Cart Items */}
      <OrderItems orderItems={cartItems} />

      {/* Shipping Methods */}
      <div className=" relative after:absolute pb-2 after:w-full after:h-full  after:top-0 after:left-0 after:border-b-2 after:border-b-solid after:border-b-gray-100 after:pointer-events-none">
        <h2 className="py-2 font-semibold text-base leading-7">
          Choose Shipping
        </h2>
        {shippingMethod ? (
          <div
            onClick={() => setIsSelectingShipping(true)}
            style={{ cursor: "pointer" }}
          >
            <p>
              {shippingMethod.name} - ${shippingMethod.cost}
            </p>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-between mb-2 bg-white shadow-sm shadow-slate-300 px-2 py-3 rounded-xl">
            <div className="flex flex-row items-center space-x-2">
              <img src={Truck} className="w-6" />
              <span className="font-semibold text-sm text-black">
                Choose Shipping Type
              </span>
            </div>
            <div className="w-5 h-5">
              <Link to={"/ChooseShipping"}>
                <button onClick={() => setIsSelectingShipping(true)}>
                  <img src={chevronRight} className="w-5" />
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      {/* 
     
      {isSelectingShipping && (
        <ShippingSelection
          options={[
            { id: 1, name: "Standard Shipping", cost: 20 },
            { id: 2, name: "Express Shipping", cost: 50 },
          ]}
          onSelect={(method) => {
            setShippingMethod(method);
            setShippingCost(method.cost);
            setIsSelectingShipping(false);
          }}
          onClose={() => setIsSelectingShipping(false)}
        />
      )} */}

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
      <div className="py-3 bg-slate-950 text-slate-50 items-center justify-center rounded-3xl my-3">
        <Link to={"/payment"}>
          <button className="flex flex-row space-x-3 justify-center items-center mx-auto">
            <span className="font-semibold text-base">Continue to Payment</span>
            <img src={nextCheckout} className="w-4" />
          </button>
        </Link>
      </div>
    </div>
  );
};
export default CheckoutPage;
