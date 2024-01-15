import { styled } from "styled-components";
import { WatchCamera } from "../../../types/watchCamera";
import { useEndRecording } from "../../mutations/endRecording";
import { useStartRecording } from "../../mutations/startRecording";
import { useCheckCamera } from "../../queries/getRecordigState";
import ReactFlvPlayer from "../../../components/ReactFlvPlayer";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const MainCameraContainer = styled.div`
  max-height: calc(100% - 150px);
  flex: 3;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.cameraLight};
`;

export const CameraContainer = styled.div`
  background-color: ${(props) => props.theme.colors.cameraDark};
  border: 2px solid black;
  border-radius: 10px;
  height: 80vh;
`;

export type SingleCameraProps = {
  camera: WatchCamera | null;
  isOwnedRoom: boolean;
};

const RecordContainer = styled.div`
  width: 60px;
  height: 60px;
  color: ${(props) => props.theme.colors.red};
  border-radius: 30px;
  transition: 0.2s all;
  margin-right: 10px;
  font-size: 60px;
  vertically-align: middle;
  justify-text: center;
  &:hover {
    background-color: ${(props) => props.theme.colors.cameraDark};
    cursor: pointer;
  }
`;

const BottomContainer = styled.div`
  height: 10vh;
  width: 100%;
  display: flex;
  background-color: ${(props) => props.theme.colors.cameraDarker};
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
`;

const NameContainer = styled.div`
  font-size: 40px;
  hight: 50px;
  display: flex;
  margin-left: 10px;
  justify-content: flex-start;
  color: ${(props) => props.theme.colors.cameraLight};
`;

const SingleCamera = ({ camera, isOwnedRoom }: SingleCameraProps) => {
  const end = useEndRecording(camera?.id ?? "");
  const start = useStartRecording(camera?.id ?? "");
  const check = useCheckCamera(camera?.id ?? "");
  return (
    <MainCameraContainer>
      {camera ? (
        <CameraContainer>
          <ReactFlvPlayer
            url={camera?.watchUrl ?? ""}
            height="70vh"
            width="100%"
          />
          <BottomContainer>
            <NameContainer>{camera.cameraName}</NameContainer>
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
                {check.response ? (
                  <RadioButtonCheckedIcon fontSize="inherit" />
                ) : (
                  <RadioButtonUncheckedIcon fontSize="inherit" />
                )}
              </RecordContainer>
            )}
          </BottomContainer>
        </CameraContainer>
      ) : (
        <CameraContainer>
          <h1>No camera chosen</h1>
        </CameraContainer>
      )}
    </MainCameraContainer>
  );
};

export default SingleCamera;
