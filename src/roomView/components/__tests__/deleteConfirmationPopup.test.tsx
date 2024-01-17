import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DeleteConfirmationPopup from "./../deleteConfirmationPopup";

describe("DeleteConfirmationPopup", () => {
  it("renders correctly with the provided props", () => {
    const onCloseMock = jest.fn();
    const onConfirmMock = jest.fn();
    const isOwnedRoom = true;

    render(
      <DeleteConfirmationPopup
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        isOwnedRoom={isOwnedRoom}
      />,
    );

    const popupWrapper = screen.getByTestId("popup-wrapper");
    expect(popupWrapper).toBeInTheDocument();

    const popupContent = screen.getByTestId("popup-content");
    expect(popupContent).toHaveTextContent(
      `Are you sure you want to ${
        isOwnedRoom ? "delete" : "stop observing"
      } the room?`,
    );

    const yesButton = screen.getByText("Yes");
    const noButton = screen.getByText("No");

    expect(yesButton).toBeInTheDocument();
    expect(noButton).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const onCloseMock = jest.fn();
    const onConfirmMock = jest.fn();

    render(
      <DeleteConfirmationPopup
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        isOwnedRoom={true}
      />,
    );

    const closeButton = screen.getByTestId("close-button");

    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
    expect(onConfirmMock).not.toHaveBeenCalled();
  });

  it("calls onConfirm when the Yes button is clicked", () => {
    const onCloseMock = jest.fn();
    const onConfirmMock = jest.fn();

    render(
      <DeleteConfirmationPopup
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        isOwnedRoom={true}
      />,
    );

    const yesButton = screen.getByText("Yes");

    fireEvent.click(yesButton);

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it("calls onClose when the No button is clicked", () => {
    const onCloseMock = jest.fn();
    const onConfirmMock = jest.fn();

    render(
      <DeleteConfirmationPopup
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        isOwnedRoom={true}
      />,
    );

    const noButton = screen.getByText("No");

    fireEvent.click(noButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
    expect(onConfirmMock).not.toHaveBeenCalled();
  });
});
