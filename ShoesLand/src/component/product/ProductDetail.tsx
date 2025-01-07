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
import Heart from "../../assets/HeartNone.svg";

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
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const product: ProductProps = data;

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
  return (
    <div className="w-full h-[95%] relative mb-10">
      {/* images && backward */}
      <div className="h-60 mb-6 w-full ">
        <div>
          <img
            src={product?.images[0]}
            className="h-64 w-full object-cover"
          ></img>
          <button onClick={() => navigate(-1)}>
            <img
              src={Backward}
              className="size-9 absolute top-1 left-3 font-bold"
            />
          </button>
        </div>
      </div>
      <div className="px-5 w-full">
        <div
          className=" h-1/4 relative after:absolute pb-3 after:w-full after:h-full  after:top-0 after:left-0
          after:border-b-2 after:border-b-solid after:border-b-slate-100 after:pointer-events-none"
        >
          <div className="flex flex-row w-full justify-evently">
            <div className="flex flex-col space-y-3 w-full">
              <h1 className="font-semibold text-2xl w-full ">{product?.name}</h1>
              <div className="flex flex-row space-x-3 w-full justify-start items-center">
                <div className="w-1/4 h-7 bg-slate-200 rounded-lg flex justify-center items-center  py-1">
                  <p className="font-bold text-xs text-slate-700">
                    {product?.sold_quantity} sold
                  </p>
                </div>
                <div className=" flex flex-row justify-between items-center gap-1">
                  <img src={star} alt="star" className="size-5"/>
                  <p className="font-semibold text-[14px] text-slate-700">
                    {product.rating}({product.sold_quantity})
                  </p>
                </div>
              </div>
            </div>
            <div className="heart w-1/12 hover:fill-pink-500 active:text-pink-500 flex flex-row justify-start items-center h-2/3">
            <img src={Heart} alt="star" className="border border-slate-800 size-6 hover:text-pink-500 active:text-pink-500"/>
              <WishlistIcon
                productId={Number(id)}
                isInWishlist={product.isFavorite}
              />
            </div>
          </div>
        </div>

        <div className="w-full h-1/4 relative mb-1 after:absolute pb-4 pt-2 after:w-full after:h-full  after:top-0 after:left-0 after:border-b-2 after:border-b-solid after:border-b-slate-100 after:pointer-events-none">
          <div className="flex flex-col justify-between pb-3 h-2/4 ">
            <h1 className="font-bold text-base">Description</h1>
            <p className="font-semibold text-xs text-slate-700">
              lorem ipsum dolor sit amet, consectatur adipiscing elit,sad do
              eiusmod tempor incididunt ut labore et
              <span className="font-bold text-sm"> view more...</span>
            </p>
          </div>
          <div className="flex flex-row justify-between space-y-1 items-center">
            <div className="flex space-x-1 justify-center items-center">
              <h3 className="font-bold text-base">Size</h3>
              <ul className="flex space-x-1">
                {product?.sizes.map((sizes, index) => (
                  <li
                    onClick={() => setSelectedSize(sizes)}
                    className="py-1 px-1 leading-none font-semibold text-xs rounded-full inline-flex border border-slate-700 transition-all duration-300 hover:bg-slate-300 hover:border-slate-500"
                    key={index}
                  >
                    {sizes}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex space-x-1 justify-center items-center">
              <h3 className="font-bold text-base">Color</h3>
              <ul className="flex space-x-1">
                {product?.colors.map((colors, index) => (
                  <li
                    onClick={() => setSelectedColor(colors)}
                    className={`bg-${colors}-500 py-3 px-3 inline-flex rounded-full cursor-pointer transition-all duration-300 hover:bg-slate-400`}
                    key={index}
                  ></li>
                ))}
              </ul>
            </div>
          </div>
          <div className=" flex flex-row space-x-2 justify-start items-center text-center mt-3">
            <div>
              <h3 className="font-bold text-base text-center">Quantity</h3>
            </div>
            <div className="w-1/4 h-6 rounded-2xl bg-slate-300 flex justify-between items-center px-2 py-[4.5px]">
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
            <h5 className="font-bold text-slate-500 text-xs">Total price</h5>
            <h5 className="font-semibold text-xl">
              ${product?.price && product?.price * count}.00
            </h5>
          </div>
          <div className="bg-black w-2/3 h-10 rounded-[40px] flex justify-center items-center shadow-md shadow-slate-500/50 cursor-pointer">
            <div className="text-white flex justify-center items-center gap-3">
              <AddToCart />
              <p className="text-lg font-semibold">Add to Cart</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
