function Cart() {
  return (
    <div className="h-screen w-full">
      <div className="w-full flex flex-row justify-between items-center text-start left-0 content-center justify-items-center">
        <div className="font-bold leading-5  flex justify-item-center space-x-1">
          <span className="text-xl ">My Cart</span>
        </div>
        <svg
          className="w-5 h-5 items-center transition-all duration-300 text-gray-500 hover:text-blue-500 focus:outline-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.0"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
    </div>
  );
}

export default Cart;
