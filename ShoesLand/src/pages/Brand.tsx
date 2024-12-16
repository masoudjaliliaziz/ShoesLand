import { useContext } from "react";
import ProductList from "../component/product/ProductList";
import { ApiContext } from "../component/base/Api";
import { useParams } from "react-router-dom";

function Brand() {
  const apiContext = useContext(ApiContext);
  const { brand } = useParams();

  return (
    <>
      {apiContext && brand && (
        <ProductList
          products={apiContext.data}
          productSet={apiContext.setData}
          dispatchCaller={{ type: "brand", value: brand.toLowerCase() }}
        />
      )}
    </>
  );
}
export default Brand;
