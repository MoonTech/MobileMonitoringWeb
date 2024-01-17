import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import { testRender } from "../../testHelpers/testRender";
import AddRoom from "../addRoom";

describe("AddRoom Component", () => {
  it("renders without crashing", () => {
    testRender(<AddRoom />);
  });

  it("displays error message when submitting with empty fields", () => {
    testRender(<AddRoom />);
    const createRoomButton = screen.getByRole("button");
    fireEvent.click(createRoomButton);

    const errorMessage = screen.getByText("Please fill in all fields.");
    expect(errorMessage).toBeInTheDocument();
  });
});
