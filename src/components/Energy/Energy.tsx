import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../store/store";

const Energy = () => {
  const energyState = useSelector((state: RootState) => {});
  const dispatch = useDispatch();
  return <div>Energy</div>;
};

export default Energy;
