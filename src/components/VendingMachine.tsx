import * as React from "react";
import { useDispatch } from "react-redux";
import {
  RootState,
  cancelProcess,
  completePurchase,
  moneyArray,
  selectProductNumber,
} from "../store/store";
import { useSelector } from "react-redux";
import { Dispatch } from "redux";
import Money from "./Money";
import { Button } from "@mui/material";
import Products from "./Products/Products";
import BalanceDisplay from "./DigitalDisplay/BalanceDisplay";
import SelectionDisplay from "./DigitalDisplay/SelectionDisplay";
import Temperature from "./Temperature/Temperature";
import Energy from "./Energy/Energy";

const VendingMachine = () => {
  const balance = useSelector(
    (state: RootState) => state.vendingMachineState.balance
  );
  const [selection, setSelection] = React.useState(0);
  const dispatch: Dispatch = useDispatch();
  const buttonNumbers = Array.from({ length: 9 }, (_, index) => index + 1);
  const handleCompletePurchase = () => {
    dispatch(completePurchase());
    setSelection(0);
  };
  return (
    <>
      <div className="vending-machine-container">
        <div className="products">
          <Products />
        </div>
        <div className="digital-display-and-buttons">
          <div className="digital-display">
            <BalanceDisplay></BalanceDisplay>
            <SelectionDisplay selected={selection}></SelectionDisplay>
          </div>
          <div className="number-buttons">
            {buttonNumbers.map((button) => {
              return (
                <Button
                  key={button}
                  variant="outlined"
                  onClick={() => {
                    setSelection(button);
                    dispatch(selectProductNumber(button));
                  }}
                >
                  {" "}
                  {button}{" "}
                </Button>
              );
            })}
          </div>
          <div className="option-buttons">
            <Button
              variant="contained"
              onClick={() => handleCompletePurchase()}
            >
              ok
            </Button>
            <Button
              variant="contained"
              onClick={() => dispatch(cancelProcess())}
            >
              cancel
            </Button>
          </div>
        </div>
      </div>
      <div className="money-temperature-energy-container">
        <div className="money-container">
          {moneyArray.map((money: Money) => {
            return (
              <Money
                key={money.color}
                color={money.color}
                amount={money.amount}
              />
            );
          })}
        </div>
        <div>
          <Temperature></Temperature>
        </div>
        <div>
          <Energy></Energy>
        </div>
      </div>
    </>
  );
};

export default VendingMachine;
