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
    <div className="order-items flex flex-col py-1  relative after:absolute pb-2  after:w-full after:h-full  after:top-0 after:left-0 after:border-b-2 after:border-b-solid after:border-b-gray-100 after:pointer-events-none">
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
                      <div className="flex flex-row h-4 items-center my-2 ">
                        <div className="relative pr-1 mr-4 after:absolute  after:w-full after:h-3  after:top-1  after:left-1.5 after:border-r-2 after:border-r-solid after:border-r-slate-300 after:pointer-events-none">
                          <div
                            className={`bg-${item.color}-500 py-1.5 px-1.5 inline-flex rounded-full items-center`}
                          ></div>
                          <span className=""> {item.color}</span>
                        </div>
                        <span>
                          size <small>=</small> {item.size}
                        </span>
                      </div>
                      <span >${item.total_price}.00</span>
                    </div>
                  </div>
                  <span className="bg-gray-200 px-2 py-0 rounded-full h-1/8 absolute bottom-2 right-2 font-semibold text-sm">
                    {item.count}
                  </span>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderItems;
