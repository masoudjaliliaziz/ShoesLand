import { productHooks, wishlistHooks } from "../../api/queryClinet";
import { UserProps } from "../base/Interfaces";
import { BrandNav } from "./BrandNav";
import { ProductProps } from "./ProductCard";
import ProductCard from "./ProductCard";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../component/base/Loading";
import { GoHeartFill } from "react-icons/go";

interface FilterState {
  search?: any;
  brand?: any;
  wishList?: string | string[];
  mostPopular?: string | string[];
  home?: string | string[];
}

export type FilterAction = {
  type: "search" | "brand" | "wishList" | "mostPopular" | "home";
  value: string | string[];
};

interface ProductListProps {
  dispatchCaller: FilterAction;
}

// export const UserContext = createContext("");

function filterReducer(state: FilterState, action: FilterAction) {
  switch (action.type) {
    case "search":
      return { search: action.value };
    case "brand": {
      if (action.value) {
        const currentBrands = state.brand || [];
        const updatedBrands = currentBrands.includes(action.value)
          ? currentBrands.filter((brand: string) => brand !== action.value)
          : [...currentBrands, action.value];
        return { brand: updatedBrands };
      } else {
        return { brand: [] };
      }
    }
    case "wishList":
      return { wishList: action.value };
    case "mostPopular":
      return { mostPopular: action.value };
    case "home":
      return { home: action.value };
  }
}

function ProductList({ dispatchCaller }: ProductListProps) {
  const navigate = useNavigate();
  let brands: string[] = [];
  const [filter, dispatch] = useReducer<
    (arg0: FilterState, arg1: FilterAction) => FilterState
  >(filterReducer, {});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(dispatchCaller);
  }, [dispatchCaller]);

  console.log(filter);

  let hookResult;

  if (filter.brand) {
    hookResult = productHooks.useFetchProductByBrand(filter.brand);
  } else if (filter.wishList) {
    hookResult = wishlistHooks.useFetchWishlist();
  } else if (filter.search) {
    hookResult = productHooks.useSearchProducts(filter.search);
  } else if (filter.mostPopular) {
    hookResult = productHooks.useFetchPopularProducts();
  } else {
    hookResult = productHooks.useFetchProducts();
  }

  const { data, isLoading, error } = hookResult;

  let filteredProducts;
  if (isLoading) return <Loading />;
  if (error instanceof Error) filteredProducts = [];
  else filteredProducts = data;
  const totalItems = filteredProducts && filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log(hookResult);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="flex w-full flex-col space-y-3 px-2 pb-10" key={11}>
      <BrandNav filter={filter} dispatch={dispatch} />
      <div className="w-full  grid grid-cols-2 felx space-y-3 place-content-center justify-center items-center gap-4">
        {paginatedProducts.length == 0 && (
          <div className="col-span-2 flex flex-col justify-center content-center items-center">
            <div className="col-span-2 space-y-80 w-full mt-10 h-[98%]">
              <div className="flex flex-col space-y-7 justify-center content-center items-center">
                <div className="text-6xl  font-bold text-slate-700">Oops!</div>
                <p className="text-lg text-gray-500 mt-2 mx-4 text-center">
                  We couldn’t find any products matching your search.
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-16 h-16 text-gray-300 mt-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01M12 2.25a9.75 9.75 0 1 1-9.75 9.75A9.75 9.75 0 0 1 12 2.25Z"
                  />
                </svg>
              </div>

              <span className="text-center grid items-center text-xl font-bold text-zinc-600 py-7 justify-items-center">
                <p>
                  MADE WITH
                </p>
                <p>
                  <GoHeartFill className="mx-1 fill-rose-400" />
                </p>
                <p>
                  BY G-3
                </p>
              </span>
            </div>
          </div>
        )}
        {paginatedProducts.map((item: ProductProps) => (
          <Link key={item.id} to={`/product/${item.id}`}>
            {filter.wishList || filter.search ? (
              <ProductCard {...item} show_more={true} />
            ) : (
              <ProductCard {...item} show_more={false} />
            )}
          </Link>
        ))}
      </div>
      {paginatedProducts.length ? (
        <div className="flex justify-center items-center pb-2 pt-2 mb-[20rem]">
          <button
            className={`px-2 py-1 mx-1 border rounded-full text-xs ${currentPage === 1
              ? "text-gray-300 cursor-not-allowed "
              : "text-gray-600 hover:bg-blue-100 font-bold"
              }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-2 py-1 mx-1 border rounded-full  text-xs ${page === currentPage
                ? "text-gray-300 cursor-not-allowed "
                : "text-gray-600 hover:bg-blue-100 font-bold"
                }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className={`px-2 py-1 mx-1 border rounded-full text-xs ${currentPage === totalPages || totalPages === 0
              ? "text-gray-300 cursor-not-allowed "
              : "text-gray-600 hover:bg-blue-100 font-bold"
              }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default ProductList;
