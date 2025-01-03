import { useContext, useState } from "react";
import ProductList from "../component/product/ProductList";
import { FilterAction } from "../component/product/ProductList";
import { Link } from "react-router-dom";
import ProductBrand from "../component/product/ProductBrand";
import searchIcon from "../assets/SearchIcon.svg";
import HeaderHome from "../component/product/HeaderHome";

function Home() {
  return (
    <div className="w-full mb-10">
      <HeaderHome />
      <Link to="search">
        <>
          <div
            className="w-full h-9 items-center py-1.5 border border-gray-300 rounded-lg shadow-sm 
            justify-items-center flex mb-4 mx-auto
            focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          >
            <button
              className="   transform w-[10%] pl-1.5  text-gray-500
           hover:text-blue-500 focus:outline-none"
            >
              <img src={searchIcon} className="size-6" />
            </button>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent"
            />
          </div>
        </>
      </Link>
      <ProductBrand />

      <ProductList dispatchCaller={{ type: "home", value: "true" }} />
    </div>
  );
}

export default Home;
