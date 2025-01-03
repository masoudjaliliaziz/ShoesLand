import { useState } from "react";
import { useFetch } from "../../api/queryClinet";
import { store } from "../../config/store";
import { selectDiscount, setDiscount } from "../../config/slice";
import { useSelector } from "react-redux";

const PromoCode = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const selectedDiscount = useSelector(selectDiscount);
  console.log(selectedDiscount);
  const { data: discountData, isSuccess } = useFetch({
    key: `discount-${code}`,
    url: `/api/discount/${code}`,
    authRequired: true,
  });

  const applyDiscount = () => {
    if (isSuccess && discountData) {
      store.dispatch(setDiscount(discountData.discount));
      setError("");
    } else {
      setError("Invalid discount code.");
    }
  };

  const removeDiscount = () => {
    store.dispatch(setDiscount(""));
    setCode("");
    setError("");
  };

  return (
    <div className="promo-code">
      <h2>Promo Code</h2>
      {selectedDiscount ? (
        <div>
          <p>Discount: {selectedDiscount}% off</p>
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
