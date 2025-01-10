import React, { ReactElement } from "react";
import { FC } from "react";
import { GoHeartFill } from "react-icons/go";
import star from "../../assets/star.svg";

export interface Brand {
  id: number;
  name: string;
  icon: string;
}
export interface ProductProps {
  id: number;
  name: string;
  price: number;
  order: number;
  sizes: number[];
  colors: string[];
  brand: string;
  images: string[];
  view_count: number;
  sold_quantity?: number;
  rating?: number;
  isFavorite: boolean;
}

interface ProductPropsWithPage extends ProductProps {
  show_more?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  order,
  sizes,
  colors,
  brand,
  images,
  sold_quantity,
  rating,
  isFavorite,
  show_more,
}: ProductPropsWithPage): ReactElement => {
  console.log(isFavorite);
  return (
    <div key={id} className="w-40 h-60 flex flex-row justify-start">
      <div className="w-full flex flex-col justify-center items-center gap-1">
        <div
          className="cardContainer w-36 h-40 flex flex-col 
          justify-center items-start"
        >
          <div
            className="imageContainer relative w-40 h-44 
            rounded-3xl p-2 bg-[#ECEFF1] flex justify-center 
            items-center cursor-pointer hover:bg-slate-200"
          >
            {show_more && (
              <GoHeartFill
                className="w-6 h-6 fill-white transition-all duration-300 size-9 p-1 absolute 
              top-4 right-4 bg-slate-800 rounded-full hover:bg-rose-700"
              />
            )}

            <img src={images[0]} className="w-32 h-32 mx-auto" />
          </div>
        </div>
        <div className="detailContainer overflow-hidden w-36 px-2 flex flex-col justify-center items-start gap-1">
          <h1 className="productName font-medium md:font-bold max-w-[180px] text-sm md:text-sx leading-6 truncate">
            {name}
          </h1>
          <div className="w-full  flex flex-row justify-start items-center">
            {show_more && 
              <>
                <div className="flex flex-row justify-center items-center">
                  <img src={star} className="w-4" />
                </div>
                <div className="relative mr-3 after:absolute  after:w-full after:h-full  after:top-0 after:left-1.5 after:border-r-2 after:border-r-solid after:border-r-slate-400 after:pointer-events-none">
                  <p className="font-semibold text-sm text-slate-700">4.3</p>
                </div>
                <div className="w-1/2 bg-slate-200 rounded-lg flex justify-center items-centers py-1">
                  <p className=" font-semibold text-xs text-slate-700">
                    5254 sold
                  </p>
                </div>
              </>
            }
          </div>
          <span className="productPrice font-semibold text-sm leading-5">
            ${price}.00
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
