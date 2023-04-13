import { createStore, combineReducers } from "redux";
import Money from "../modules/vending-machine-module/components/Money/Money";
import { toast } from "react-toastify";

/* VENDING MACHINE STATE */
export interface VendingMachineState {
  balance: number;
  products: Product[];
  selectedProduct: Product | null;
  refundAmount: number;
  earnedMoney: number;
  time: number; // States the elapsed time
  lastTimeSinceMoneyAccept: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  currentTemperature: number;
  desiredTemperature: number;
}

export const initialVendingMachineState: VendingMachineState = {
  balance: 0,
  products: [
    {
      id: 1,
      name: "Water",
      price: 25,
      quantity: 10,
      desiredTemperature: 20,
      currentTemperature: 25,
    },
    {
      id: 2,
      name: "Coke",
      price: 35,
      quantity: 10,
      desiredTemperature: 10,
      currentTemperature: 25,
    },
    {
      id: 3,
      name: "Soda",
      price: 45,
      quantity: 10,
      desiredTemperature: 7,
      currentTemperature: 25,
    },
    {
      id: 4,
      name: "",
      price: 0,
      quantity: 0,
      currentTemperature: 0,
      desiredTemperature: 0,
    },
    {
      id: 5,
      name: "",
      price: 0,
      quantity: 0,
      currentTemperature: 0,
      desiredTemperature: 0,
    },
    {
      id: 6,
      name: "",
      price: 0,
      quantity: 0,
      currentTemperature: 0,
      desiredTemperature: 0,
    },
    {
      id: 7,
      name: "",
      price: 0,
      quantity: 0,
      currentTemperature: 0,
      desiredTemperature: 0,
    },
    {
      id: 8,
      name: "",
      price: 0,
      quantity: 0,
      currentTemperature: 0,
      desiredTemperature: 0,
    },
    {
      id: 9,
      name: "",
      price: 0,
      quantity: 0,
      currentTemperature: 0,
      desiredTemperature: 0,
    },
  ],
  selectedProduct: null,
  refundAmount: 0,
  earnedMoney: 0,
  time: 0,
  lastTimeSinceMoneyAccept: new Date().getTime(),
};

enum VendingMachineActionTypes {
  SELECT_PRODUCT = "SELECT_PRODUCT",
  ACCEPT_MONEY = "ACCEPT_MONEY",
  COMPLETE_PURCHASE = "COMPLETE_PURCHASE",
  CANCEL_PROCESS = "CANCEL_PROCESS",
  COLLECT_MONEY = "COLLECT_MONEY",
  RESET_MACHINE = "RESET_MACHINE",
  INCREASE_TIME = "INCREASE_TIME",
  DECREASE_PRODUCT_TEMPERATURE = "DECREASE_PRODUCT_TEMPERATURE",
  INCREASE_PRODUCT_TEMPERATURE = "INCREASE_PRODUCT_TEMPERATURE",
}

interface SelectProductNumberAction {
  type: typeof VendingMachineActionTypes.SELECT_PRODUCT;
  payload: number;
}

interface AcceptMoneyAction {
  type: typeof VendingMachineActionTypes.ACCEPT_MONEY;
  payload: number;
}

interface CancelProcessAction {
  type: typeof VendingMachineActionTypes.CANCEL_PROCESS;
}

interface CollectMoneyAction {
  type: typeof VendingMachineActionTypes.COLLECT_MONEY;
}

interface CompletePurchaseAction {
  type: typeof VendingMachineActionTypes.COMPLETE_PURCHASE;
}

interface ResetMachineAction {
  type: typeof VendingMachineActionTypes.RESET_MACHINE;
}

interface IncreaseTimeAction {
  type: typeof VendingMachineActionTypes.INCREASE_TIME; //increases time in desired interval
}

interface IncreaseProductTemperatureAction {
  payload: number;
  type: typeof VendingMachineActionTypes.INCREASE_PRODUCT_TEMPERATURE; //Increases product's temperature (Slot temperature)
}

interface DecreaseProductTemperatureAction {
  payload: number;
  type: typeof VendingMachineActionTypes.DECREASE_PRODUCT_TEMPERATURE; //Decreases product's temperature
}

type VendingMachineActions =
  | SelectProductNumberAction
  | AcceptMoneyAction
  | CancelProcessAction
  | CollectMoneyAction
  | ResetMachineAction
  | CompletePurchaseAction
  | IncreaseTimeAction
  | IncreaseProductTemperatureAction
  | DecreaseProductTemperatureAction;

function vendingMachineReducer(
  state = initialVendingMachineState,
  action: VendingMachineActions
): VendingMachineState {
  switch (action.type) {
    case VendingMachineActionTypes.SELECT_PRODUCT:
      const selection = state.products.find((product: Product) => {
        return product.id === action.payload;
      });
      if (selection && selection.name) {
        return {
          ...state,
          selectedProduct: selection,
        };
      } else {
        toast("Seçili slotta ürün bulunmamaktadır.");
        return state;
      }
    case VendingMachineActionTypes.ACCEPT_MONEY:
      const currentTime = new Date().getTime();
      const timeSinceLastAccept = currentTime - state.lastTimeSinceMoneyAccept;
      const amount = action.payload;
      console.log(currentTime, timeSinceLastAccept);

      if (timeSinceLastAccept < 1000 || amount > 20) {
        toast("Scam detected! Money refunded back to customer.");
        return {
          ...state,
          refundAmount: action.payload,
          lastTimeSinceMoneyAccept: currentTime,
        };
      } else {
        return {
          ...state,
          balance: state.balance + action.payload,
          lastTimeSinceMoneyAccept: currentTime,
        };
      }
    case VendingMachineActionTypes.CANCEL_PROCESS:
      if (state.balance > 0) {
        toast(`${state.balance} unit money refunded back to customer`);
      }

      return {
        ...state,
        selectedProduct: null,
        refundAmount: state.balance,
        balance: 0,
        time: state.time + 5,
      };
    case VendingMachineActionTypes.COMPLETE_PURCHASE:
      if (
        state.selectedProduct &&
        state.selectedProduct.quantity > 0 &&
        state.balance - state.selectedProduct.price >= 0
      ) {
        const productPrice = state.selectedProduct?.price || 0;
        const updatedProducts = [...state.products];
        const productIndex = updatedProducts.findIndex((product) => {
          return product.id === state.selectedProduct?.id;
        });
        updatedProducts[productIndex].quantity--;
        toast(`${state.selectedProduct.name} is sold.`);

        return {
          ...state,
          selectedProduct: null,
          balance: state.balance - productPrice,
          products: updatedProducts,
          earnedMoney: state.selectedProduct.price + state.earnedMoney,
          time: state.time + 5,
        };
      } else {
        if (state.selectedProduct && state.selectedProduct?.quantity <= 0) {
          toast(`No ${state.selectedProduct?.name} left on stock`);
        } else if (
          state.selectedProduct &&
          state.balance - state.selectedProduct.price < 0
        ) {
          toast("Insufficient funds.");
        }
        return { ...state, time: state.time + 5 };
      }

    case VendingMachineActionTypes.COLLECT_MONEY:
      if (state.earnedMoney + state.balance > 0) {
        toast(
          `You have earned ${state.earnedMoney + state.balance} unit money`
        );
        return {
          ...state,
          balance: 0,
          refundAmount: 0,
          earnedMoney: 0,
          time: state.time + 5,
        };
      } else {
        toast("There is no money to collect.");
        return state;
      }

    case VendingMachineActionTypes.RESET_MACHINE:
      toast("Machine is reset");
      return {
        ...state,
        selectedProduct: null,
        balance: 0,
        refundAmount: 0,
        earnedMoney: 0,
        time: 0,
      };
    case VendingMachineActionTypes.INCREASE_TIME:
      return { ...state, time: state.time + 1 };
    case VendingMachineActionTypes.DECREASE_PRODUCT_TEMPERATURE:
      const decreaseProductIndex = state.products.findIndex(
        (product: Product) => {
          return product.id === action.payload;
        }
      );
      const decreaseUpdatedProducts = [...state.products];
      decreaseUpdatedProducts[decreaseProductIndex].currentTemperature--;
      return { ...state, products: decreaseUpdatedProducts };
    case VendingMachineActionTypes.INCREASE_PRODUCT_TEMPERATURE:
      const increaseProductIndex = state.products.findIndex(
        (product: Product) => {
          return product.id === action.payload;
        }
      );
      const increaseUpdatedProducts = [...state.products];
      increaseUpdatedProducts[increaseProductIndex].currentTemperature++;
      return { ...state, products: increaseUpdatedProducts };

    default:
      return state;
  }
}

export function acceptMoney(amount: number): AcceptMoneyAction {
  return { type: VendingMachineActionTypes.ACCEPT_MONEY, payload: amount };
}

export function selectProductNumber(
  selection: number
): SelectProductNumberAction {
  return { type: VendingMachineActionTypes.SELECT_PRODUCT, payload: selection };
}

export function completePurchase(): CompletePurchaseAction {
  return { type: VendingMachineActionTypes.COMPLETE_PURCHASE };
}

export function collectMoney(): CollectMoneyAction {
  return { type: VendingMachineActionTypes.COLLECT_MONEY };
}

export function cancelProcess(): CancelProcessAction {
  return { type: VendingMachineActionTypes.CANCEL_PROCESS };
}

export function resetMachine(): ResetMachineAction {
  return { type: VendingMachineActionTypes.RESET_MACHINE };
}

export function increaseTime(): IncreaseTimeAction {
  return { type: VendingMachineActionTypes.INCREASE_TIME };
}

export function decreaseProductTemperature(
  id: number
): DecreaseProductTemperatureAction {
  return {
    type: VendingMachineActionTypes.DECREASE_PRODUCT_TEMPERATURE,
    payload: id,
  };
}

export function increaseProductTemperature(
  id: number
): IncreaseProductTemperatureAction {
  return {
    type: VendingMachineActionTypes.INCREASE_PRODUCT_TEMPERATURE,
    payload: id,
  };
}
/* SCAM PROTECTION STATE */

interface ScamProtectionState {
  lastTimeSinceMoneyAccept: number;
  scamming: boolean;
  amount: number;
}

const initialScamProtectionState: ScamProtectionState = {
  lastTimeSinceMoneyAccept: new Date().getTime(),
  scamming: false,
  amount: 0,
};

/* Temperature state */

export interface TemperatureState {
  temperature: number;
  isOverheating: boolean;
  selectedTemperatureCelsius: number; // Desired temperature of the vending machine
}

const initialTemperatureState: TemperatureState = {
  temperature: 25,
  isOverheating: true,
  selectedTemperatureCelsius: 20,
};

enum TemperatureTypes {
  COOLING = "COOL",
  HEATING = "HEAT",
}

interface DecreaseTemperatureAction {
  type: TemperatureTypes.COOLING;
}

interface IncreaseTemperatureAction {
  type: TemperatureTypes.HEATING;
}

type TemperatureActions = DecreaseTemperatureAction | IncreaseTemperatureAction;

export function temperatureReducer(
  state = initialTemperatureState,
  action: TemperatureActions
): TemperatureState {
  switch (action.type) {
    case TemperatureTypes.COOLING:
      if (state.temperature > state.selectedTemperatureCelsius) {
        return {
          ...state,
          isOverheating: true,
          temperature: state.temperature - 1,
        };
      }
      return {
        ...state,
        temperature: state.temperature - 1,
        isOverheating: false,
      };
    case TemperatureTypes.HEATING:
      if (state.temperature < state.selectedTemperatureCelsius)
        return {
          ...state,
          isOverheating: false,
          temperature: state.temperature + 1,
        };
      else {
        return {
          ...state,
          temperature: state.temperature + 1,
          isOverheating: true,
        };
      }
  }
  return { ...state };
}

export function decreaseTemperature(): DecreaseTemperatureAction {
  return { type: TemperatureTypes.COOLING };
}

export function increaseTemperature(): IncreaseTemperatureAction {
  return { type: TemperatureTypes.HEATING };
}

export interface RootState {
  vendingMachineState: VendingMachineState;
  temperatureState: TemperatureState;
}

export const rootReducer = combineReducers({
  vendingMachineState: vendingMachineReducer,
  temperatureState: temperatureReducer,
});

const store = createStore(rootReducer);

export default store;

/* Energy State */

interface EnergyState {
  // This code is not used in anywhere of the app. I planned to use it when an action was being used. It would simply increase the cost by 2.
  cost: number;
}

const initialEnergyState = {
  cost: 0,
};

/*  Money constant */
export const moneyArray: Money[] = [
  // I wanted to store my moneyArray here for easy approach.
  { amount: 1, color: "gray" },
  { amount: 5, color: "brown" },
  { amount: 10, color: "red" },
  { amount: 20, color: "green" },
];
