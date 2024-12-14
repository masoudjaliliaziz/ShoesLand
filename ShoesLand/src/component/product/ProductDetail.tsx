import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ApiContext } from "../base/Api";

export function ProductDetail() {
  const apiContext = useContext(ApiContext);

  const { id } = useParams();
  let prodcut;
  if (apiContext) {
    prodcut = apiContext.data.find((product) => product.id == Number(id));
  }

  return <p>{prodcut?.title}</p>;
}
