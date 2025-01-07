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
    <div className="promo-code py-2 relative after:absolute pb-2 after:w-full after:h-full  after:top-0 after:left-0 after:border-b-2 after:border-b-solid after:border-b-gray-100 after:pointer-events-none">
      <h2 className="font-semibold text-base leading-7">Promo Code</h2>
      {selectedDiscount ? (
        <div>
          <p>Discount: {selectedDiscount}% off</p>
          <button onClick={removeDiscount}>Remove Discount</button>
        </div>
      ) : (
        <div className="flex flex-col py-2 space-y-2">
          <div className="w-full flex felx-row justify-between items-center space-x-3">
            <input
              className="w-[90%] bg-zinc-200 px-3 py-2 rounded-xl"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter promo code"
            />
            <button
              className="w-5 h-4 flex felx-col items-center"
              onClick={applyDiscount}
            >
              <span className="px-2 py-1 text-center text-base font-bold leading-none text-white bg-slate-800 rounded-full">
                +
              </span>
            </button>
          </div>
          {error && <span className="text-rose-600 px-2 leading-none text-sm font-semibold ">{error}</span>}
        </div>
      )}
    </div>
  );
};

export default PromoCode;
