import { styled } from "styled-components";
import { WatchCamera } from "../../../types/watchCamera";
import { Camera, CameraContainer } from "../../components/camera";
import { useEndRecording } from "../../mutations/endRecording";
import { useStartRecording } from "../../mutations/startRecording";
import { useCheckCamera } from "../../queries/getRecordigState";

const CameraOutside = styled.div`
  padding: 10px;
  width: 100%;
  height: 75vh;
  max-height: 75vh;
`;

const MainCameraContainer = styled.div`
  max-height: calc(100% - 150px);
  flex: 3;
  display: flex;
  flex-direction: column;
`;

export type SingleCameraProps = {
  camera: WatchCamera | null;
};

const RecordContainer = styled.div`
  width: 100%;
  height: 150px;
  background-color: ${(props) => props.theme.colors.red};
  color: ${(props) => props.theme.colors.light};
  border-radius: 10px;
  font-size: 30px;
  vertically-align: middle;
  justify-text: center;
  &:hover {
    background-color: ${(props) => props.theme.colors.redDark};
    cursor: pointer;
  }
`;

const SingleCamera = ({ camera }: SingleCameraProps) => {
  const end = useEndRecording(camera?.id ?? "");
  const start = useStartRecording(camera?.id ?? "");
  const check = useCheckCamera(camera?.id ?? "");
  return (
    <MainCameraContainer>
      {camera ? (
        <>
          <CameraOutside>
            <Camera
              url={camera?.watchUrl ?? ""}
              name={camera?.cameraName ?? "name"}
            />
          </CameraOutside>
          <RecordContainer
            onClick={() => {
              if (check.response) {
                start();
              } else {
                end();
              }
            }}
          >
            {check.response ? "RECORD" : "STOP RECORDING"}
          </RecordContainer>
        </>
      ) : (
        <CameraContainer>No camera chosen</CameraContainer>
      )}
    </MainCameraContainer>
  );
};

export default SingleCamera;
