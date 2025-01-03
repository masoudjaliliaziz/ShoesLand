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
    <div className="order-items">
      <h2>Order Items</h2>
      <ul>
        {orderItems.map((item, index) => (
          <li key={index} className="order-item">
            <img
              src={item.images[0]}
              alt={item.name}
              style={{ width: "50px" }}
            />
            <div>
              <p>{item.name}</p>
              <p>Quantity: {item.count}</p>
              <p>Price: ${item.price}</p>
              <p>Total: ${item.total_price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderItems;
