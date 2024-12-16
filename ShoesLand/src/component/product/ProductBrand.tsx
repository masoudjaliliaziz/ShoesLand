import { useContext } from "react";
import { ApiContext } from "../../component/base/Api";
import { Link } from "react-router-dom";

function ProductBrand() {
  const apiContext = useContext(ApiContext);
  return (
    <>
      {apiContext &&
        apiContext.Logos.map((logo) => {
          return (
            <div key={logo.id}>
              <Link to={`/brand/${logo.brand}`}>
                <div className="w-16 h-24 flex flex-col justify-between items-center gap-3 cursor-pointer">
                  <div className="w-16 h-16  rounded-full bg-[#EAEAEA] flex justify-center items-center">
                    <img
                      className="object-cover rounded-full scale-[.6]"
                      src={logo.images}
                    />
                  </div>
                  <p className="font-bold text-sm leading-4">{logo.brand}</p>
                </div>
              </Link>
            </div>
          );
        })}
    </>
  );
}

export default ProductBrand;
