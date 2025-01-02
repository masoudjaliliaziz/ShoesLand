
import { useEffect, useState } from "react";
import ProductList from "../product/ProductList";
import { Link, useNavigate } from "react-router-dom";
import { authHooks, deleteData, historySearchHooks, productHooks, useDelete } from "../../api/queryClinet";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

interface FilteredProduct {
  title: string;
  id: number;
  images: string;
  price: number;
}

function Search() {


  const queryClient = useQueryClient()
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showProductList, setShowProductList] = useState(false);
  const { data: searchData, isLoading: searchLoading, error } = historySearchHooks.useFetchHistorySearch()
  const { mutate: addSearchMutate } = historySearchHooks.useAddHistorySearch()
  const { data: filteredProducts = [], isLoading: productLoading } = productHooks.useSearchProducts(search);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setShowProductList(true);
  };

  const handleSearchClick = (text: string) => {
    addSearchMutate({
      text
    })

    setShowProductList(true);
    return true;
  };

  return (
    <div>
      <div className="w-full flex flex-row justify-between items-center text-start left-0">
        <div className="font-bold leading-5  flex justify-item-center space-x-1">
          <svg
            onClick={() => navigate(-1)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="size-7 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h15"
            />
          </svg>
          <span className="text-xl">Search</span>
        </div>
        <Link to="/popular">
          <h1 className="font-semibold MostPopularpage cursor-pointer leading-5 text-lg hover:text-slate-500"></h1>
        </Link>
      </div>
      <div className="flex items-center justify-center mx-3 mt-3 mb-5 h-[]">
        <div className="relative w-full max-w-md">
          <input
            autoFocus
            type="text"
            value={search}
            placeholder="Search..."
            onChange={handleInputChange}
            className="w-full pl-12 pr-10 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            onKeyUp={(e) => e.key === "Enter" && handleSearchClick(search) && setShowProductList(false)}
          />
          <button
            onClick={(e) =>

              handleSearchClick(search) && setShowProductList(false)
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

          {searchLoading && <div>Loading...</div>}
          {error instanceof Error && <div>Error: {error.message}</div>}
          {showProductList && filteredProducts.length > 0 && !searchLoading && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-md mt-2 w-full">
              {searchData.map((data) => (
                <div key={data.userId}>
                  <p onClick={() => {

                    setSearch(data.text)
                    handleSearchClick(data.text)
                    setShowProductList(false)
                  }
                  }>
                    {data.text}
                  </p>
                  <button onClick={async () => {
                    await deleteData(`/api/search/${data.text}`, true)
                    queryClient.invalidateQueries()
                  }}>x</button>

                </div>

              ))}
            </ul>
          )}
        </div>
      </div>

      {
        !showProductList && (
          <ProductList dispatchCaller={{ type: "search", value: search }} />
        )
      }
    </div >
  );
}

export default Search;
