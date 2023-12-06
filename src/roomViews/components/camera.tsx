import ReactPlayer from "react-player";
import { styled } from "styled-components";

const CameraContainer = styled.div`
  height: 250px;
  margin: 5px;
  background-color: #333;
  margin-bottom: 10px;
  border: 2px solid black;
  border-radius: 10px;
`;

export const Camera = () => {
  return (
    <CameraContainer>
      <ReactPlayer url={'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'} height="100%" width="100%" muted={true} playing={true} />
    </CameraContainer>
  );
}
