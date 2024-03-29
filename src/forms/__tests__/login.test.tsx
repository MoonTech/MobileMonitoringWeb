import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./../login";
import { testRender } from "../../testHelpers/testRender";

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

  it("navigates to the login page on 'Go to Login' link click", () => {
    const { container } = testRender(<Login />);
    const loginLink = screen.getByText("Go to Sign up");
    fireEvent.click(loginLink);

    expect(container.innerHTML).toMatch("/signup");
  });
});
