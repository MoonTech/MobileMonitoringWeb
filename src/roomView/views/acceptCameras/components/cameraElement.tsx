import { styled } from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useAcceptCamera } from "../../../mutations/acceptCamera";
import { useRejectCamera } from "../../../mutations/rejectCamera";
import { toast } from "react-toastify";
import { useTheme } from "../../../../contexts/themeContext";

const CameraElementContainer = styled.div`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.backgroundLight};
  color: ${(props) => props.theme.colors.backgroundFont};
  height: 80px;
  display: flex;
  flex-direction: row;
  margin-right: 20px;
  margin-left: 20px;
  transition: 0.2s all;
`;

const ClickContainer = styled.div<{ accept: boolean }>`
  width: 80px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  border-radius: 40px;
  transition: 0.3s ease-in;
  .icon {
    transition: 0.3s ease-in;
  }
  &:hover {
    background-color: ${(props) =>
    props.accept ? props.theme.colors.green : props.theme.colors.red};
    .icon {
      color: ${(props) =>
    props.accept
      ? props.theme.colors.greenDark
      : props.theme.colors.redDark};
      font-size: 50px;
    }
  }
`;

const MiddleContainer = styled.div`
  flex: 5;
  display: flex;
  justify-content: center;
`;

type CameraElementProps = {
  name: string;
  roomName: string;
  id: string;
};

export const CameraElement = (props: CameraElementProps) => {
  const acceptCamera = useAcceptCamera(props.roomName);
  const rejectCamera = useRejectCamera(props.roomName);
  const { theme } = useTheme();
  return (
    <CameraElementContainer>
      <ClickContainer
        onClick={async () => {
          await rejectCamera(props.id).catch(() => { });
          toast("Could not reject the camera", {
            position: "bottom-left",
            autoClose: 5000,
            closeOnClick: true,
            theme,
          });
        }}
        accept={false}
        className="left"
      >
        <CloseIcon fontSize="inherit" className="icon" />
      </ClickContainer>
      <MiddleContainer>
        <h1>Camera: {props.name}</h1>
      </MiddleContainer>
      <ClickContainer
        onClick={async () => {
          await acceptCamera(props.id).catch(() => {
            toast("Could not accept the camera", {
              position: "bottom-left",
              autoClose: 5000,
              closeOnClick: true,
              theme,
            });
          });
        }}
        accept={true}
        className="right"
      >
        <CheckIcon fontSize="inherit" className="icon" />
      </ClickContainer>
    </CameraElementContainer>
  );
};
