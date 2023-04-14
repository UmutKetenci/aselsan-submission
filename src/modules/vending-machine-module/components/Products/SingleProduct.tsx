import { useEffect } from "react";
import {
  Product,
  RootState,
  VendingMachineState,
  decreaseProductTemperature,
  increaseProductTemperature,
} from "../../../../store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

interface ChildProp {
  product: Product;
}
const SingleProduct = (props: ChildProp) => {
  const dispatch = useDispatch();
  const vendingMachineState: VendingMachineState = useSelector(
    (state: RootState) => state.vendingMachineState
  );
  const temperatureState = useSelector(
    (state: RootState) => state.temperatureState
  );
  useEffect(() => {
    const timer = setInterval(() => {
      if (
        props.product.currentTemperature !== props.product.desiredTemperature &&
        props.product.name
      ) {
        if (
          props.product.currentTemperature > props.product.desiredTemperature
        ) {
          dispatch(decreaseProductTemperature(props.product.id));
        } else {
          dispatch(increaseProductTemperature(props.product.id));
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [temperatureState.temperature, dispatch, props]);
  //below, selected products color will turn green when selected.
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
      <p style={{ textAlign: "center" }}>{props.product.id}</p>
      <p>{props.product.name || "Empty"}</p>
      <p>{props.product.quantity} quantity</p>
      <p>{props.product.price} Unit </p>
      <p>Temperature: {props.product.currentTemperature}</p>
    </div>
  );
};

export default SingleProduct;
