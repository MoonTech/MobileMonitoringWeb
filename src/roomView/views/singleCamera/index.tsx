import ReactPlayer from "react-player";
import { styled } from "styled-components";
import { WatchCamera } from "../../../types/watchCamera";
import { Camera, CameraContainer } from "../../components/camera";
import { useEndRecording } from "../../mutations/endRecording";

const CameraOutside = styled.div`
  width: 100%;
  flex: 10;
`;

const MainCameraContainer = styled.div`
  height: 90%;
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
  flex: 1;
  background-color: ${(props) => props.theme.colors.red};
  color: ${(props) => props.theme.colors.light};
  border-radius: 10px;
  font-size: 60px;
  font-weight: bold;
  text-align:center;
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
        <CameraContainer>
          <ReactPlayer
            url={camera?.watchUrl}
            height="70 vh"
            width="100%"
            muted={true}
            playing={true}
          />
        </CameraContainer>
      </CameraOutside>
      <RecordContainer onClick={() => { end({ cameraId: camera?.id ?? "" }) }} >RECORD</RecordContainer>
    </MainCameraContainer>
  );
};

export default SingleCamera;
