import { styled } from "styled-components";
import { WatchCamera } from "../../../types/watchCamera";
import { Camera } from "../../components/camera";

const CameraOutside = styled.div`
  padding: 10px;
  width: 100%;
`;

const MainCameraContainer = styled.div`
  height: 100%;
  flex: 3;
  display: flex;
`;

export type SingleCameraProps = {
  camera: WatchCamera,
}

const SingleCamera = ({ camera }: SingleCameraProps) => {
  return (
    <MainCameraContainer>
      <CameraOutside>
        <Camera url={camera.url} name={camera.name} />
      </CameraOutside>
    </MainCameraContainer>
  );
};

export default SingleCamera;
