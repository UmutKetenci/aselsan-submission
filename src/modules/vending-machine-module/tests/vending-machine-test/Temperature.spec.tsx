import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "../../../../store/store";
import Temperature from "../../components/Temperature/Temperature";

describe("Temperature component", () => {
  let store = createStore(rootReducer);

  it("renders temperature", () => {
    render(
      <Provider store={store}>
        <Temperature />
      </Provider>
    );

    expect(screen.getByText("Temperature: 25")).toBeInTheDocument;
  });

  it("decreases temperature after 5 seconds", () => {
    render(
      <Provider store={store}>
        <Temperature />
      </Provider>
    );

    setTimeout(() => {
      expect(screen.getByText("Temperature: 24")).toBeInTheDocument;
    }, 5000);
  });
});
