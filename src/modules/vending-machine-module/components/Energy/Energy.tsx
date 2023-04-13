import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EnergyConsumingTypes,
  EnergyState,
  RootState,
  decreaseCost,
} from "../../../../store/store";

const Energy = () => {
  const energyState: EnergyState = useSelector((state: RootState) => {
    return state.energyState;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    let buttonInteractionTimer: any;
    let lightsTimer: any;

    if (energyState.button_interaction === true) {
      buttonInteractionTimer = setTimeout(() => {
        dispatch(decreaseCost(EnergyConsumingTypes.BUTTON_INTERACTION));
      }, 5000);
    }

    if (energyState.lights === true) {
      lightsTimer = setTimeout(() => {
        dispatch(decreaseCost(EnergyConsumingTypes.LIGHTS));
      }, 5000);
    }

    return () => {
      clearTimeout(buttonInteractionTimer);
    };
  }, [energyState.button_interaction, energyState.lights]);

  return (
    <div>
      {energyState && (
        <div>
          Energy Consumption:
          <p>Lighting : {energyState.lights ? "ON" : "OFF"} </p>
          <p>
            Button Interaction : {energyState.button_interaction ? "ON" : "OFF"}
          </p>
          <p>Heating/Cooling : {energyState.heat_or_cool ? "ON" : "OFF"}</p>
          <p>Total consumption: {energyState.cost} </p>
        </div>
      )}
    </div>
  );
};

export default Energy;
