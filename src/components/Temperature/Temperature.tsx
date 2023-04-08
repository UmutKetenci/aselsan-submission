import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../store/store";

const Temperature = () => {
  const temperatureState = useSelector((state: RootState) => {
    return state.temperatureState;
  });
  const dispatch = useDispatch();
  return <div>{temperatureState.temperature}</div>;
};

export default Temperature;
