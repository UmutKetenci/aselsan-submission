import React from "react";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const BalanceDisplay = () => {
  //Accepted amount of money will show here
  const balance = useSelector(
    (state: RootState) => state.vendingMachineState.balance
  );

  return (
    <div className="balance">
      <p>Balance:</p>
      <p>{balance}</p>
    </div>
  );
};

export default BalanceDisplay;
