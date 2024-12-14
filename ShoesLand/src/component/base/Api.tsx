import React, { ReactNode } from "react";
import { useContext, createContext, useEffect } from "react";
import axios from "axios";
import { ProductProps } from "../../component/product/ProductCard";

interface Children {
  children: React.ReactNode;
}

export interface TValueContext {
  data: ProductProps[];
  setData: React.Dispatch<React.SetStateAction<ProductProps[]>>;
}

export const ApiContext = createContext<TValueContext | null>(null);

function Api({ children }: Children) {
  const [data, setData] = React.useState<ProductProps[]>([]);

  useEffect(() => {
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
    <ApiContext.Provider value={{ data, setData }}>
      {children}
    </ApiContext.Provider>
  );
}

export default Api;
