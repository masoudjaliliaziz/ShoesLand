import React, { useContext } from 'react'
import { ApiContext } from '../component/base/Api';
import ProductList from '../component/product/ProductList';

function WishList() {
    const apiContext = useContext(ApiContext);
  return (
    <>
      {apiContext && (
        <ProductList
          products={apiContext.data}
          productSet={apiContext.setData}
          dispatchCaller={{ type: "wishList", value: "true" }}
        />
      )}
    </>
  )
}

export default WishList;
