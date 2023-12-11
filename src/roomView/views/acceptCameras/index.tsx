import { styled } from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";
import { useAcceptCamera } from "../../mutations/acceptCamera";
import { useRejectCamera } from "../../mutations/rejectCamera";
import { useGetCameraToAccept } from "../../queries/getCamerasToAccept";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex: 3;
  justify-content: center;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  width: min(800px, 70vw);
`;

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
  cameraName: string;
  roomName: string;
};

const CameraElement = (props: CameraElementProps) => {
  const acceptCamera = useAcceptCamera(props.roomName);
  const rejectCamera = useRejectCamera(props.roomName);
  return (
    <CameraElementContainer>
      <ClickContainer
        onClick={async () => {
          await rejectCamera(props.cameraName);
        }}
        accept={false}
        className="left"
      >
        <CloseIcon fontSize="inherit" className="icon" />
      </ClickContainer>
      <MiddleContainer>
        <h1>Camera: {props.cameraName}</h1>
      </MiddleContainer>
      <ClickContainer
        onClick={async () => {
          await acceptCamera(props.cameraName);
        }}
        accept={true}
        className="right"
      >
        <CheckIcon fontSize="inherit" className="icon" />
      </ClickContainer>
    </CameraElementContainer>
  );
};

const Title = styled.h1`
  color: ${(props) => props.theme.colors.backgroundFont};
`;

const AcceptCameras = () => {
  const { id } = useParams();
  const cameras = useGetCameraToAccept(id as string);
  return (
    <Content>
      <List>
        <Title>Accept cameras for room: {id}</Title>
        {cameras.response?.map((camera) => (
          <CameraElement
            cameraName={camera.id}
            key={camera.id}
            roomName={id as string}
          />
        ))}
      </List>
    </Content>
  );
};

export default AcceptCameras;
