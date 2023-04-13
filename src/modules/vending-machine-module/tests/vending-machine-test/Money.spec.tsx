import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store, { acceptMoney } from "../../../../store/store";
import { useDispatch } from "react-redux";
import Money from "../../components/Money/Money";

describe("Money component", () => {
  const dispatch = useDispatch;

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
