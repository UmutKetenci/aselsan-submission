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
    dispatch(acceptMoney(amount));
  };

  return (
    <div
      className="money"
      style={{ backgroundColor: props.color }}
      onClick={() => handleInsertMoney(props.amount)}
    >
      {props.amount}
    </div>
  );
};

export default Money;
