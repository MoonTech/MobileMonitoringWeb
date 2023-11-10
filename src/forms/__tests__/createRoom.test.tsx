import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import CreateRoom from "./../createRoom";
import { testRender } from "../../__tests__/testRender";

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

  it("clears input fields and error message on successful room creation", () => {
    testRender(<CreateRoom />);
    const roomNameInput = screen.getByPlaceholderText("Room name");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm Password");
    const createRoomButton = screen.getByRole("button");

    fireEvent.change(roomNameInput, { target: { value: "Test Room" } });
    fireEvent.change(passwordInput, { target: { value: "test123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "test123" } });
    fireEvent.click(createRoomButton);

    expect(roomNameInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
    expect(confirmPasswordInput).toHaveValue("");
    expect(screen.queryByText("Please fill in all fields.")).toBeNull();
    expect(screen.queryByText("Passwords do not match.")).toBeNull();
  });

  it("navigates to the login page on 'Go to Login' link click", () => {
    const { container } = testRender(<CreateRoom />);
    const loginLink = screen.getByText("Go to Login");
    fireEvent.click(loginLink);

    expect(container.innerHTML).toMatch("/login");
  });
});
