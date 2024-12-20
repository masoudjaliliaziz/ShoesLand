import { useContext } from "react";
import { ApiContext } from "../../component/base/Api";
import { Link } from "react-router-dom";

function ProductBrand() {
  const apiContext = useContext(ApiContext);
  return (
    <div className="flex flex-wrap w-ful space-x-4 pb-4 justify-items-center content-center items-center justify-center">
      {apiContext &&
        apiContext.Logos.map((logo) => {
          return (
            <div key={logo.id}>
              <Link to={`/brand/${logo.brand}`}>
                <div className="w-16 h-24 flex flex-col justify-evenly items-center cursor-pointer">
                  <div className="w-16 h-16  rounded-full bg-[#EAEAEA] flex justify-center items-center">
                    <img
                      className="object-cover rounded-full scale-[.6]"
                      src={logo.images}
                    />
                  </div>
                  <p className="font-bold text-xs leading-4">{logo.brand}</p>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default ProductBrand;
