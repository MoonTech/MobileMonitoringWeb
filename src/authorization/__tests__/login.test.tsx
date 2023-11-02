import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./../login";
import { testRender } from "../../__tests__/testRender";

describe("Login Component", () => {
  it("renders without crashing", () => {
    testRender(<Login />);
  });

  it("displays error message when submitting with empty fields", () => {
    testRender(<Login />);
    const loginButton = screen.queryByRole("button");
    fireEvent.click(loginButton);
    const errorMessage = screen.getByText("Please fill in all fields.");
    expect(errorMessage).toBeInTheDocument();
  });

  it("clears input fields and error message on successful form submission", () => {
    testRender(<Login />);
    const roomNameInput = screen.getByPlaceholderText("Room name");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.queryByRole("button");

    fireEvent.change(roomNameInput, { target: { value: "Test Room" } });
    fireEvent.change(passwordInput, { target: { value: "test123" } });
    fireEvent.click(loginButton);

    expect(roomNameInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");
    expect(screen.queryByText("Please fill in all fields.")).toBeNull();
  });
});
