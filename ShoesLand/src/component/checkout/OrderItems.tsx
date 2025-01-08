import React from "react";

type OrderItem = {
  name: string;
  count: number;
  price: number;
  total_price: number;
  color: string;
  size: number;
  images: string[];
  productId: number;
};

type OrderItemsProps = {
  orderItems: OrderItem[];
};

const OrderItems: React.FC<OrderItemsProps> = ({ orderItems }) => {
  if (!OrderItems || OrderItems.length === 0) {
    return <p>No items in the Order.</p>;
  }

  return (
    <div className="order-items flex flex-col py-1 relative after:absolute pb-2  after:w-full after:h-full  after:top-0 after:left-0 after:border-b-2 after:border-b-solid after:border-b-gray-100 after:pointer-events-none">
      <h2 className="py-2 font-semibold text-base leading-7">Order List</h2>
      <div className="">
        <ul>
          {orderItems.map((item, index) => (
            <div className="bg-white relative my-3 h-24 rounded-2xl px-4 py-2 flex flex-row shadow-sm shadow-slate-300">
              <li key={index}>
                <div className="order-item flex flex-row justify-start space-x-3">
                  <img
                    className="w-1/4 h-[98%] rounded-xl bg "
                    src={item.images[0]}
                    alt={item.name}
                  />
                  <div className=" flex flex-col text-sm font-semibold ">
                    <span className="text-base leading-none">{item.name}</span>
                    <div className="pt-1.5">
                      <div className="text-xs font-normal flex flex-row h-4 justify-item-start items-start my-2 ">
                        <div className="relative justify-items-center flex flex-row space-x-1">
                          <div
                            className={`bg-${item.color}-500 h-3 w-3  place-self-center inline-flex rounded-full items-center`}
                          ></div>

                          <span className=""> {item.color}</span>
                        </div>
                        <span className="px-1">|</span>
                        <span>
                          size <small>=</small> {item.size}
                        </span>
                      </div>
                      <span>${item.total_price}.00</span>
                    </div>
                  </div>
                </div>
                <span className="bg-gray-100 px-3 py-1 rounded-full h-7 w-7 absolute bottom-3 right-3 font-semibold text-xs flex items-center justify-center">
                  {item.count}
                </span>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderItems;
