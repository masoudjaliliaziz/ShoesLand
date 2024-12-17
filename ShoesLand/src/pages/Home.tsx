import { useContext, useState } from "react";
import ProductList from "../component/product/ProductList";
import { ApiContext } from "../component/base/Api";
import { FilterAction } from "../component/product/ProductList";
import { Link } from "react-router-dom";

function Home() {
  const apiContext = useContext(ApiContext);

  return (
    <div className="w-full h-screen px-8">
      <div className="relative mb-5 mt-10 px-0">
        <Link to="search">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-12 pr-10 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          />
          <button className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500 hover:text-blue-500 focus:outline-none">
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
        </Link>
      </div>

      {apiContext && (
        <ProductList
          products={apiContext.data}
          productSet={apiContext.setData}
          dispatchCaller={dispatch}
        />
      )}
    </div>
  );
}

export default Home;
