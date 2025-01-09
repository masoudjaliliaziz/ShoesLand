import { useContext } from "react";
import ProductList from "../component/product/ProductList";
import { useNavigate, useParams } from "react-router-dom";
import Backward from '../assets/Backward.svg'
function Brand() {
  const { brand } = useParams();
  const navigate = useNavigate()
  return (
    <div className="w-full h-full flex-col justify-between items-center p-3 text-start left-0">
      <div className="font-bold leading-5  flex justify-item-center space-x-1">
        <button onClick={() => navigate(-1)}>
          <img src={Backward} alt="back" className="w-6 mr-1" />
        </button>
        <span className="text-xl">{brand}</span>
      </div>

      <ProductList
        dispatchCaller={{ type: "brand", value: [brand.toLowerCase()] }}
      />
    </div>

  );
}
export default Brand;
