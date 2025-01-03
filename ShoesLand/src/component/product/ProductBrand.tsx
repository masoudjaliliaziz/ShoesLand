import { Link } from "react-router-dom";
import { productHooks } from "../../api/queryClinet";
import more from "../../../public/logo/more.png";

function ProductBrand() {
  const { data, isLoading, isError } = productHooks.useFetchBrands();
  if (isLoading) return <div>loading...</div>;
  return (
    <div className="">
      <div className=" grid grid-cols-4 w-[90%] mx-auto justify-items-center content-center items-center justify-center">
        {!isError &&
          data.map((logo, index) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center"
              >
                <Link to={`/brand/${logo.name}`}>
                  <div className="w-16 h-[70px] flex flex-col justify-between items-center cursor-pointer mb-5">
                    <div className="w-12 h-12 rounded-full bg-[#EAEAEA] flex justify-center items-center">
                      <img
                        className=" w-8 h-5 object-cover rounded-full scale-[.6]"
                        src={logo.icon}
                      />
                    </div>
                    <p className="font-bold text-sm leading-4">{logo.name}</p>
                  </div>
                </Link>
              </div>
            );
          })}

        <div className="w-16 h-[70px] flex flex-col justify-between items-center cursor-pointer mb-5">
          <div className="w-12 h-12 rounded-full bg-[#EAEAEA] flex justify-center items-center">
            <img
              className=" w-8 h-8 object-cover rounded-full scale-[.6]"
              src={more}
              alt="more"
            />
          </div>
          <p className="font-bold text-sm leading-4">more</p>
        </div>
      </div>
    </div>
  );
}

export default ProductBrand;
