import ReactPlayer from "react-player";
import { styled } from "styled-components";

const CameraGridContainer = styled.div`
  height: 100%;
  flex: 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row: auto auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

const CameraBoxContainer = styled.div`
  background-color: #333;
  border-radius: 10px;
  color: #fff;
  margin: 5px;
`;

const CameraBox = () => {
  return (
    <CameraBoxContainer>
      <ReactPlayer url={'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'} height="100%" width="100%" muted={true} playing={true} />
    </CameraBoxContainer>
  );
}

const SplitCamera = () => {
  return (
    <CameraGridContainer>
      <CameraBox />
      <CameraBox />
      <CameraBox />
      <CameraBox />
    </CameraGridContainer>
  );
};

export default SplitCamera;
