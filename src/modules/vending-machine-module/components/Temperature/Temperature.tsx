import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  RootState,
  TemperatureState,
  decreaseTemperature,
  increaseTemperature,
} from "../../../../store/store";

const Temperature = () => {
  const temperatureState: TemperatureState = useSelector((state: RootState) => {
    return state.temperatureState;
  });
  const dispatch = useDispatch();
  React.useEffect(() => {
    const temperature = setInterval(() => {
      if (temperatureState.isOverheating) {
        dispatch(decreaseTemperature());
      } else {
        dispatch(increaseTemperature());
      }
    }, 5000);
    return () => clearInterval(temperature);
  }, [temperatureState.isOverheating]);
  return <div>Vending Machine Temperature: {temperatureState.temperature}</div>;
};

export default Temperature;
