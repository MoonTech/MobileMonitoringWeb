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
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  z-index: 1000;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const PopupContent = styled.div`
  text-align: center;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
`;

const ActionButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  cursor: pointer;
`;

const DeleteConfirmationPopup = ({
  onClose,
  onConfirm,
  isOwnedRoom,
}: DeleteConfirmationPopupProps) => {
  return (
    <PopupWrapper>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <PopupContent>
        <p>
          Are you sure you want to {isOwnedRoom ? "delete" : "stop observing"}{" "}
          the room?
        </p>
        <ActionButton onClick={onConfirm}>Yes</ActionButton>
        <ActionButton onClick={onClose}>No</ActionButton>
      </PopupContent>
    </PopupWrapper>
  );
};

export default DeleteConfirmationPopup;
