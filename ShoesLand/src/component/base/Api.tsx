import React, { ReactNode } from "react";
import { useContext, createContext, useEffect } from "react";
import axios from "axios";
import { ProductProps } from "../../component/product/ProductCard";
import { UserProps } from "./Interfaces";

interface Children {
  children: React.ReactNode;
}

export interface TValueContext {
  data: ProductProps[];
  setData: React.Dispatch<React.SetStateAction<ProductProps[]>>;
  users: UserProps[];
  setUsers: React.Dispatch<React.SetStateAction<UserProps[]>>;
}

export const ApiContext = createContext<TValueContext | null>(null);

function Api({ children }: Children) {
  const [data, setData] = React.useState<ProductProps[]>([]);
  const [users, setUsers] = React.useState<UserProps[]>([])

  useEffect(() => {
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
    <ApiContext.Provider value={{ data, setData, users, setUsers }}>
      {children}
    </ApiContext.Provider>
  );
}

export default Api;
