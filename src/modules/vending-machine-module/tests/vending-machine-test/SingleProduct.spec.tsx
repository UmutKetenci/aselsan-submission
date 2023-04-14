import { render, screen } from "@testing-library/react";
import SingleProduct from "../../components/Products/SingleProduct";
import store from "../../../../store/store";
import { Provider } from "react-redux";

const mockProduct = {
  id: 1,
  name: "Test Product",
  quantity: 5,
  price: 10,
  currentTemperature: 25,
  desiredTemperature: 25,
};

describe("SingleProduct component", () => {
  it("should render product name", () => {
    render(
      <Provider store={store}>
        <SingleProduct product={mockProduct} />
      </Provider>
    );
    expect(screen.getByText("Test Product")).toBeInTheDocument;
  });

  it("should render product quantity and price", () => {
    render(
      <Provider store={store}>
        <SingleProduct product={mockProduct} />
      </Provider>
    );
    expect(screen.getByText("5 quantity")).toBeInTheDocument;
    expect(screen.getByText("10 Unit")).toBeInTheDocument;
  });
});
