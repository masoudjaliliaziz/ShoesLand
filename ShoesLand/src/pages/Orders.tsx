import React, { useState } from 'react';
import { orderHooks } from './../api/queryClinet';
import Loading from '../component/base/Loading'
import { GoHeartFill } from 'react-icons/go'
const Orders = () => {
  const { data: orders, isSuccess, isLoading, isError } = orderHooks.useFetchOrder();
  const [activeTab, setActiveTab] = useState<'Active' | 'Completed'>('Active');

  console.log(orders)
  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <p>Error fetching orders.</p>;
  }

  if (!isSuccess || !orders || orders.length === 0) {
    return <p>No orders found.</p>;
  }

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'Active') return order.status === 'indelivery';
    return order.status === 'Completed';
  });

  return (
    <div className="ordersPage-container w-full h-screen px-6 flex flex-col items-center justify-between">
      <div className="searchBox w-full flex justify-center mt-4">
        <h2 className="text-2xl font-semibold">My Orders</h2>
      </div>

      <div className="w-full h-20 mt-5 flex justify-between items-center border-b-2">
        <div
          className={`w-[49%] h-full flex justify-center items-end cursor-pointer ${activeTab === 'Active' ? 'border-b-2 border-black' : 'hover:border-b-black'
            }`}
          onClick={() => setActiveTab('Active')}
        >
          <p
            className={`font-semibold text-lg pb-2 ${activeTab === 'Active' ? 'text-black' : 'text-slate-500 hover:text-black'
              }`}
          >
            Active
          </p>
        </div>
        <div
          className={`w-[49%] h-full flex justify-center items-end cursor-pointer ${activeTab === 'Completed' ? 'border-b-2 border-black' : 'hover:border-b-black'
            }`}
          onClick={() => setActiveTab('Completed')}
        >
          <p
            className={`font-semibold text-lg pb-2 ${activeTab === 'Completed' ? 'text-black' : 'text-slate-500 hover:text-black'
              }`}
          >
            Completed
          </p>
        </div>
      </div>

      <div className="orders-list w-full flex flex-col gap-4 mt-6">
        {filteredOrders.length > 0 ? filteredOrders.map((order) => (
          <div
            key={order.productId}
            className="orderCard w-full p-4 rounded-xl flex gap-4 bg-white shadow-md"
          >
            {/* Image */}
            <div className="h-28 bg-gray-200 flex justify-center items-center rounded-xl overflow-hidden">
              <img src={order.images[0]} alt={order.name} className="w-28 h-28 object-cover" />
            </div>

            {/* Details */}
            <div className="details w-2/3 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xl ">{order.name}</h3>
                <div className="flex  gap-0.5 mt-1">
                  <span className="text-sm text-gray-500">  {order.color}</span>
                  <span className='text-sm text-gray-500'>|</span>
                  <span className="text-sm text-gray-500">Size= {order.size} </span>
                  <span className='text-sm text-gray-500'>|</span>
                  <span className="text-sm text-gray-500"> Qty= {order.count}</span>
                </div>
              </div>

              <div className="w-fit bg-gray-100 px-2 py-1 rounded-md text-xs font-normal text-gray-600">
                {order.status}
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-bold text-gray-900">
                  ${order.total_price.toFixed(2)}
                </p>
                <button
                  className="bg-black text-white px-4 py-2 font-bold rounded-full text-sm"
                  onClick={() => console.log(`Track Order: ${order.productId}`)}
                >
                  Track Order
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-2 flex flex-col h-screen justify-center content-center items-center">
            <div className="col-span-2 space-y-80 w-full mt-auto h-[98%]">
              <div className="flex flex-col space-y-7 justify-center content-center items-center">
                <div className="text-6xl  font-bold text-slate-700">Oops!</div>
                <p className="text-lg text-gray-500 mt-2 mx-4 text-center">
                  We couldn’t find any Orders.
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-16 h-16 text-gray-300 mt-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01M12 2.25a9.75 9.75 0 1 1-9.75 9.75A9.75 9.75 0 0 1 12 2.25Z"
                  />
                </svg>
              </div>

              <span className="text-center  items-center grid text-xl font-bold text-zinc-600 py-7 m-auto justify-items-center">
                <p>
                  MADE WITH
                </p>
                <p>
                  <GoHeartFill className="mx-1 fill-rose-400" />
                </p>
                <p>
                  BY G-3
                </p>
              </span>
            </div>
          </div>
        )
        }
      </div>
    </div>
  );
};

export default Orders;

