import { ApiContext } from "../base/Api";
import { UserProps } from "../base/Interfaces";
import { ProductProps } from "./ProductCard";
import ProductCard from "./ProductCard";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

interface FilterState {
  search: string;
  brand: string;
  wishList: string;
  mostPopular: string;
}

export type FilterAction = {
  type: "search" | "brand" | "wishList" | "mostPopular";
  value: string;
};

interface ProductListProps {
  products: ProductProps[];
  productSet: React.Dispatch<React.SetStateAction<ProductProps[]>>;
  dispatchCaller: FilterAction;
}

// export const UserContext = createContext("");

function filterReducer(state: FilterState, action: FilterAction) {
  console.log("action", action);
  const clone = {
    search: "",
    brand: "",
    wishList: "",
    mostPopular: "",
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
  }
}

function ProductList({ dispatchCaller, products }: ProductListProps) {
  const apiContext = useContext(ApiContext);
  const [filter, dispatch] = useReducer(filterReducer, {
    search: "",
    brand: "",
    wishList: "",
    mostPopular: "",
  });
  const [loginUser, setLoginUser] = useState<UserProps>();

  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    console.log(userId);
    if (userId && apiContext) {
      console.log(apiContext.users);
      console.log(
        apiContext.users.find((user) => {
          console.log("Number(userId)", Number(userId));
          console.log("user.id", user.id);
          console.log("Number(userId) == user.id", Number(userId) == user.id);
          return Number(userId) == user.id;
        })
      );
      setLoginUser(apiContext.users.find(({ id }) => Number(userId) == id));
    }
  }, [apiContext]);

  console.log(dispatchCaller);
  // dispatch(dispatchCaller);
  useEffect(() => {
    dispatch(dispatchCaller);
  }, [dispatchCaller]);
  console.log(filter);
  console.log(loginUser);
  const filteredProducts = products
    .filter((product) => {
      console.log(typeof product.id);
      return (
        (product.brand == filter.brand || filter.brand == "") &&
        product.title.includes(filter.search) &&
        (loginUser?.wishlist.includes(Number(product.id)) ||
          filter.wishList == "")
      );
    })
    .sort((a, b) => (filter.mostPopular ? b.order - a.order : 0));

  console.log(filteredProducts);

  return (
    <div className="flex h-screen w-full flex-col" key={11}>
      {/* <Search
        testSearch={(value: string) => {
          dispatch({ type: "search", value });
        }}
      /> */}
      <div className=" mostContainer w-full flex flex-col items-center justify-center gap-5 ">
        <div className="w-full flex flex-row justify-between items-center text-start left-0">
          <h1 className="font-bold leading-5 text-xl">Most Popular</h1>
          <h1 className="font-semibold MostPopularpage cursor-pointer leading-5 text-lg hover:text-slate-500">
            See All
          </h1>
        </div>
      </div>
      <div className="w-full flex flex-wrap  justify-center items-center gap-4">
        {filteredProducts.map((item: ProductProps) => (
          <Link to={`/product/${item.id}`}>
            <ProductCard {...item} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
