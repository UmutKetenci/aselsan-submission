import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import store from "../../../../store/store";
import BalanceDisplay from "../../components/DigitalDisplay/BalanceDisplay";
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
