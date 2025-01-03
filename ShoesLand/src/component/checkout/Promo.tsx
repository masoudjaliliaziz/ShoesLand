import React, { useState } from "react";
import { useFetch } from "../../api/queryClinet";

const PromoCode = ({ selectedDiscount, setSelectedDiscount }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const { data: discountData, isSuccess } = useFetch({
    key: `discount-${code}`,
    url: `/api/discount/${code}`,
    authRequired: true,
  });

  const applyDiscount = () => {
    if (isSuccess && discountData) {
      setSelectedDiscount(discountData);
      setError("");
    } else {
      setError("Invalid discount code.");
    }
  };

  const removeDiscount = () => {
    setSelectedDiscount(null);
    setCode("");
    setError("");
  };

  return (
    <div className="promo-code">
      <h2>Promo Code</h2>
      {selectedDiscount ? (
        <div>
          <p>Discount: {selectedDiscount.discount}% off</p>
          <button onClick={removeDiscount}>Remove Discount</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter promo code"
          />
          <button onClick={applyDiscount}>Apply</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default PromoCode;
