import { useContext } from "react";
import { UserContext } from "../product/ProductList";

function Search({ setSearch }: any) {
  return (
    <div>
      <input type="text" onChange={(e) => setSearch(e.target.value)} />
    </div>
  );
}

export default Search;
