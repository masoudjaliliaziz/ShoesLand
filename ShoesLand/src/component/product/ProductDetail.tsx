import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { WishlistIcon } from '../product/Wishlist'
import { ProductProps } from "./ProductCard";
import { productHooks } from "../../api/queryClinet";
import useCart from "../base/hooks";
import star from '../../assets/star.svg'
import AddToCart from "../../assets/AddToCart";
import Decrease from "../../assets/Decrease";
import Increase from "../../assets/Increase";
export function ProductDetail() {
  const { addToCart } = useCart()
  const [count, setCount] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const colors = [
    "bg-red-600",
    "bg-rose-600",
    "bg-emerald-600",
    "bg-yellow-600",
    "bg-gray-600",
    "bg-teal-600",
  ];

  const { id } = useParams();
  const { data, isLoading, error } = productHooks.useFetchProductById(Number(id))
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const product: ProductProps = data


  const handleAddToCart = () => {
    if (!selectedColor) {
      alert("Please select a color.");
      return;
    }
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    console.log(
      {
        productId: Number(id),
        color: selectedColor,
        size: selectedSize,
        count: count,
      }
    )
    addToCart({
      productId: Number(id),
      color: selectedColor,
      size: selectedSize,
      count: count,
    });
    alert("Item added to cart!");
  };
  return (
    <div className="w-full h-[90%] relative mb-10">
      {/* images && backward */}
      <div className=" w-full ">
        <div>
          <img src={product?.images[0]} className="h-80 w-full object-cover"></img>
        </div>
      </div>
      <div className="px-5 pt-4 w-full">
        <div className=" h-1/4 relative mb-3 after:absolute pb-3 after:w-full after:h-full  after:top-0 after:left-0
          after:border-b-2 after:border-b-solid after:border-b-slate-100 after:pointer-events-none">
          <div className="flex flex-row w-full justify-evently">
            <div className="flex flex-col space-y-3 w-full">
              <h1 className="font-bold text-3xl w-full ">{product?.name}</h1>
              <div className="flex flex-row space-x-5 w-full justify-start">
                <div className="w-1/4  bg-slate-200 rounded-lg flex justify-center items-center px-1 py-1">
                  <p className="font-bold text-xs text-slate-700">
                    {product?.sold_quantity} sold
                  </p>
                </div>
                <div className="pl-3 flex flex-row justify-center items-center gap-2">
                  <img src={star} alt='start' />
                  <p className="font-semibold text-[14px] text-slate-700">
                    {product.rating}({product.sold_quantity})
                  </p>
                </div>
              </div>
            </div>
            <div className="heart w-1/12 hover:text-pink-600 active:text-pink-600 flex flex-row justify-start items-center h-2/3">
              <WishlistIcon productId={Number(id)} isInWishlist={product.isFavorite} />

            </div>
          </div>
        </div>

        <div className="w-full h-1/4 relative mb-3 after:absolute pb-3 after:w-full after:h-full  after:top-0 after:left-0 after:border-b-2 after:border-b-solid after:border-b-slate-100 after:pointer-events-none">
          <div className="flex flex-col justify-between pb-3 h-2/4 ">
            <h1 className="font-bold">Description</h1>
            <p className="font-semibold text-sm text-slate-700">
              lorem ipsum dolor sit amet, consectatur adipiscing elit,sad do
              eiusmod tempor incididunt ut labore et
              <span className="font-bold"> view more...</span>
            </p>
          </div>
          <div className="flex flex-row justify-between space-y-1 items-center">
            <div className="flex flex-col space-y-2 justify-center">
              <h3 className="font-bold">Size</h3>
              <ul className="flex space-x-1">
                {product?.sizes.map((sizes, index) => (
                  <li

                    onClick={() => setSelectedSize(sizes)}
                    className="py-2 px-2 leading-none font-semibold text-xs rounded-full inline-flex border-2 border-slate-800 transition-all duration-300 hover:bg-slate-300 hover:border-slate-500"
                    key={index}
                  >
                    {sizes}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col space-y-2 justify-center ">
              <h3 className="font-bold">Color</h3>
              <ul className="flex space-x-1">
                {product?.colors.map((colors, index) => (
                  <li
                    onClick={() => setSelectedColor(colors)}
                    className={`bg-${colors}-600 py-4 px-4 inline-flex rounded-full cursor-pointer transition-all duration-300 hover:bg-slate-400`}
                    key={index}
                  ></li>
                ))}
              </ul>
            </div>
          </div >
          <div className="flex flex-row space-x-2 justify-start items-center text-center mt-3">
            <div>
              <h3 className="font-bold mt-2 text-center">Quantity</h3>
            </div>
            <div className="w-1/3 rounded-2xl bg-slate-300 flex justify-center items-center px-2 py-[4.5px]">
              <button
                className="text-xs cursor-pointer"
                onClick={() => setCount((c) => (c !== 1 ? c - 1 : 1))}
              ><Decrease />
              </button>
              <p className=" w-2/4 text-center font-bold">{count}</p>
              <button
                className=" text-xs cursor-pointer"
                onClick={() => setCount((c) => c + 1)}
              ><Increase />
              </button>
            </div>
          </div>
        </div >
        <div className="flex w-full h-20 justify-between items-center"
          onClick={handleAddToCart}
        >
          <div className="flex flex-col justify-center w-1/3 h-full">
            <h5 className="font-bold text-slate-500 text-xs">Total price</h5>
            <h5 className="font-bold text-xl">
              ${product?.price && product?.price * count}.00
            </h5>
          </div>
          <div className="bg-black w-2/3 h-4/5 rounded-[40px] flex justify-center items-center shadow-md shadow-slate-500/50 cursor-pointer">
            <div className="text-white flex justify-center items-center gap-3">
              <AddToCart />
              <p className="text-lg font-semibold">Add to Cart</p>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}
