import { useContext, useState } from "react";
import ProductList from "../component/product/ProductList";
import { ApiContext } from "../component/base/Api";
import { FilterAction } from "../component/product/ProductList";
import ProductBrand from "../component/product/ProductBrand";

function Home() {
  const apiContext = useContext(ApiContext);
  let brands: string[] = [];
  if (apiContext) {
    for (const i of apiContext.data) {
      if (!brands.includes(i.brand)) {
        brands = [...brands, i.brand];
      }
    }
  }
  const [dispatch, setDispatch] = useState<FilterAction>({
    type: "brand",
    value: "",
  });
  return (
    <div className="w-full h-screen px-5">
      <div className="logoContainer  py-3 flex flex-row justify-center items-center flex-wrap gap-10 mb-4 mt-2.5">
        <ProductBrand />
      </div>
      <div className="w-full flex flex-row justify-start items-center gap-1 overflow-x-auto">
        <div>
          <button
            key={"all"}
            className="font-bold leading-5 text-base h-10 flex justify-center items-center px-5 py-2.5 border-2 border-[#343A40] rounded-3xl cursor-pointer hover:bg-slate-700 hover:text-white"
            onClick={() =>
              setDispatch((pervDispatch) => {
                return { ...pervDispatch, value: "" };
              })
            }
          >
            All
          </button>
        </div>
        {brands.map((item, index) => {
          return (
            <div>
              <button
                key={index}
                className="font-bold leading-5 text-base h-10 flex justify-center items-center px-5 py-2.5 border-2 border-[#343A40] rounded-3xl cursor-pointer hover:bg-slate-700 hover:text-white"
                onClick={() =>
                  setDispatch((pervDispatch) => {
                    return { ...pervDispatch, value: item };
                  })
                }
              >
                {item}
              </button>
            </div>
          );
        })}
      </div>
      {apiContext && (
        <ProductList
          products={apiContext.data}
          productSet={apiContext.setData}
          dispatchCaller={dispatch}
        />
      )}
    </div>
  );
}

export default Home;
