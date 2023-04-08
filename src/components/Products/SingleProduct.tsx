import React from "react";
import { Product } from "../../store/store";

interface ChildProp {
  product: Product;
}
const SingleProduct = (props: ChildProp) => {
  return (
    <div className="single-product">
      <p>{props.product.name || "Empty"}</p>
      <p>{props.product.quantity} quantity</p>
      <p>{props.product.price} Unit </p>
    </div>
  );
};

export default SingleProduct;
