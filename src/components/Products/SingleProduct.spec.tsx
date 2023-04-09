import React from "react";
import { render, screen } from "@testing-library/react";
import SingleProduct from "./SingleProduct";

const mockProduct = {
  id: 1,
  name: "Test Product",
  quantity: 5,
  price: 10,
};

describe("SingleProduct component", () => {
  it("should render product name", () => {
    render(<SingleProduct product={mockProduct} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument;
  });

  it("should render product quantity and price", () => {
    render(<SingleProduct product={mockProduct} />);
    expect(screen.getByText("5 quantity")).toBeInTheDocument;
    expect(screen.getByText("10 Unit")).toBeInTheDocument;
  });
});
