import { styled } from "styled-components";
import { WatchCamera } from "../../../types/watchCamera";
import { Camera } from "../../components/camera";
import { useEndRecording } from "../../mutations/endRecording";
import { useStartRecording } from "../../mutations/startRecording";
import { useCheckCamera } from "../../queries/getRecordigState";

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
  camera?: WatchCamera,
}

const RecordContainer = styled.div`
  height: 50px;
  width: 100px;
  background-color: red;
  &:hover{
    background-color: blue;
    cursor: pointer;
  }
`

const SingleCamera = ({ camera }: SingleCameraProps) => {
  let isReady = useCheckCamera(camera?.id ?? "");
  const end = useEndRecording()
  const start = useStartRecording()
  return (
    <MainCameraContainer>
      <RecordContainer onClick={() => {
        if (isReady) {
          start({ cameraId: camera?.id ?? "" })
          isReady = { response: false }
        }
        else {
          end({ cameraId: camera?.id ?? "" })
        }
        isReady = { response: true }
      }
      } />
      <CameraOutside>
        <Camera url={camera?.watchUrl ?? ""} name={camera?.cameraName ?? "name"} />
      </CameraOutside>
    </MainCameraContainer>
  );
};

export default SingleCamera;
