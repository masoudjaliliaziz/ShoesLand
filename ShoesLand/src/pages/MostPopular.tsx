import { useContext } from "react";
import ProductList from "../component/product/ProductList";

function MostPopular() {
  return (
    <>
      <ProductList
        dispatchCaller={{ type: "mostPopular", value: "true" }}
      />
    </>
  );
}

export default MostPopular;
