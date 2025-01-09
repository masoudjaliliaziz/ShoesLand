import { Link } from "react-router-dom";
import { productHooks } from "../../api/queryClinet";
import clsx from "clsx";

import Loading from '../../component/base/Loading'

export function BrandNav({ filter, dispatch }) {
  const { data, isLoading } = productHooks.useFetchBrands();

  if (isLoading) return <Loading />
  if (!filter.home && !filter.wishlist) return <><br /></>
  console.log(data);
  console.log(dispatch);
  console.log(filter);
  return (
    <>
      <div className=" mostContainer w-full flex flex-col items-center  gap-5 h-1/6">
        <div className="w-full flex flex-row justify-between items-center text-start left-0">
          <div className="font-bold leading-5 flex justify-item-center space-x-1">
            <span className="text-lg font-semibold leading-6">
              Most Popular
            </span>
          </div>
          <Link to="/popular">
            <h1 className="font-semibold MostPopularpage cursor-pointer leading-5 text-sm hover:text-slate-500">
              See All
            </h1>
          </Link>
        </div>
      </div>

      <div
        className="h-10 justify-content-start  scroll-pr-10
        w-full flex flex-row gap-1 overflow-x-scroll snap-x
         [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
        
        "
      >
        <div>
          <button
            key={"all"}
            className="font-semibold snap-start leading-5 text-base h-8 flex 
             justify-center items-center px-3 py-1.5 border-2 border-[#474d53]
              rounded-3xl cursor-pointer hover:bg-slate-700 hover:text-white
          
              "
            onClick={() => dispatch({ type: "brand", value: "" })}
          >
            All
          </button>
        </div>
        {data.map((item, index) => {
          return (
            <div key={index}>
              <button
                className={clsx(
                  "font-semibold snap-start leading-5 h-8 text-base flex justify-center items-center px-3 py-1.5 border-2 border-[#474d53] rounded-3xl cursor-pointer",
                  filter.brand?.includes(item.name)
                    ? "bg-slate-700 text-white"
                    : "bg-transparent text-slate-700"
                )}
                onClick={() => dispatch({ type: "brand", value: item.name })}
              >
                {item.name}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
