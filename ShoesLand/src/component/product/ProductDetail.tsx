import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { WishlistIcon } from "../product/Wishlist";
import { ProductProps } from "./ProductCard";
import { productHooks } from "../../api/queryClinet";
import useCart from "../base/hooks";
import star from "../../assets/star.svg";
import AddToCart from "../../assets/AddToCart";
import Decrease from "../../assets/Decrease.svg";
import Increase from "../../assets/Increase.svg";
import Backward from "../../assets/Backward.svg";
import clsx from 'clsx'
import Loading from '../../component/base/Loading'
import ImageCarousel from "../base/Carousel";
export function ProductDetail() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [count, setCount] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const colors = [
    "bg-red-500",
    "bg-rose-500",
    "bg-emerald-500",
    "bg-yellow-500",
    "bg-gray-500",
    "bg-teal-500",
  ];

  const { id } = useParams();
  const { data, isLoading, error } = productHooks.useFetchProductById(
    Number(id)
  );
  if (isLoading) return <Loading />
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const product: ProductProps = data;
  console.log(product.isFavorite)
  const handleAddToCart = () => {
    if (!selectedColor) {
      alert("Please select a color.");
      return;
    }
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    console.log({
      productId: Number(id),
      color: selectedColor,
      size: selectedSize,
      count: count,
    });
    addToCart({
      productId: Number(id),
      color: selectedColor,
      size: selectedSize,
      count: count,
    });
    alert("Item added to cart!");
  };
  console.log(selectedSize, selectedColor)
  return (
    <div className="w-full h-screen relative mb-10">
      {/* images && backward */}
      <div className="mb-6 w-full ">

        <ImageCarousel images={product.images} />
      </div>
      <div className="px-4 w-full">
        <div
          className=" h-1/4 relative after:absolute pb-3 after:w-full after:h-full  after:top-0 after:left-0
          after:border-b-2 after:border-b-solid after:border-b-slate-100 after:pointer-events-none"
        >
          <div className="flex flex-row w-full justify-evently">
            <div className="flex flex-col space-y-3 w-full">
              <h1 className="font-semibold text-3xl w-full ">{product?.name}</h1>
              <div className="flex flex-row space-x-3 w-full justify-start items-center">
                <div className="w-1/4 h-7 bg-slate-200 rounded-lg flex justify-center items-center  py-1">
                  <p className="font-normal text-xs text-slate-700">
                    {product?.sold_quantity} sold
                  </p>
                </div>
                <div className=" flex flex-row justify-between items-center gap-1">
                  <img src={star} alt="star" className="size-5" />
                  <p className="font-normal text-[14px] text-slate-600">
                    {product.rating}({product.sold_quantity} reviews)
                  </p>
                </div>
              </div>
            </div>
            <div className="heart hover:fill-pink-500 active:text-pink-500 flex flex-row justify-start items-center w-10 h-10">

              <WishlistIcon
                productId={Number(id)}
                isInWishlist={product.isFavorite}
              />
            </div>
          </div>
        </div>
        <br />
        <div className="w-full h-1/4 relative mb-1 after:absolute pb-4 pt-2 after:w-full after:h-full  after:top-0 after:left-0 after:border-b-2 after:border-b-solid after:border-b-slate-100 after:pointer-events-none">
          <div className="flex flex-col justify-between pb-3 h-2/4 ">
            <h1 className="font-bold text-base py-3">Description</h1>
            <p className="font-semibold text-xs text-slate-700">
              lorem ipsum dolor sit amet, consectatur adipiscing elit,sad do
              eiusmod tempor incididunt ut labore et
              <span className="font-bold text-sm"> view more...</span>
            </p>
          </div>
          <div className="flex flex-row justify-between space-y-1 items-center">
            <div className="flex-col justify-center items-center">
              <h3 className="font-bold text-base my-1">Size</h3>
              <ul className="flex space-x-2">
                {product?.sizes.map((sizes, index) => (
                  <li

                    onClick={() => setSelectedSize(sizes)}
                    className={clsx(selectedSize == sizes && 'text-white bg-black', "py-2 px-2 leading-none font-semibold text-md rounded-full inline-flex border-2 border-slate-500 transition-all duration-300 hover:bg-slate-300 hover:border-slate-500 text-slate-600")}
                    key={index}
                  >
                    {sizes}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-col justify-center items-center pb-1.5  ">
              <h3 className="font-bold text-base my-1">Color</h3>
              <ul className="flex space-x-2">
                {product?.colors.map((colors, index) => (
                  <li
                    onClick={() => setSelectedColor(colors)}
                    className={clsx(
                      "h-9 w-9 inline-flex items-center justify-center rounded-full cursor-pointer transition-all duration-300",
                      selectedColor == colors ? "bg-slate-300" : `bg-${colors}-500`,
                      "hover:bg-slate-300"
                    )}
                    key={index}
                  >
                    {selectedColor == colors && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="black"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    )}
                  </li>


                ))}
              </ul>
            </div>
          </div>
          <div className=" flex flex-row space-x-2 justify-start items-center text-center mt-3">
            <div>
              <h3 className="font-bold text-base text-center my-4">Quantity</h3>
            </div>
            <div className="w-20 h-9 rounded-2xl bg-gray-200 flex justify-between items-center px-2 py-[5.5px]">
              <button
                className="text-xs cursor-pointer"
                onClick={() => setCount((c) => (c !== 1 ? c - 1 : 1))}
              >
                <img src={Decrease} className="w-5 pr-1" />
              </button>
              <p className="w-5 text-center font-bold">{count}</p>
              <button
                className=" text-xs cursor-pointer"
                onClick={() => setCount((c) => c + 1)}
              >
                <img src={Increase} className="w-5 pl-1" />
              </button>
            </div>
          </div>
        </div>
        <div
          className="flex w-full h-16 justify-between items-center"
          onClick={handleAddToCart}
        >
          <div className="flex flex-col justify-center w-1/3 h-full">
            <h5 className="font- text-slate-500 text-xs">Total price</h5>
            <h5 className="font-semibold text-2xl">
              ${product?.price && product?.price * count}.00
            </h5>
          </div>
          <div className="bg-black w-2/3 h-14 rounded-[40px] flex justify-center items-center shadow-md shadow-slate-500/50 cursor-pointer">
            <div className="text-white flex justify-center items-center gap-3">
              <AddToCart />
              <p className="text-lg font-semibold py-2">Add to Cart</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
