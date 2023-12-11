import { styled } from "styled-components";
import { WatchCamera } from "../../../types/watchCamera";
import { Camera } from "../../components/camera";
import { useEndRecording } from "../../mutations/endRecording";

const CameraOutside = styled.div`
  maxwidth: 90%;
`;

const MainCameraContainer = styled.div`
  height: 100%;
  flex: 3;
  display: flex;
  margin: 10px;
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
  font-size: 60px;

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
