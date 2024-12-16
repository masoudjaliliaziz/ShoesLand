import { ProductProps } from "./ProductCard";
import ProductCard from "./ProductCard";
import React, { useEffect, useReducer } from "react";
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
  const [filter, dispatch] = useReducer(filterReducer, {
    search: "",
    brand: "",
    wishList: "",
    mostPopular: "",
  });

  console.log(dispatchCaller);
  // dispatch(dispatchCaller);
  useEffect(() => {
    dispatch(dispatchCaller);
  }, [dispatchCaller]);
  console.log(filter);
  const filteredProducts = products
    .filter((product) => {
      return (
        (product.brand == filter.brand || filter.brand == "") &&
        product.title.includes(filter.search)
        //&&
        // (filter.wishList && user.wishList.includes(product.id))
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
