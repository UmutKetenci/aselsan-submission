import * as React from "react";
import { useDispatch } from "react-redux";
import {
  EnergyConsumingTypes,
  EnergyState,
  RootState,
  VendingMachineState,
  cancelProcess,
  collectMoney,
  completePurchase,
  decreaseCost,
  increaseCost,
  increaseProductTemperature,
  increaseTemperature,
  increaseTime,
  resetMachine,
  selectProductNumber,
} from "../../../store/store";
import { useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Button } from "@mui/material";
import Products from "../components/Products/Products";
import BalanceDisplay from "../components/DigitalDisplay/BalanceDisplay";
import SelectionDisplay from "../components/DigitalDisplay/SelectionDisplay";
import Temperature from "../components/Temperature/Temperature";
import Energy from "../components/Energy/Energy";

const VendingMachine = () => {
  const vendingMachineState: VendingMachineState = useSelector(
    (state: RootState) => state.vendingMachineState
  );
  const energyState: EnergyState = useSelector(
    (state: RootState) => state.energyState
  );
  const [selection, setSelection] = React.useState(0);
  const dispatch: Dispatch = useDispatch();
  dispatch(increaseCost(EnergyConsumingTypes.HEAT_OR_COOL));
  const buttonNumbers = Array.from({ length: 9 }, (_, index) => index + 1); //creates number buttons from 1 to 9
  const handleCompletePurchase = () => {
    dispatch(increaseProductTemperature(selection));
    dispatch(increaseTemperature());
    dispatch(increaseCost(EnergyConsumingTypes.BUTTON_INTERACTION));
    dispatch(decreaseCost(EnergyConsumingTypes.LIGHTS));
    dispatch(completePurchase());
    setSelection(0);
  };
  React.useEffect(() => {
    const timer = setInterval(() => {
      //increases time
      dispatch(increaseTime());
    }, 5000);
    return () => clearInterval(timer);
  }, [dispatch]);
  return (
    <>
      <div className="vending-machine-container">
        <div
          className="products"
          style={{
            backgroundColor: energyState.lights ? "#c3c28c" : "transparent",
          }}
        >
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
                    dispatch(
                      increaseCost(EnergyConsumingTypes.BUTTON_INTERACTION)
                    );
                    dispatch(increaseCost(EnergyConsumingTypes.LIGHTS));
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
              onClick={() => {
                dispatch(decreaseCost(EnergyConsumingTypes.LIGHTS));
                dispatch(cancelProcess());
              }}
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
              <Energy selection={selection}></Energy>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendingMachine;
