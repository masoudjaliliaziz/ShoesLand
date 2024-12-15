import Search from "../search/Search";
import { ProductProps } from "./ProductCard";
import ProductCard from "./ProductCard";
import React, { useState, createContext, useEffect, useReducer } from "react";

interface FilterState {
  search: string;
  brand: string;
  wishList: string;
  mostPopular: string;
}

type FilterAction = { type: "search" | "brand" | "wishList" | "mostPopular"; value: string };

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
  }
  switch (action.type) {
    case "search":
      return { ...clone, search: action.value };
    case "brand":
      return { ...clone, brand: action.value };
    case "wishList":
      return{ ...clone, wishList: action.value};
    case "mostPopular":
      return{ ...clone, mostPopular: action.value}
  }
}

function ProductList({ dispatchCaller, products, productSet }: ProductListProps) {
  let brands: string[] = [];
  for (let i of products) {
    if (!brands.includes(i.brand)) {
      brands = [...brands, i.brand];
    }
  }

  const [filter, dispatch] = useReducer(filterReducer, {
    search: "",
    brand: "",
    wishList: "",
    mostPopular: "",
  });

  // dispatch(dispatchCaller);

  const filteredProducts = products.filter((product) => {
    return (
      (product.brand == filter.brand || filter.brand == "") &&
      product.title.includes(filter.search)
    );
  });
  console.log(filteredProducts);

  return (
    <div className="flex h-screen" key={11}>
      {/* <Search
        testSearch={(value: string) => {
          dispatch({ type: "search", value });
        }}
      /> */}
      {brands.map((item, index) => {
        return (
          <button
            key={index}
            className="p-3 bg-red-600"
            onClick={() => dispatch({ type: "brand", value: item })}
          >
            {item}
          </button>
        );
      })}
      {filteredProducts.map((item: ProductProps) => (
        <ProductCard {...item} />
      ))}
    </div>
  );
}

export default ProductList;
