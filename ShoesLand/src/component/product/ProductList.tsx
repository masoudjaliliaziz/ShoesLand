import { ApiContext } from "../base/Api";
import { UserProps } from "../base/Interfaces";
import { ProductProps } from "./ProductCard";
import ProductCard from "./ProductCard";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface FilterState {
  search: string;
  brand: string;
  wishList: string;
  mostPopular: string;
  home: string;
}

export type FilterAction = {
  type: "search" | "brand" | "wishList" | "mostPopular" | "home";
  value: string;
};

interface ProductListProps {
  products: ProductProps[];
  productSet: React.Dispatch<React.SetStateAction<ProductProps[]>>;
  dispatchCaller: FilterAction;
}

// export const UserContext = createContext("");

function filterReducer(state: FilterState, action: FilterAction) {
  const clone = {
    search: "",
    brand: "",
    wishList: "",
    mostPopular: "",
    home: "",
  };
  switch (action.type) {
    case "search":
      return { ...clone, search: action.value };
    case "brand":
      return { ...clone, brand: action.value };
    case "wishList":
      return { ...clone, wishList: action.value };
    case "mostPopular":
      return { ...clone, mostPopular: action.value };
    case "home":
      return { ...clone, home: action.value };
  }
}

function ProductList({ dispatchCaller, products }: ProductListProps) {
  const navigate = useNavigate();
  const apiContext = useContext(ApiContext);
  const [pageState, setPageState] = useState("");
  let brands: string[] = [];
  if (apiContext) {
    for (const i of apiContext.data) {
      if (!brands.includes(i.brand)) {
        brands = [...brands, i.brand];
      }
    }
  }
  const [filter, dispatch] = useReducer(filterReducer, {
    search: "",
    brand: "",
    wishList: "",
    mostPopular: "",
    home: "",
  });
  const [loginUser, setLoginUser] = useState<UserProps>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    if (userId && apiContext) {
      setLoginUser(apiContext.users.find(({ id }) => Number(userId) === id));
    }
  }, [apiContext]);

  useEffect(() => {
    dispatch(dispatchCaller);
  }, [dispatchCaller]);

  useEffect(() => {
    if (filter.search) {
      setPageState("search");
    } else if (filter.wishList) {
      setPageState("wishlist");
    } else if (filter.home || filter.brand) {
      setPageState("home");
    } else if (filter.mostPopular) {
      setPageState("popular");
    }
  }, [filter]);

  const filteredProducts = products
    .filter((product) => {
      return (
        (product.brand == filter.brand || filter.brand == "") &&
        product.title.includes(filter.search) &&
        (loginUser?.wishlist.includes(product.id) || filter.wishList == "")
      );
    })
    .sort((a, b) => (filter.mostPopular ? b.order - a.order : 0));
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  console.log(pageState);
  return (
    <div className="flex w-full flex-col space-y-3 " key={11}>
      {/* <Search
        testSearch={(value: string) => {
          dispatch({ type: "search", value });
        }}
      /> */}
      {(pageState == "home" || pageState == "popular") && (
        <>
          <div className=" mostContainer w-full flex flex-col items-center  gap-5 h-1/6">
            <div className="w-full flex flex-row justify-between items-center text-start left-0">
              <div className="font-bold leading-5  flex justify-item-center space-x-1">
                {pageState == "popular" && (
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
                )}
                <span className="text-xl">Most Popular</span>
              </div>
              <Link to="/popular">
                <h1 className="font-semibold MostPopularpage cursor-pointer leading-5 text-lg hover:text-slate-500">
                  See All
                </h1>
              </Link>
            </div>
          </div>

          <div
            className="h-10 justify-content-start  scroll-pr-10
        w-full flex flex-row gap-1 overflow-x-scroll snap-x 
         [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
        
        "
          >
            <div>
              <button
                key={"all"}
                className="font-bold  snap-start leading-5  text-xs h-10 flex 
             justify-center items-center px-4 py-1.5 border-2 border-[#343A40]
              rounded-3xl cursor-pointer hover:bg-slate-700 hover:text-white
          
              "
                onClick={() => dispatch({ type: "brand", value: "" })}
              >
                All
              </button>
            </div>
            {brands.map((item, index) => {
              return (
                <div>
                  <button
                    key={index}
                    className="font-bold snap-start leading-5 h-10  text-xs flex 
                justify-center items-center px-4 py-1.5 border-2 
                border-[#343A40] rounded-3xl cursor-pointer hover:bg-slate-700
                 hover:text-white"
                    onClick={() => dispatch({ type: "brand", value: item })}
                  >
                    {item}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
      <div className="w-full flex flex-wrap  justify-center items-center gap-4">
        {paginatedProducts.length == 0 && (
          <div className="flex flex-col items-center justify-center mt-10">
            <div className="text-6xl font-bold text-slate-700">Oops!</div>
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
        )}
        {paginatedProducts.map((item) => (
          <Link to={`/product/${item.id}`}>
            <ProductCard
              {...{
                id: item.id,
                title: item.title,
                price: item.price,
                images: item.images,
                brand: item.brand,
                size: item.size,
                color: item.color,
                order: item.order,
                page: pageState,
              }}
            />
          </Link>
        ))}
      </div>
      {paginatedProducts.length != 0 && (
        <div className="flex justify-center items-center p-10 my-10">
          <button
            className={`px-2 py-1 mx-1 border rounded-full text-xs ${
              currentPage === 1
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
              className={`px-2 py-1 mx-1 border rounded-full  text-xs ${
                page === currentPage
                  ? "text-gray-300 cursor-not-allowed "
                  : "text-gray-600 hover:bg-blue-100 font-bold"
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className={`px-2 py-1 mx-1 border rounded-full text-xs ${
              currentPage === totalPages || totalPages === 0
                ? "text-gray-300 cursor-not-allowed "
                : "text-gray-600 hover:bg-blue-100 font-bold"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
