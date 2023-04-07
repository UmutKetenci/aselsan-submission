import { createStore, combineReducers } from "redux";
import Money from "../components/Money";
/* VENDING MACHINE STATE */
export interface VendingMachineState {
  money: number;
  products: Product[];
  selectedProduct: Product | null;
  refundAmount: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export const initialVendingMachineState: VendingMachineState = {
  money: 0,
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
};

enum VendingMachineActionTypes {
  SELECT_PRODUCT = "SELECT_PRODUCT",
  ACCEPT_MONEY = "ACCEPT_MONEY",
  COMPLETE_PURCHASE = "COMPLETE_PURCHASE",
  CANCEL_PROCESS = "CANCEL_PROCESS",
  COLLECT_MONEY = "COLLECT_MONEY",
  RESET_MACHINE = "RESET_MACHINE",
}

interface SelectProductAction {
  type: typeof VendingMachineActionTypes.SELECT_PRODUCT;
  payload: Product;
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

type VendingMachineActions =
  | SelectProductAction
  | AcceptMoneyAction
  | CancelProcessAction
  | CollectMoneyAction
  | ResetMachineAction
  | CompletePurchaseAction;

function vendingMachineReducer(
  state = initialVendingMachineState,
  action: VendingMachineActions
): VendingMachineState {
  switch (action.type) {
    case VendingMachineActionTypes.SELECT_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload,
      };
    case VendingMachineActionTypes.ACCEPT_MONEY:
      console.log("heyo", state.money);
      return {
        ...state,
        money: state.money + action.payload,
      };
    case VendingMachineActionTypes.CANCEL_PROCESS:
      return {
        ...state,
        selectedProduct: null,
        refundAmount: state.money,
        money: 0,
      };
    case VendingMachineActionTypes.COMPLETE_PURCHASE:
      const productPrice = state.selectedProduct?.price ?? 0;
      const change = state.money - productPrice;
      return {
        ...state,
        selectedProduct: null,
        money: 0,
        refundAmount: change < 0 ? state.money : change,
      };
    case VendingMachineActionTypes.COLLECT_MONEY:
      return {
        ...state,
        refundAmount: 0,
      };
    case VendingMachineActionTypes.RESET_MACHINE:
      return {
        products: [],
        selectedProduct: null,
        money: 0,
        refundAmount: 0,
      };
    default:
      return state;
  }
}

export function acceptMoney(amount: number): AcceptMoneyAction {
  console.log(amount);
  return { type: VendingMachineActionTypes.ACCEPT_MONEY, payload: amount };
}

export function selectProduct(selection: Product): SelectProductAction {
  return { type: VendingMachineActionTypes.SELECT_PRODUCT, payload: selection };
}

export function completePurchase(): CompletePurchaseAction {
  return { type: VendingMachineActionTypes.COMPLETE_PURCHASE };
}

export function refundMoney(): CollectMoneyAction {
  return { type: VendingMachineActionTypes.COLLECT_MONEY };
}

export function cancelProcess(): CancelProcessAction {
  return { type: VendingMachineActionTypes.CANCEL_PROCESS };
}

export function resetMachine(): ResetMachineAction {
  return { type: VendingMachineActionTypes.RESET_MACHINE };
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
  payload: number;
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
  return { ...state };
}

/* Temperature state */

interface TemperatureState {
  temperature: number;
  isOverheating: boolean;
}

const initialTemperatureState: TemperatureState = {
  temperature: 25,
  isOverheating: true,
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
      return { isOverheating: true, temperature: state.temperature - 2 };
    case TemperatureTypes.HEATING:
      return { isOverheating: false, temperature: state.temperature + 2 };
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

/*  Money constant */
export const moneyArray: Money[] = [
  { amount: 1, color: "gray" },
  { amount: 5, color: "brown" },
  { amount: 10, color: "red" },
  { amount: 20, color: "green" },
];
