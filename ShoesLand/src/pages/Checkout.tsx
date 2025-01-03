import React, { useState, useEffect } from "react";
import { addressHooks, cartHooks } from "../api/queryClinet";
import AddressSelection from "../component/checkout/Address";
import OrderSummary from "../component/checkout/OrderSummary";
import PromoCode from "../component/checkout/Promo";
import ShippingSelection from "../component/checkout/Shipping";
import OrderItems from "../component/checkout/OrderItems";

const CheckoutPage = () => {
  const [shippingMethod, setShippingMethod] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
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
    const discount = selectedDiscount
      ? (amount * selectedDiscount.discount) / 100
      : 0;
    const total = amount + shippingCost - discount;

    setTotalAmount(amount);
    setDiscountAmount(discount);
    setFinalTotal(total);
  }, [cartItems, shippingCost, selectedDiscount]);
  if (selectedAddressLoading || cartItemLoading) {
    return <div>loading...</div>;
  }
  return (
    <div className="checkout">
      <h1>Checkout</h1>

      {/* Selected Address */}
      <div>
        <h2>Shipping Address</h2>
        {selectedAddress ? (
          <div
            onClick={() => setIsSelectingAddress(true)}
            style={{ cursor: "pointer" }}
          >
            <p>{selectedAddress.address}</p>
            <p>
              {selectedAddress.name}, {selectedAddress.address}
            </p>
          </div>
        ) : (
          <button onClick={() => setIsSelectingAddress(true)}>
            Select Address
          </button>
        )}
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
      <PromoCode
        selectedDiscount={selectedDiscount}
        setSelectedDiscount={setSelectedDiscount}
      />

      {/* Order Summary */}
      <OrderSummary
        totalAmount={totalAmount}
        shippingCost={shippingCost}
        discountAmount={discountAmount}
        finalTotal={finalTotal}
      />

      {/* Continue to Payment Button */}
      <button onClick={() => alert("Proceeding to payment...")}>
        Continue to Payment
      </button>
    </div>
  );
};
export default CheckoutPage;
