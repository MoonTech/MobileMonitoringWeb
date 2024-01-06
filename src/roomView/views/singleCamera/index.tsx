import ReactPlayer from "react-player";
import { styled } from "styled-components";
import { WatchCamera } from "../../../types/watchCamera";
import { useEndRecording } from "../../mutations/endRecording";
import { useStartRecording } from "../../mutations/startRecording";
import { useCheckCamera } from "../../queries/getRecordigState";
import ReactFlvPlayer from "../../../wrapper/ReactFlvPlayer";

const MainCameraContainer = styled.div`
  max-height: calc(100% - 150px);
  flex: 3;
  display: flex;
  flex-direction: column;
  color: #ddd;
`;

export const CameraContainer = styled.div`
  background-color: #333;
  border: 2px solid black;
  border-radius: 10px;
  height: 100%;
`;

export type SingleCameraProps = {
  camera: WatchCamera | null;
  isOwnedRoom: boolean;
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

const SingleCamera = ({ camera, isOwnedRoom }: SingleCameraProps) => {
  const end = useEndRecording(camera?.id ?? "");
  const start = useStartRecording(camera?.id ?? "");
  const check = useCheckCamera(camera?.id ?? "");
  return (
    <MainCameraContainer>
      {camera ? (
        <>
          camera?.watchUrl != null ?
            <CameraContainer>
              <ReactFlvPlayer
                  url = {camera?.watchUrl ?? ""}
                  height = "70vh"
                  width = "100%"
                  showControls = {false}
              /> : <div/>
            <h3>{camera.cameraName}</h3>
          </CameraContainer> : <div/>
          {isOwnedRoom && (
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
          )}
        </>
      ) : (
        <CameraContainer>
          <h1>No camera chosen</h1>
        </CameraContainer>
      )}
    </MainCameraContainer>
  );
};

export default SingleCamera;
