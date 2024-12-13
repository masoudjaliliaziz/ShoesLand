import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../component/product/ProductList";
import { ProductProps } from "../component/product/ProductCard";

function Home() {
  const [data, setData] = React.useState<ProductProps[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:5173/Products")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="">
      <ProductList products={data} productSet={setData} />
    </div>
  );
}

export default Home;
