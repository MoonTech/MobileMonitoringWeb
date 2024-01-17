import { styled } from "styled-components";
import { WatchCamera } from "../../../types/watchCamera";
import { Camera } from "./components/camera";

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
  background-color: ${(props) => props.theme.colors.cameraDark};
  border: 2px solid black;
  border-radius: 10px;
  height: 40vh;
`;

const CameraOutside = styled.div`
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
      {Array.from({ length: 4 }, (_, index) => index).map((n) => (
        <CameraOutside>
          {cameras.length > n ? (
            <Camera
              url={cameras[n].watchUrl}
              name={cameras[n].cameraName}
              isOwnedRoom={isOwnedRoom}
              id={cameras[n].id}
            />
          ) : (
            <CameraContainer />
          )}
        </CameraOutside>
      ))}
    </CameraGridContainer>
  );
};

export default SplitCamera;
