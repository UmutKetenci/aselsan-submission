import { createStore } from "redux";

interface VendingMachineState {
  money: number;
  products: Product[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const initialVendingMachineState: VendingMachineState = {
  money: 0,
  products: [
    { id: 1, name: "Water", price: 25, quantity: 10 },
    { id: 2, name: "Coke", price: 35, quantity: 10 },
    { id: 3, name: "Soda", price: 45, quantity: 10 },
  ],
};

enum VendingMachineActionTypes {
  ADD_MONEY = "ADD_MONEY",
  BUY_PRODUCT = "BUY_PRODUCT",
  CANCEL_PROCESS = "CANCEL_PROCESS",
  RESET = "RESET",
}

interface AddMoneyAction {
  type: typeof VendingMachineActionTypes.ADD_MONEY;
  payload: number;
}

interface BuyProductAction {
  type: typeof VendingMachineActionTypes.BUY_PRODUCT;
  payload: number;
}

interface CancelProcessAction {
  type: typeof VendingMachineActionTypes.CANCEL_PROCESS;
}

interface ResetAction {
  type: typeof VendingMachineActionTypes.RESET;
}

type VendingMachineActions =
  | AddMoneyAction
  | BuyProductAction
  | CancelProcessAction
  | ResetAction;

function vendingMachineReducer(
  state = initialVendingMachineState,
  action: VendingMachineActions
): VendingMachineState {
  switch (action.type) {
    case VendingMachineActionTypes.ADD_MONEY:
      return { ...state, money: state.money + action.payload };
    case VendingMachineActionTypes.BUY_PRODUCT:
      const productIndex = state.products.findIndex((product) => {
        return product.id === action.payload;
      });
      if (
        productIndex !== -1 &&
        state.money >= state.products[productIndex].price
      ) {
        const updatedProducts: Product[] = [...state.products];
        updatedProducts[productIndex].quantity =
          updatedProducts[productIndex].quantity - 1;
        return {
          money: state.money - state.products[productIndex].price,
          products: updatedProducts,
        };
      }
    case VendingMachineActionTypes.CANCEL_PROCESS: {
      return { ...state, money: 0 };
    }
    case VendingMachineActionTypes.RESET: {
      return { ...state, money: 0 };
    }
  }
}

export const VendingMachineStore = createStore(vendingMachineReducer);

export function addMoney(amount: number): AddMoneyAction {
  return { type: VendingMachineActionTypes.ADD_MONEY, payload: amount };
}

export function buyProduct(selection: number): BuyProductAction {
  return { type: VendingMachineActionTypes.BUY_PRODUCT, payload: selection };
}

export function cancelProcess(selection: number): CancelProcessAction {
  return { type: VendingMachineActionTypes.CANCEL_PROCESS };
}

export function reset(selection: number): ResetAction {
  return { type: VendingMachineActionTypes.RESET };
}
