import { styled } from "styled-components";
import ReactPlayer from "react-player";

const CameraBox = styled.div`
  background-color: #333;
  border-radius: 10px;
  width: 100%;
  height: 100%;
`;

const CameraOutside = styled.div`
  padding: 10px;
  width: 100%;
`;

const MainCameraContainer = styled.div`
  height: 100%;
  flex: 3;
  display: flex;
`;

const SingleCamera = () => {
  return (
    <MainCameraContainer>
      <CameraOutside>
        <CameraBox>
          <ReactPlayer
            url={"https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"}
            height="100%"
            width="100%"
            muted={true}
            playing={true}
          />
        </CameraBox>
      </CameraOutside>
    </MainCameraContainer>
  );
};

export default SingleCamera;
