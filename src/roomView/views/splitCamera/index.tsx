import { styled } from "styled-components";
import { WatchCamera } from "../../../types/watchCamera";
import { Camera } from "../../components/camera";

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
 `


export type SplitCameraProps = {
  cameras: WatchCamera[]
}

const SplitCamera = ({ cameras }: SplitCameraProps) => {
  return (
    <CameraGridContainer>
      <CameraContainer ><Camera url={cameras[0].watchUrl} name={cameras[0].cameraName} /> </CameraContainer>
      <CameraContainer ><Camera url={cameras[1].watchUrl} name={cameras[1].cameraName} /> </CameraContainer>
      <CameraContainer ><Camera url={cameras[2].watchUrl} name={cameras[2].cameraName} /> </CameraContainer>
      <CameraContainer ><Camera url={cameras[3].watchUrl} name={cameras[3].cameraName} /> </CameraContainer>
    </CameraGridContainer>
  );
};

export default SplitCamera;
