import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import CreateRoom from "./../createRoom";
import { testRender } from "../../testHelpers/testRender";

describe("CreateRoom Component", () => {
  it("renders without crashing", () => {
    testRender(<CreateRoom />);
  });

  it("displays error message when submitting with empty fields", () => {
    testRender(<CreateRoom />);
    const createRoomButton = screen.getByRole("button");
    fireEvent.click(createRoomButton);

    const errorMessage = screen.getByText("Please fill in all fields.");
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays error message when passwords do not match", () => {
    testRender(<CreateRoom />);
    const roomNameInput = screen.getByPlaceholderText("Room name");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm Password");
    const createRoomButton = screen.getByRole("button");

    fireEvent.change(roomNameInput, { target: { value: "Test Room" } });
    fireEvent.change(passwordInput, { target: { value: "test123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "mismatch" } });
    fireEvent.click(createRoomButton);

    const errorMessage = screen.getByText("Passwords do not match.");
    expect(errorMessage).toBeInTheDocument();
  });
});
