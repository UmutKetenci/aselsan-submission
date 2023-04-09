import { Provider } from "react-redux";
import BalanceDisplay from "./BalanceDisplay";
import { render, screen } from "@testing-library/react";
import store from "../../store/store";
describe("BalanceDisplayComponent", () => {
  it("should write 0 at the beginning", () => {
    render(
      <Provider store={store}>
        <BalanceDisplay></BalanceDisplay>
      </Provider>
    );
    expect(screen.getByText("0")).toBeInTheDocument;
  });
});
