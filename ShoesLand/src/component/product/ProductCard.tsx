import React, { ReactElement } from 'react'
import { FC } from 'react';


export interface ProductProps{
    id: number;
    title: string;
    price: number;
    order: number;
    size: number[];
    color: string[];
    brand: string;
    images: string;
}



const ProductCard: FC<ProductProps>=({id, title, price, order, size, color, brand, images}):ReactElement=> {
    
  return (
    <div>
      <p>{id}</p>
    </div>
  )
}

export default ProductCard
