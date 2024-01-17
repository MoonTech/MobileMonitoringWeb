import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { useGetCameraToAccept } from "../../queries/getCamerasToAccept";
import { CameraElement } from "./components/cameraElement";

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
            name={camera.cameraName}
            id={camera.id}
            key={camera.id}
            roomName={id as string}
          />
        ))}
      </List>
    </Content>
  );
};

export default AcceptCameras;
