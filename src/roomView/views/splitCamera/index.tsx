import { styled } from "styled-components";
import { WatchCamera } from "../../../types/watchCamera";
import {
  Camera,
  CameraContainer as CameraContainerInner,
} from "../../components/camera";

const CameraGridContainer = styled.div`
  height: 100%;
  flex: 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row: 30vh 30vh;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

const CameraContainer = styled.div`
  height: 40vh;
  max-height: 40vh;
`;

export type SplitCameraProps = {
  cameras: WatchCamera[];
  isOwnedRoom: boolean;
};

const SplitCamera = ({ cameras, isOwnedRoom }: SplitCameraProps) => {
  return (
    <CameraGridContainer>
      <CameraContainer>
        {cameras.length > 0 ? (
          <Camera
            url={cameras[0].watchUrl}
            name={cameras[0].cameraName}
            isOwnedRoom={isOwnedRoom}
            id={cameras[0].id}
          />
        ) : (
          <CameraContainerInner />
        )}
      </CameraContainer>
      <CameraContainer>
        {cameras.length > 1 ? (
          <Camera
            url={cameras[1].watchUrl}
            name={cameras[1].cameraName}
            isOwnedRoom={isOwnedRoom}
            id={cameras[1].id}
          />
        ) : (
          <CameraContainerInner />
        )}
      </CameraContainer>
      <CameraContainer>
        {cameras.length > 2 ? (
          <Camera
            url={cameras[2].watchUrl}
            name={cameras[2].cameraName}
            isOwnedRoom={isOwnedRoom}
            id={cameras[2].id}
          />
        ) : (
          <CameraContainerInner />
        )}
      </CameraContainer>
      <CameraContainer>
        {cameras.length > 3 ? (
          <Camera
            url={cameras[3].watchUrl}
            name={cameras[3].cameraName}
            isOwnedRoom={isOwnedRoom}
            id={cameras[3].id}
          />
        ) : (
          <CameraContainerInner />
        )}
      </CameraContainer>
    </CameraGridContainer>
  );
};

export default SplitCamera;
