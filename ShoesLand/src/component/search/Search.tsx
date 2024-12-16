import { useContext, useState } from "react";
import ProductList from "../product/ProductList";
import { ApiContext } from "../base/Api";
import { Link } from "react-router-dom";
interface filteredProducts {
  title: string;
  id: number;
}
function Search() {
  const apiContext = useContext(ApiContext);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<filteredProducts[]>(
    []
  );
  const [showProductList, setShowProductList] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowProductList(false);
    const value = e.target.value;
    setSearch(value);
    if (value && apiContext) {
      const filtered: filteredProducts[] = apiContext.data.filter(
        (filteredItem) =>
          filteredItem.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleSearchClick = (title: string) => {
    setShowProductList(true);
    setFilteredProducts([]);
    return true;
  };

  return (
    <div>
      <div className="flex items-center justify-center mx-3 mt-10 mb-5">
        <div className="relative w-full max-w-md">
          <input
            autoFocus
            type="text"
            value={search}
            placeholder="Search..."
            onChange={handleInputChange}
            className="w-full pl-12 pr-10 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            onKeyUp={(e) => e.key == "Enter" && handleSearchClick(search)}
          />
          <button
            onClick={(e) =>
              handleSearchClick(search) && setShowProductList(true)
            }
            className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500 hover:text-blue-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.0"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>

          {filteredProducts.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-md mt-2 w-full">
              {filteredProducts.map(({ title, id }, index) => (
                <Link to={`/product/${id}`}>
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {title}
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>

      {showProductList && apiContext && (
        <ProductList
          products={apiContext.data}
          productSet={apiContext.setData}
          dispatchCaller={{ type: "search", value: search }}
        />
      )}
    </div>
  );
}

export default Search;
