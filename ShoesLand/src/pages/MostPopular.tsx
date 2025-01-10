import { useNavigate } from "react-router-dom";
import ProductList from "../component/product/ProductList";
import { IoMdArrowRoundBack } from "react-icons/io";

function MostPopular() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex-col justify-between items-center p-3 text-start left-0 ">
      <div className="font-bold leading-5  flex justify-item-center space-x-1">
        <button onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack className="w-6 mr-1" />
        </button>
        <span className="text-xl">Popular</span>
      </div>
      <ProductList dispatchCaller={{ type: "mostPopular", value: "true" }} />
    </div>
  );
}

export default MostPopular;
