import VendingMachine from "./components/VendingMachine";
import { moneyArray } from "./store/store";
import Money from "./components/Money/Money";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <VendingMachine />
      <div>
        <div className="money-container">
          {moneyArray.map((money: Money) => {
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
