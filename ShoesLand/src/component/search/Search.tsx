import { useContext, useState } from "react";
import ProductList, { UserContext } from "../product/ProductList";
import { ApiContext } from "../base/Api";

function Search() {
  const apiContext = useContext(ApiContext)
  const [search, setSearch] = useState("");
  // console.log(search)
  return (
    <div>
      <input type="text" onChange={(e) => setSearch(e.target.value)} />
      {apiContext && 
      <ProductList
        products={apiContext.data}
        productSet={apiContext.setData}
        dispatchCaller={{type: "search", value:search}}
      />
    }
    </div>
  );
}

export default Search;
