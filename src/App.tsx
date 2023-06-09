import VendingMachine from "./modules/vending-machine-module/pages/VendingMachine";
import Money, {
  MoneyProp,
} from "./modules/vending-machine-module/components/Money/Money";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { moneyArray } from "./assets/utils/constants";

function App() {
  return (
    <div className="App">
      <VendingMachine />
      <div>
        <div className="money-container">
          {moneyArray.map((money: MoneyProp) => {
            return (
              <Money
                key={money.color}
                color={money.color}
                amount={money.amount}
              />
            );
          })}
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      ></ToastContainer>
    </div>
  );
}

export default App;
