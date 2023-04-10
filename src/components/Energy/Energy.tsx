import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../store/store";

const Energy = () => {
  // This code has no effect in anywhere of the app. It just renders. I planned to use it when an action was being used. It would simply increase the cost by 2.
  const energyState = useSelector((state: RootState) => {});
  const dispatch = useDispatch();
  return <div>Energy Consumption: N/A </div>;
};

export default Energy;
