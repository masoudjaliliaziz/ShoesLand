import React, { ReactElement } from "react";
import { FC } from "react";

export interface ProductProps {
  id: number;
  title: string;
  price: number;
  order: number;
  size: number[];
  color: string[];
  brand: string;
  images: string;
  sold?: number;
  rate?: number;
}

interface ProductPropsWithPage extends ProductProps {
  page?: string;
}

const ProductCard = ({
  id,
  title,
  price,
  order,
  size,
  color,
  brand,
  images,
  sold,
  rate,
  page,
}: ProductPropsWithPage): ReactElement => {
  console.log(page);
  return (
    <div key={id} className="flex flex-row flex-wrap ">
      <div className="w-full justify-center items-center gap-4">
        <div className="cardContainer w-40 h-48  flex flex-col justify-center items-start">
          {page == "wishlist" || page == "search" ? (
            <div className="imageContainer relative w-full h-44 rounded-3xl p-5 bg-[#ECEFF1] flex justify-center items-center cursor-pointer hover:bg-slate-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="transition-all duration-300 hover:bg-red-400 size-9 p-2 absolute top-5 right-5 bg-slate-800 rounded-full "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <img src={images} alt={title} className="w-36 h-36" />
            </div>
          ) : (
            <div
              className="imageContainer w-full h-44 rounded-3xl p-4 bg-[#ECEFF1] 
          flex justify-center items-center cursor-pointer hover:bg-slate-200"
            >
              <img src={images} alt={title} className="w-36 h-36" />
            </div>
          )}
        </div>
        <div className="detailContainer flex flex-col justify-center items-start gap-2">
          <h1 className="productName font-bold text-2xl leading-6">{title}</h1>
          {(page == "wishlist" || page == "search") && (
            <div className="w-full h-1/3  flex flex-row justify-start items-center">
              <div className="flex flex-row justify-center items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </div>
              {rate && (
                <div className="relative mr-5 after:absolute  after:w-full after:h-full  after:top-0 after:left-1.5 after:border-r-2 after:border-r-solid after:border-r-slate-400 after:pointer-events-none">
                  <p className="font-semibold text-[14px] text-slate-700">
                    4.3
                  </p>
                </div>
              )}
              {sold && (
                <div className="w-1/2  bg-slate-200 rounded-lg flex justify-center items-centers py-1">
                  <p className="font-bold text-sm text-slate-700">5254 sold</p>
                </div>
              )}
            </div>
          )}
          <span className="productPrice font-semibold text-base leading-5">
            ${price}.00
          </span>
        </div>
      </div>
    </div>

    //WishList
    // <div key={id} className="flex flex-row flex-wrap ">
    //   <div className="w-full justify-center items-center gap-4">
    //     <div className="cardContainer w-44 h-52  flex flex-col justify-center items-start">
    //       <div className="imageContainer relative w-full h-44 rounded-3xl p-5 bg-[#ECEFF1] flex justify-center items-center cursor-pointer hover:bg-slate-200">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="white"
    //           viewBox="0 0 24 24"
    //           strokeWidth={1.5}
    //           stroke="white"
    //           className="transition-all duration-300 hover:bg-red-400 size-9 p-2 absolute top-5 right-5 bg-slate-800 rounded-full "
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
    //           />
    //         </svg>
    //         <img src={images} alt={title} className="w-36 h-36" />
    //       </div>
    //     </div>
    //     <div className="detailContainer flex flex-col justify-center items-start gap-2">
    //       <h1 className="productName font-bold text-2xl leading-6">{title}</h1>
    // <div className="w-full h-1/3  flex flex-row justify-start items-center">
    //   <div className="flex flex-row justify-center items-center gap-2">
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="black"
    //       viewBox="0 0 24 24"
    //       strokeWidth={1.5}brand
    //       stroke="currentColor"
    //       className="size-6"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
    //       />
    //     </svg>
    //   </div>
    //   <div className="relative mr-5 after:absolute  after:w-full after:h-full  after:top-0 after:left-1.5 after:border-r-2 after:border-r-solid after:border-r-slate-400 after:pointer-events-none">
    //     <p className="font-semibold text-[14px] text-slate-700">4.3</p>
    //   </div>
    //   <div className="w-1/2  bg-slate-200 rounded-lg flex justify-center items-centers py-1">
    //     <p className="font-bold text-sm text-slate-700">
    //       5254 sold
    //     </p>
    //   </div>
    // </div>
    //       <span className="productPrice font-semibold text-base leading-5">
    //         ${price}.00
    //       </span>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ProductCard;
