import React, { ReactElement } from "react";
import { FC } from "react";

export interface ProductProps {
  id: number;
  title: string;
  price: number;
  order: number;
  size: number[];
  color: string[];
  brand: string;
  images: string;
}

const ProductCard: FC<ProductProps> = ({
  id,
  title,
  price,
  order,
  size,
  color,
  brand,
  images,
}): ReactElement => {
  return (
    <div key={id}>
      <div>
        {/* <img src={images} alt={title} /> */}
        <h2>{title}</h2>
        <span>{price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
