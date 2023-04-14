import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../../store/store";
import Money from "../../components/Money/Money";

describe("Money component", () => {
  beforeEach(() => {});

  test("should insert money and dispatch acceptMoney action", () => {
    const amount = 5;
    const { getByText } = render(
      <Provider store={store}>
        <Money color="green" amount={amount} />
      </Provider>
    );
    expect(getByText(`${amount} Unit Money`)).toBeInTheDocument;
  });
});
