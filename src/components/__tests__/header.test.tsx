import { screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./../header";
import { testRender } from "../../testHelpers/testRender";

describe("Header", () => {
  it("renders without crashing", () => {
    testRender(<Header />);

    const logoElement = screen.getByText(/MobileMonitoring/i);
    expect(logoElement).toBeInTheDocument();
  });
});
