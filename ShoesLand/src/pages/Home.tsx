import { useContext} from "react";
import ProductList from "../component/product/ProductList";
import { ApiContext } from "../component/base/Api";

function Home() {
  const apiContext = useContext(ApiContext);
  return (
    <div className="">
      {apiContext && (
        <ProductList
          products={apiContext.data}
          productSet={apiContext.setData}
        />
      )}
    </div>
  );
}

export default Home;
