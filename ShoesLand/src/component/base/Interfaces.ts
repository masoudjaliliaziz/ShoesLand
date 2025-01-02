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
  images: string
}

export interface CartItem {
  name: string;
  count: number;
  color: string;
  size: number;
  images: string[];
  productId: number;
}

export interface AddToCartParams {
  productId: number;
  color: string;
  size: number;
  count: number;
}

export interface EditCartParams {
  productId: number;
  count: number;
}

export interface RemoveFromCartParams {
  productId: number;
}
