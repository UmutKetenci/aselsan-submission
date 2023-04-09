import { createStore, combineReducers } from "redux";
import Money from "../components/Money/Money";
import { toast } from "react-toastify";

/* VENDING MACHINE STATE */
export interface VendingMachineState {
  balance: number;
  products: Product[];
  selectedProduct: Product | null;
  refundAmount: number;
  earnedMoney: number;
  time: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export const initialVendingMachineState: VendingMachineState = {
  balance: 0,
  products: [
    { id: 1, name: "Water", price: 25, quantity: 10 },
    { id: 2, name: "Coke", price: 35, quantity: 10 },
    { id: 3, name: "Soda", price: 45, quantity: 10 },
    { id: 4, name: "", price: 0, quantity: 0 },
    { id: 5, name: "", price: 0, quantity: 0 },
    { id: 6, name: "", price: 0, quantity: 0 },
    { id: 7, name: "", price: 0, quantity: 0 },
    { id: 8, name: "", price: 0, quantity: 0 },
    { id: 9, name: "", price: 0, quantity: 0 },
  ],
  selectedProduct: null,
  refundAmount: 0,
  earnedMoney: 0,
  time: 0,
};

enum VendingMachineActionTypes {
  SELECT_PRODUCT = "SELECT_PRODUCT",
  ACCEPT_MONEY = "ACCEPT_MONEY",
  COMPLETE_PURCHASE = "COMPLETE_PURCHASE",
  CANCEL_PROCESS = "CANCEL_PROCESS",
  COLLECT_MONEY = "COLLECT_MONEY",
  RESET_MACHINE = "RESET_MACHINE",
  INCREASE_TIME = "INCREASE_TIME",
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
  type: typeof VendingMachineActionTypes.INCREASE_TIME;
}

type VendingMachineActions =
  | SelectProductNumberAction
  | AcceptMoneyAction
  | CancelProcessAction
  | CollectMoneyAction
  | ResetMachineAction
  | CompletePurchaseAction
  | IncreaseTimeAction;

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
      /* buraya girmeden önce scam protection yapılmalı. o reducer a göre accept money action'una girmeli */
      return {
        ...state,
        balance: state.balance + action.payload,
      };
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
        products: [],
        selectedProduct: null,
        balance: 0,
        refundAmount: 0,
        earnedMoney: 0,
        time: state.time + 5,
      };
    case VendingMachineActionTypes.INCREASE_TIME:
      return { ...state, time: state.time + 1 };
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

/* SCAM PROTECTION STATE */

interface ScamProtectionState {
  scamming: boolean;
}

const initialScamProtectionState: ScamProtectionState = {
  scamming: false,
};

enum ScamProtectionActionTypes {
  DETECT_SCAM = "DETECT_SCAM",
  STOP_SCAM = "STOP_SCAM",
}

interface DetectScammingAction {
  type: ScamProtectionActionTypes.DETECT_SCAM;
}

interface StopScammingAction {
  type: ScamProtectionActionTypes.STOP_SCAM;
}

type ScamProtectionActions = DetectScammingAction | StopScammingAction;

export function scamProtectionReducer(
  state = initialScamProtectionState,
  action: ScamProtectionActions
): ScamProtectionState {
  switch (action.type) {
    case ScamProtectionActionTypes.DETECT_SCAM:
      return { ...state, scamming: true };
    case ScamProtectionActionTypes.STOP_SCAM:
      return { ...state, scamming: true };
  }
  return state;
}

export function detectScam(): DetectScammingAction {
  return { type: ScamProtectionActionTypes.DETECT_SCAM };
}
export function stopScam(): StopScammingAction {
  return { type: ScamProtectionActionTypes.STOP_SCAM };
}

/* Temperature state */

export interface TemperatureState {
  temperature: number;
  isOverheating: boolean;
  selectedTemperatureCelsius: number;
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
  scamProtectionState: ScamProtectionState;
}

const rootReducer = combineReducers({
  vendingMachineState: vendingMachineReducer,
  temperatureState: temperatureReducer,
  scamProtectionState: scamProtectionReducer,
});

const store = createStore(rootReducer);

export default store;

/* Energy State */

interface EnergyState {
  cost: number;
}

const initialEnergyState = {
  cost: 0,
};

/*  Money constant */
export const moneyArray: Money[] = [
  { amount: 1, color: "gray" },
  { amount: 5, color: "brown" },
  { amount: 10, color: "red" },
  { amount: 20, color: "green" },
];
