import { styled } from "styled-components";
import { WatchCamera } from "../../../types/watchCamera";
import { Camera } from "../../components/camera";
import { useEndRecording } from "../../mutations/endRecording";
import { useStartRecording } from "../../mutations/startRecording";
import { useCheckCamera } from "../../queries/getRecordigState";

const CameraOutside = styled.div`
  padding: 10px;
  width: 100%;
  flex: 5;
`;

const MainCameraContainer = styled.div`
  height: 100%;
  flex: 3;
  display: flex;
  direction: row;
`;

export type SingleCameraProps = {
  camera?: WatchCamera,
}

const RecordContainer = styled.div`
  width: 100%;
  flex: 1;
  background-color: ${(props) => props.theme.colors.red};
  background-color: ${(props) => props.theme.colors.light};
  border-radius: 10px;
  &:hover{
  background-color: ${(props) => props.theme.colors.redDark};
    cursor: pointer;
  }
`

const SingleCamera = ({ camera }: SingleCameraProps) => {
  const end = useEndRecording()
  return (
    <MainCameraContainer>
      <CameraOutside>
        <Camera url={camera?.watchUrl ?? ""} name={camera?.cameraName ?? "name"} />
      </CameraOutside>
      <RecordContainer onClick={() => { end({ cameraId: camera?.id ?? "" }) }} >RECORD</RecordContainer>
    </MainCameraContainer>
  );
};

export default SingleCamera;
