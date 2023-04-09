import React from "react";
import { Product, RootState, VendingMachineState } from "../../store/store";
import { useSelector } from "react-redux";

interface ChildProp {
  product: Product;
}
const SingleProduct = (props: ChildProp) => {
  const vendingMachineState: VendingMachineState = useSelector(
    (state: RootState) => state.vendingMachineState
  );
  return (
    <div
      className="single-product"
      style={{
        backgroundColor:
          vendingMachineState.selectedProduct?.id === props.product.id
            ? "green"
            : "transparent",
      }}
    >
      <p>{props.product.name || "Empty"}</p>
      <p>{props.product.quantity} quantity</p>
      <p>{props.product.price} Unit </p>
    </div>
  );
};

export default SingleProduct;
