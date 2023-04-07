import * as React from "react";
import { useDispatch } from "react-redux";
import { RootState, acceptMoney, moneyArray } from "../store/store";
import { useSelector } from "react-redux";
import { Dispatch } from "redux";
import Money from "./Money";
import { Button } from "@mui/material";

const VendingMachine = () => {
  const balance = useSelector(
    (state: RootState) => state.vendingMachineState.money
  );
  const dispatch: Dispatch = useDispatch();
  const buttonNumbers = Array.from({ length: 9 }, (_, index) => index + 1);
  return (
    <>
      <div className="vending-machine-container">
        <div className="products">products</div>
        <div className="balance-and-buttons">
          <div className="buttons">
            {buttonNumbers.map((button) => {
              return <Button variant="outlined"> {button} </Button>;
            })}
          </div>
        </div>
      </div>
      <p>Balance: {balance} Unit</p>
      <div>
        <h2>Money</h2>
        {moneyArray.map((money: Money) => {
          return <Money color={money.color} amount={money.amount} />;
        })}
      </div>
    </>
  );
};

export default VendingMachine;
