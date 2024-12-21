import React, { ReactNode } from "react";
import { useContext, createContext, useEffect } from "react";
import axios from "axios";
import { ProductProps } from "../../component/product/ProductCard";
import { UserProps,LogoProps } from "./Interfaces";

interface Children {
  children: React.ReactNode;
}

export interface TValueContext {
  data: ProductProps[];
  setData: React.Dispatch<React.SetStateAction<ProductProps[]>>;
  users: UserProps[];
  setUsers: React.Dispatch<React.SetStateAction<UserProps[]>>;
  Logos:LogoProps[];
  setLogos: React.Dispatch<React.SetStateAction<LogoProps[]>>;
}

export const ApiContext = createContext<TValueContext | null>(null);

function Api({ children }: Children) {
  const [data, setData] = React.useState<ProductProps[]>([]);
  const [users, setUsers] = React.useState<UserProps[]>([]);
  const [Logos, setLogos] = React.useState<LogoProps[]>([]);
  const [cart, setCart] = React.useState<ProductProps[]>([]);



  useEffect(() => {
    axios.get("http://localhost:5173/users")
    .then((response)=>{
      setCart(response.data);
        localStorage.setItem("cart", JSON.stringify(cart));
      })

    axios
    .get("http://localhost:5173/productsLogo")
    .then((response)=>{
      setLogos(response.data);
      console.log(response)
    })

    axios
    .get("http://localhost:5173/users")
    .then((response)=>{
      setUsers(response.data);
      console.log(response)
    })
    axios
      .get("http://localhost:5173/Products")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ApiContext.Provider value={{ data, setData, users, setUsers,Logos,setLogos }}>
      {children}
    </ApiContext.Provider>
  );
}

export default Api;
