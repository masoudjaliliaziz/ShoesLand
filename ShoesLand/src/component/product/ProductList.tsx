import React from 'react';
import { ProductProps } from './ProductCard';
import ProductCard from './ProductCard';
import { useEffect } from 'react';
import axios from 'axios';

interface ProductListProps {
    props: ProductProps[];
}

function ProductList({props}: ProductListProps) {

    useEffect(() => {
        axios.get("http://localhost:5173")
        .then(response => {
        setData(response.data);
        })
        .catch(error => {
        console.log(error);
        });
        }, []);

  return (
    <div>
      {props.map((item: ProductProps)=>{
        
        return(
            <ProductCard {...item}/>
        )
      })}
    </div>
  )
}

export default ProductList;

