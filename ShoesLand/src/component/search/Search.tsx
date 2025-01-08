
import { useEffect, useState } from "react";
import ProductList from "../product/ProductList";
import { Link, useNavigate } from "react-router-dom";
import { authHooks, deleteData, historySearchHooks, productHooks, useDelete } from "../../api/queryClinet";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import Backward from '../../assets/Backward.svg'
import SearchIcon from '../../assets/SearchIcon.svg';
import close from "../../assets/close.svg"
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

  const handleDelete = async (text: string) => {
    deleteData(`/api/search/${text}`, true).catch((e) => { addSearchMutate({ text }) })
    queryClient.invalidateQueries()
    //console.log(responce) 
  }
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
    <div className="h-screen">
      <div className="w-full flex flex-row justify-between items-center text-start left-0">
        <div className="font-bold leading-5  flex justify-item-center space-x-1">
          <img src={Backward} alt='back' className='w-7' onClick={() => navigate(-1)} />
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
            className="absolute top-1/2  transform -translate-y-1/2 left-3 text-gray-500 hover:text-blue-500 focus:outline-none"
          ><img src={SearchIcon} alt='search' className='w-6 h-6' />
          </button>


          {searchLoading && <div>Loading...</div>}
          {error instanceof Error && <div>Error: {error.message}</div>}
          {showProductList && filteredProducts.length > 0 && !searchLoading && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-md mt-2 w-full">
              {searchData.map((data) => (
                <div
                className=" flex w-full flex-row justify-between px-3 py-2 items-center cursor-pointer"
                key={data.userId}>
                  <p 
                  className="font-semibold text-base"
                  onClick={() => {
                    
                    setSearch(data.text)
                    handleSearchClick(data.text)
                    setShowProductList(false)
                  }
                  }>
                    {data.text}
                  </p>
                  <button className="w-7 font-semibold text-xl " onClick={() => handleDelete(data.text)}>
                    <img src={close} className="w-5"/>
                  </button>

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
