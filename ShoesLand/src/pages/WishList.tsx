import React, { useContext } from "react";
import ProductList from "../component/product/ProductList";
import { Link, useNavigate } from "react-router-dom";

function WishList() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full flex flex-row justify-between items-center text-start left-0">
        <div className="font-bold leading-5  flex justify-item-center space-x-1">
          <svg
            onClick={() => navigate(-1)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="size-7 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h15"
            />
          </svg>
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
