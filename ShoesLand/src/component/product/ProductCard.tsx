import React, { ReactElement } from "react";
import { FC } from "react";
import Heart from "../../assets/Heart.svg";
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
  return (
    <div key={id} className="flex flex-row flex-wrap ">
      <div className="w-full justify-center items-center gap-4">
        <div
          className="cardContainer w-40 h-48  flex flex-col 
          justify-center items-start"
        >
          <div
            className="imageContainer relative w-full h-44 
            rounded-3xl p-5 bg-[#ECEFF1] flex justify-center 
            items-center cursor-pointer hover:bg-slate-200"
          >
            <img
              src={Heart}
              className="transition-all duration-300 hover:bg-red-400 size-9 p-2 absolute 
              top-5 right-5 bg-slate-800 rounded-full "
            />

            <img src={images[0]} className="w-32 h-32" />
          </div>
        </div>
        <div className="detailContainer flex flex-col justify-center items-start gap-1">
          <h1 className="productName font-bold max-w-[100px] text-xl leading-6 truncate">
            {name}
          </h1>
          <div className="w-full h-1/3  flex flex-row justify-start items-center">
            {
              <>
                <div className="flex flex-row justify-center items-center gap-2">
                  <img src={star} />
                </div>
                <div className="relative mr-5 after:absolute  after:w-full after:h-full  after:top-0 after:left-1.5 after:border-r-2 after:border-r-solid after:border-r-slate-400 after:pointer-events-none">
                  <p className="font-semibold text-[14px] text-slate-700">
                    4.3
                  </p>
                </div>
              </>
            }
            <div className="w-1/2  bg-slate-200 rounded-lg flex justify-center items-centers py-1">
              <p className="font-bold text-sm text-slate-700">5254 sold</p>
            </div>
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
