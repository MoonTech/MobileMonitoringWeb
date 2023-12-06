import ReactPlayer from "react-player";
import { CameraContainer } from "./cameraContainer";

export const Camera = () => {
  return (
    <CameraContainer>
      <ReactPlayer url={'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'} height="100%" width="100%" muted={true} playing={true} />
    </CameraContainer>
  );
}
