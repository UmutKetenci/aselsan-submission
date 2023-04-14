import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EnergyConsumingTypes,
  EnergyState,
  RootState,
  decreaseCost,
} from "../../../../store/store";

interface EnergyProps {
  selection: number;
}

const Energy = (props: EnergyProps) => {
  const energyState: EnergyState = useSelector((state: RootState) => {
    return state.energyState;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    let buttonInteractionTimer: any;

    if (energyState.button_interaction === true) {
      clearTimeout(buttonInteractionTimer);
      buttonInteractionTimer = setTimeout(() => {
        dispatch(decreaseCost(EnergyConsumingTypes.BUTTON_INTERACTION));
      }, 5000);
    }

    return () => {
      clearTimeout(buttonInteractionTimer);
    };
  }, [props.selection, dispatch, energyState.button_interaction]);

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
