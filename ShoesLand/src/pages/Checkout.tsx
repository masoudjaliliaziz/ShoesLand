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
    <div className="checkout px-5">
      <div className="header flex items-center justify-between py-4 font-semibold text-lg">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)}>
            <img src={backward} alt="backward" className="w-7" />
          </button>
          <h1 className="font-bold">Checkout</h1>
        </div>
        <img src={more} className="w-6" />
      </div>

      {/* Selected Address */}
      <div className="w-full flex flex-col">
        <h2 className="font-semibold text-sm">Shipping Address</h2>
        <div className="w-[90%] bg-pink-500 ">
          <div>
            <div className="locationIcon">
             <div>
            
             </div>
              <img src={Location} alt="location" className="size-6" />
            </div>
            <div>
              <h3>Home</h3>
              <span>61480 sunbrook pork, pc 5679</span>
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
            <img src={EditePen} alt="EditLocation" className="size-6" />
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
      <div>
        <h2>Shipping</h2>
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
          <button onClick={() => setIsSelectingShipping(true)}>
            Select Shipping
          </button>
        )}
      </div>

      {/* Only render ShippingSelection if needed */}
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
      )}

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
      <Link to={"/payment"}>
        <button>Continue to Payment</button>
      </Link>
    </div>
  );
};
export default CheckoutPage;
