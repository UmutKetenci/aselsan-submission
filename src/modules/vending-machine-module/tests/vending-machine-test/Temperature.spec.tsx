import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store, { rootReducer } from "../../../../store/store";
import Temperature from "../../components/Temperature/Temperature";

describe("Temperature component", () => {
  it("renders temperature", () => {
    render(
      <Provider store={store}>
        <Temperature />
      </Provider>
    );

    expect(screen.getByText(/25/)).toBeInTheDocument;
  });

  it("decreases temperature after 5 seconds", () => {
    render(
      <Provider store={store}>
        <Temperature />
      </Provider>
    );

    setTimeout(() => {
      expect(screen.getByText("Temperature: 20")).toBeInTheDocument;
    }, 5000);
  });
});
