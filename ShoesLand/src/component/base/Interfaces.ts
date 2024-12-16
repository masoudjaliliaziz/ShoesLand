import { ProductProps } from "../product/ProductCard";

export interface UserProps {
  id: number;
  name: string;
  email: string;
  password: string;
  cart: ProductProps[];
  orders: ProductProps[];
  wishlist: number[];
}

export interface LogoProps {
  id: number;
  brand: string;
  images:string
}