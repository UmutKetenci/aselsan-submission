import { render, screen } from "@testing-library/react";
import SelectionDisplay from "../../components/DigitalDisplay/SelectionDisplay";

describe("SelectionDisplay", () => {
  it("should render the selected item", () => {
    const selectedItem = "Coke";
    render(<SelectionDisplay selected={selectedItem} />);
    const selectionText = screen.getByText(/Selection:/);
    const selectedText = screen.getByText(selectedItem);
    expect(selectionText).toBeInTheDocument;
    expect(selectedText).toBeInTheDocument;
  });
});
