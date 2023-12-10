import { styled } from "styled-components";
import { WatchCamera } from "../../../types/watchCamera";
import { Camera } from "../../components/camera";

const CameraGridContainer = styled.div`
  height: 100%;
  flex: 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row: auto auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;


export type SplitCameraProps = {
  cameras: WatchCamera[]
}

const SplitCamera = ({ cameras }: SplitCameraProps) => {
  return (
    <CameraGridContainer>
      <Camera url={cameras[0].url} name={cameras[0].name} />
      <Camera url={cameras[1].url} name={cameras[1].name} />
      <Camera url={cameras[2].url} name={cameras[2].name} />
      <Camera url={cameras[3].url} name={cameras[3].name} />
    </CameraGridContainer>
  );
};

export default SplitCamera;
