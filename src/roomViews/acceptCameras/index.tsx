import { styled } from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useCameraToAccept } from "../queries/getCamerasToAccept";
import { useParams } from "react-router-dom";
import { useAcceptCamera } from "../mutations/acceptCamera";
import { useRejectCamera } from "../mutations/rejectCamera";
import { SideBarContainer } from "../components/sideBarContainer";
import { SideMenuContainer } from "../components/sideMenuContainer";
import { CameraListContainer } from "../components/cameraListContainer";
import { SideMenuOption } from "../components/sideMenuOption";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { OneCameraIcon } from "../components/oneCameraIcon";
import { SplitCameraIcon } from "../components/splitCameraIcon";
import { Camera } from "../components/camera";
import { Container } from "../components/container";

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
  background-color: ${(props) => props.theme.colors.light};
  height: 80px;
  display: flex;
  flex-direction: row;
  margin-right: 20px;
  margin-left: 20px;
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
        props.accept ? props.theme.colors.middle : props.theme.colors.red};
    .icon {
      color: ${(props) => (props.accept ? "green" : "red")};
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
};

const CameraElement = (props: CameraElementProps) => {
    const acceptCamera = useAcceptCamera();
    const rejectCamera = useRejectCamera();
    return (
        <CameraElementContainer>
            <ClickContainer
                onClick={async () => {
                    await acceptCamera(props.cameraName);
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
                    await rejectCamera(props.cameraName);
                }}
                accept={true}
                className="right"
            >
                <CheckIcon fontSize="inherit" className="icon" />
            </ClickContainer>
        </CameraElementContainer>
    );
};

const AcceptCameras = () => {
    const { id } = useParams();
    const cameras = useCameraToAccept(id as string);
    return (
        <Container>
            <Content>
                <List>
                    <h1>Accept cameras for room: {id}</h1>
                    {cameras.response?.map((camera) => (
                        <CameraElement cameraName={camera.id} key={camera.id} />
                    ))}
                </List>
            </Content>
            <SideBarContainer>
                <SideMenuContainer>
                    <SideMenuOption isClickable={true} link={`../${id}`}>
                        <OneCameraIcon />
                    </SideMenuOption>
                    <SideMenuOption isClickable={true} link={`../${id}/split`}>
                        <SplitCameraIcon />
                    </SideMenuOption>
                    <SideMenuOption isClickable={false}>
                        <CheckBoxIcon fontSize="inherit" color="inherit" />
                    </SideMenuOption>
                </SideMenuContainer>
                <CameraListContainer>
                    <Camera />
                    <Camera />
                    <Camera />
                    <Camera />
                    <Camera />
                    <Camera />
                </CameraListContainer>
            </SideBarContainer>
        </Container>
    );
};

export default AcceptCameras;
