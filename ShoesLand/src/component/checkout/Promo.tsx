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
    <div className="promo-code py-2 mb-4">
      <h2 className="font-semibold text-base leading-7 my-4 justify-items-center">Promo Code</h2>
      {selectedDiscount ? (
        <div className='text-white bg-black rounded-full p-3 inline my-2' >
          <p className='inline font-semibold' >Discount: {selectedDiscount}% Off</p>
          <button onClick={removeDiscount} className='inline mx-3'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="justify-center items-center size-4 inline mb-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
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
