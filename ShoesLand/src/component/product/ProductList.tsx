import { ProductProps } from "./ProductCard";
import ProductCard from "./ProductCard";
import React from "react";

interface ProductListProps {
  products: ProductProps[];
  productSet: React.Dispatch<React.SetStateAction<ProductProps[]>>;
}

function ProductList({ products, productSet }: ProductListProps) {
  const [brand, setBrand] = React.useState<string[]>([])
  for (let i of products){
    if(!brand.includes (i.brand)){
      setBrand([...brand, i.brand])
    }

   
  }

  function handleBrandFiltering(brand: string){
    productSet(products.filter((product)=> product.brand == brand))
 }
console.log(brand)
  return (
    <div className="flex h-screen">
      {brand.map((item)=>{
        return(
          <button className="p-3 bg-red-600" onClick={()=>handleBrandFiltering(item)}>{item}</button>
        )
      })}
      {products.map((item: ProductProps) => (
        <ProductCard {...item} />
      ))}
    </div>
  );
}

export default ProductList;
