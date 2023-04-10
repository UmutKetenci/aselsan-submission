import * as React from "react";
import { useDispatch } from "react-redux";
import {
  RootState,
  VendingMachineState,
  cancelProcess,
  collectMoney,
  completePurchase,
  increaseTemperature,
  increaseTime,
  resetMachine,
  selectProductNumber,
} from "../store/store";
import { useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Button } from "@mui/material";
import Products from "./Products/Products";
import BalanceDisplay from "./DigitalDisplay/BalanceDisplay";
import SelectionDisplay from "./DigitalDisplay/SelectionDisplay";
import Temperature from "./Temperature/Temperature";
import Energy from "./Energy/Energy";

const VendingMachine = () => {
  const vendingMachineState: VendingMachineState = useSelector(
    (state: RootState) => state.vendingMachineState
  );
  const [selection, setSelection] = React.useState(0);
  const dispatch: Dispatch = useDispatch();
  const buttonNumbers = Array.from({ length: 9 }, (_, index) => index + 1); //creates number buttons from 1 to 9
  const handleCompletePurchase = () => {
    dispatch(increaseTemperature());
    dispatch(completePurchase());
    setSelection(0);
  };
  React.useEffect(() => {
    const timer = setInterval(() => {
      //increases time
      dispatch(increaseTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
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
                  {button}
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
        <div className="back-of-vending-machine">
          <p>{vendingMachineState.time} minutes elapsed</p>
          <div className="util-buttons">
            <Button
              variant="contained"
              onClick={() => dispatch(resetMachine())}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              onClick={() => dispatch(collectMoney())}
            >
              Collect Money
            </Button>
          </div>
          <div className="temperature-energy-container">
            <div>
              <Temperature></Temperature>
            </div>
            <div>
              <Energy></Energy>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendingMachine;
