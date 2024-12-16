import { useContext } from "react";
import ProductList from "../component/product/ProductList";
import { ApiContext } from "../component/base/Api";

function MostPopular() {
  const apiContext = useContext(ApiContext);
  return (
    <>
      {apiContext && (
        <ProductList
          products={apiContext.data}
          productSet={apiContext.setData}
          dispatchCaller={{ type: "mostPopular", value: "true" }}
        />
      )}
    </>
  );
}

export default MostPopular;
