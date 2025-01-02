import { useContext } from "react";
import ProductList from "../component/product/ProductList";
import { useParams } from "react-router-dom";

function Brand() {
  const { brand } = useParams();

  return (
    <>
      <ProductList
        dispatchCaller={{ type: "brand", value: [brand.toLowerCase()] }}
      />
    </>
  );
}
export default Brand;
