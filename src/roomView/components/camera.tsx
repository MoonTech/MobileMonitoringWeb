import ReactPlayer from "react-player";
import { styled } from "styled-components";

export const CameraContainer = styled.div`
  background-color: #333;
  border: 2px solid black;
  border-radius: 10px;
  height: 40vh;
`;

const NameContainer = styled.div`
  height: 5vh;
  font-size: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ddd;
`;

export type CameraProps = {
  url: string;
  name: string;
  onClick?: any;
};

export const Camera = ({ url, name, onClick }: CameraProps) => {
  return (
    <CameraContainer onClick={onClick}>
      <ReactPlayer
        url={url}
        height="35vh"
        width="100%"
        muted={false}
        playing={true}
      />
      <NameContainer>{name}</NameContainer>
    </CameraContainer>
  );
};
