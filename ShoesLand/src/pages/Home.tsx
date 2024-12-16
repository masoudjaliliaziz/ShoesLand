import { useContext} from "react";
import ProductList from "../component/product/ProductList";
import { ApiContext } from "../component/base/Api";

function Home() {
  const apiContext = useContext(ApiContext);
  return (
    <div className="w-full h-screen px-5">
      {apiContext && (
        <ProductList
          products={apiContext.data}
          productSet={apiContext.setData}
          dispatchCaller={{type: "search", value:""}}        />
      )}
    </div>
  );
}

export default Home;
