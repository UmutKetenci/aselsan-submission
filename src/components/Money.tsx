import React from "react";
import { useDispatch } from "react-redux";
import { acceptMoney } from "../store/store";

interface Money {
  color: string;
  amount: number;
}
const Money = (props: Money) => {
  const dispatch = useDispatch();

  const handleInsertMoney = (amount: number): void => {
    dispatch(acceptMoney(props.amount));
  };

  return <div onClick={() => handleInsertMoney(props.amount)}>Money</div>;
};

export default Money;
