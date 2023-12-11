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
  max-height: calc(100% - 150px);
  flex: 3;
  display: flex;
  flex-direction: column;
`;

export type SingleCameraProps = {
  camera?: WatchCamera,
}

const RecordContainer = styled.div`
  width: 100%;
  height: 80px;
  background-color: ${(props) => props.theme.colors.red};
  color: ${(props) => props.theme.colors.light};
  border-radius: 10px;
  font-size: 30px;
  &:hover{
    background-color: ${(props) => props.theme.colors.redDark};
    cursor: pointer;
  }
`

const SingleCamera = ({ camera }: SingleCameraProps) => {
  const end = useEndRecording(camera?.id ?? "")
  const start = useStartRecording(camera?.id ?? "")
  const check = useCheckCamera(camera?.id ?? "")
  return (
    <MainCameraContainer>
      <CameraOutside>
        <Camera url={camera?.watchUrl ?? ""} name={camera?.cameraName ?? "name"} />
      </CameraOutside>
      <RecordContainer
        onClick={() =>
          check ? start() : end()
        } >
        {check ? "RECORD" : "STOP RECORDING"}
      </RecordContainer>
    </MainCameraContainer>
  );
};

export default SingleCamera;
