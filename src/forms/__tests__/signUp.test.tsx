import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { testRender } from "../../testHelpers/testRender";
import SignUp from "./../signUp";

describe("SignUp Component", () => {
  it("renders without crashing", () => {
    testRender(<SignUp />);
  });

  it("displays error message when submitting with empty fields", () => {
    testRender(<SignUp />);
    const signUpButton = screen.queryByRole("button");
    fireEvent.click(signUpButton);
    const errorMessage = screen.getByText("Please fill in all fields.");
    expect(errorMessage).toBeInTheDocument();
  });

  it("navigates to the login page on 'Go to Login' link click", () => {
    const { container } = testRender(<SignUp />);
    const loginLink = screen.getByText("Go to Login");
    fireEvent.click(loginLink);

    expect(container.innerHTML).toMatch("/login");
  });
});
