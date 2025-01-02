import { useContext } from "react";
import { Link } from "react-router-dom";
import { productHooks } from "../../api/queryClinet";

function ProductBrand() {
  const { data, isLoading, isError } = productHooks.useFetchBrands()
  if (isLoading) return <div>loading...</div>
  return (
    <div className="flex flex-wrap w-ful space-x-4 pb-4 justify-items-center content-center items-center justify-center">
      {!isError &&
        data.map((logo, index) => {
          return (
            <div key={index}>
              <Link to={`/brand/${logo.name}`}>
                <div className="w-16 h-24 flex flex-col justify-evenly items-center cursor-pointer">
                  <div className="w-16 h-16  rounded-full bg-[#EAEAEA] flex justify-center items-center">
                    <img
                      className="object-cover rounded-full scale-[.6]"
                      src={logo.icon}
                    />
                  </div>
                  <p className="font-bold text-xs leading-4">{logo.name}</p>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default ProductBrand;
