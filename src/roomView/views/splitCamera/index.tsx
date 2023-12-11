import { styled } from "styled-components";
import { WatchCamera } from "../../../types/watchCamera";
import { Camera } from "../../components/camera";

const CameraGridContainer = styled.div`
  height: 100%;
  flex: 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row: auto 50% 50%;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;


export type SplitCameraProps = {
  cameras: WatchCamera[]
}

const SplitCamera = ({ cameras }: SplitCameraProps) => {
  return (
    <CameraGridContainer>
      <Camera url={cameras[0].watchUrl} name={cameras[0].cameraName} />
      <Camera url={cameras[1].watchUrl} name={cameras[1].cameraName} />
      <Camera url={cameras[2].watchUrl} name={cameras[2].cameraName} />
      <Camera url={cameras[3].watchUrl} name={cameras[3].cameraName} />
    </CameraGridContainer>
  );
};

export default SplitCamera;
