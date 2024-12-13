import React, { useEffect } from "react";
import { ProductProps } from "./ProductCard";
import axios from "axios";
import { useParams } from "react-router-dom";
interface ProductDetailParams {
  id: string | number;
}

export function ProductDetail<ProductDetailParams>() {
  const { id } = useParams();

  const prodcut = data.find((product) => product.id == Number(id));
  return <p>{prodcut?.title}</p>;
}
