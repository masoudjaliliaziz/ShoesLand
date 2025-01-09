import React, { useState } from 'react';
import { orderHooks } from './../api/queryClinet';
const Orders = () => {
  const { data: orders, isSuccess, isLoading, isError } = orderHooks.useFetchOrder();
  const [activeTab, setActiveTab] = useState<'Active' | 'Completed'>('Active');

  if (isLoading) {
    return <p>Loading orders...</p>;
  }

  if (isError) {
    return <p>Error fetching orders.</p>;
  }

  if (!isSuccess || !orders || orders.length === 0) {
    return <p>No orders found.</p>;
  }

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'Active') return order.status === 'In Delivery';
    return !!order
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
        {filteredOrders.map((order) => (
          <div
            key={order.productId}
            className="orderCard w-full p-4 rounded-xl flex gap-4 bg-white shadow-md"
          >
            {/* Image */}
            <div className="imageContainer w-1/3 h-36 bg-gray-200 flex justify-center items-center rounded-xl overflow-hidden">
              <img src={order.images[0]} alt={order.name} className="w-32 h-32 object-cover" />
            </div>

            {/* Details */}
            <div className="details w-2/3 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-xl">{order.name}</h3>
                <div className="flex gap-4 mt-2">
                  <span className="text-sm text-gray-500">Size: {order.size}</span>
                  <span className="text-sm text-gray-500">Color: {order.color}</span>
                </div>
              </div>

              <div className="status bg-gray-100 px-2 py-1 rounded-md text-sm font-semibold text-gray-600">
                {order.status}
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-sm font-bold text-gray-700">
                  Total: ${order.total_price.toFixed(2)}
                </p>
                <button
                  className="bg-black text-white px-4 py-2 rounded-full text-sm"
                  onClick={() => console.log(`Track Order: ${order.productId}`)}
                >
                  Track Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

