import React from 'react';
import { orderHooks } from './../api/queryClinet'; // Adjust the path to where your hook is located

const Orders = () => {
  const { data: orders, isSuccess, isLoading, isError } = orderHooks.useFetchOrder();

  if (isLoading) {
    return <p>Loading orders...</p>;
  }

  if (isError) {
    return <p>Error fetching orders.</p>;
  }

  if (!isSuccess || !orders || orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div>
      <h2>Orders</h2>
      {orders.map((order) => (
        <div key={order.productId}>
          <div>
            <img src={order.images[0]} alt={order.name} width={100} height={100} />
          </div>
          <div>
            <h3>{order.name}</h3>
            <p>Status: {order.status}</p>
            <p>Size: {order.size}</p>
            <p>Color: {order.color}</p>
            <p>Count: {order.count}</p>
            <p>Price per item: ${order.price}</p>
            <p>Total Price: ${order.total_price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
