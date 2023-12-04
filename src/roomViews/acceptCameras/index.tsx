import { styled } from "styled-components";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useCameraToAccept } from "../queries/getCamerasToAccept";
import { useParams } from "react-router-dom";
import { useAcceptCamera } from "../mutations/acceptCamera";
import { useRejectCamera } from "../mutations/rejectCamera";

const OutsideContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  width: min(800px, 70vw);
`;

const Container = styled.div`
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
    background-color: ${(props) => props.accept ? props.theme.colors.middle : props.theme.colors.red};
    .icon {
      color: ${(props) => props.accept ? "green" : "red"};
      font-size: 50px;
    }
  }
`

const MiddleContainer = styled.div`
  flex: 5;
  display: flex;
  justify-content: center;
`

type CameraElementProps = {
  cameraName: string;
}

const CameraElement = (props: CameraElementProps) => {
  const acceptCamera = useAcceptCamera();
  const rejectCamera = useRejectCamera();
  return (
    <Container>
      <ClickContainer onClick={async () => { await acceptCamera(props.cameraName) }} accept={false} className="left"><CloseIcon fontSize="inherit" className="icon" /></ClickContainer>
      <MiddleContainer><h1>Camera: {props.cameraName}</h1></MiddleContainer>
      <ClickContainer onClick={async () => { await rejectCamera(props.cameraName) }} accept={true} className="right"><CheckIcon fontSize="inherit" className="icon" /></ClickContainer>
    </Container>
  );
};

const AcceptCameras = () => {
  const { id } = useParams();
  const cameras = useCameraToAccept(id as string);
  return (
    <OutsideContainer>
      <List>
        <h1>Accept cameras for room: {id}</h1>
        {cameras.response?.map((camera) => (
          <CameraElement cameraName={camera.id} key={camera.id} />
        ))}
      </List>
    </OutsideContainer>
  );
};

export default AcceptCameras;
