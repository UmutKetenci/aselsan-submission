import { useDispatch } from "react-redux";
import { acceptMoney } from "../../../../store/store";
import { toast } from "react-toastify";

export interface MoneyProp {
  color: string;
  amount: number;
}
const Money = (props: MoneyProp) => {
  const dispatch = useDispatch();

  const handleInsertMoney = (amount: number): void => {
    toast(`Inserted ${amount} unit money.`);
    dispatch(acceptMoney(amount));
  };

  return (
    <div
      className="money"
      style={{ backgroundColor: props.color }}
      onClick={() => handleInsertMoney(props.amount)}
    >
      {props.amount} Unit Money
    </div>
  );
};

export default Money;
