import React, { useContext } from "react";
import ProductList from "../component/product/ProductList";
import { Link, useNavigate } from "react-router-dom";
import Backward from '../assets/Backward.svg'
function WishList() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full flex flex-row justify-between items-center text-start left-0">
        <div className="font-bold leading-5  flex justify-item-center space-x-1">
          <img src={Backward} alt='back' className='w-7' onClick={() => navigate(-1)} />
          <span className="text-xl">Wishlist</span>
        </div>
        <Link to="/popular">
          <h1 className="font-semibold MostPopularpage cursor-pointer leading-5 text-lg hover:text-slate-500"></h1>
        </Link>
      </div>
      <ProductList
        dispatchCaller={{ type: "wishList", value: "true" }}
      />
    </>
  );
}

export default WishList;
