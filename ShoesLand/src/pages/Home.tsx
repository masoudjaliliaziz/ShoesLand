import { useContext, useState } from "react";
import ProductList from "../component/product/ProductList";
import { FilterAction } from "../component/product/ProductList";
import { Link } from "react-router-dom";
import ProductBrand from "../component/product/ProductBrand";

function Home() {

  return (
    <div className="w-full mb-10">
      <Link to="search">
        <>
          <div
            className="w-full py-1.5 border border-gray-300 rounded-lg shadow-sm 
            justify-items-center flex mb-4
            focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          >
            <button
              className="   transform w-[10%] pl-1.5  text-gray-500
           hover:text-blue-500 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.0"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
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

      <ProductList
        dispatchCaller={{ type: "home", value: "true" }}
      />
    </div>
  );
}

export default Home;
