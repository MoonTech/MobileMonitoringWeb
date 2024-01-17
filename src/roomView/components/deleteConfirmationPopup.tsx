import { styled } from "styled-components";

type DeleteConfirmationPopupProps = {
  onClose: () => void;
  onConfirm: () => void;
  isOwnedRoom: boolean;
};

const PopupWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.colors.background};
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 10px;
  padding: 20px;
  z-index: 1000;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  font-size: 30px;
`;

const PopupContent = styled.div`
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
`;

const ActionButton = styled.div`
  margin: 10px;
  padding: 10px 20px;
  width: 20%;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.light};
  border-radius: 10px;
  transition: 0.2s all;
  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
  }
  flex: 1;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: space-between;
`;

const DeleteConfirmationPopup = ({
  onClose,
  onConfirm,
  isOwnedRoom,
}: DeleteConfirmationPopupProps) => {
  return (
    <PopupWrapper data-testid="popup-wrapper">
      <CloseButton data-testid="close-button" onClick={onClose}>
        &times;
      </CloseButton>
      <PopupContent data-testid="popup-content">
        <p>
          Are you sure you want to {isOwnedRoom ? "delete" : "stop observing"}{" "}
          the room?
        </p>
        <ButtonsContainer>
          <ActionButton onClick={onConfirm}>Yes</ActionButton>
          <ActionButton onClick={onClose}>No</ActionButton>
        </ButtonsContainer>
      </PopupContent>
    </PopupWrapper>
  );
};

export default DeleteConfirmationPopup;
