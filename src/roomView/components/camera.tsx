import ReactPlayer from "react-player";
import { styled } from "styled-components";

const CameraContainer = styled.div`
  background-color: #333;
  margin-bottom: 10px;
  border: 2px solid black;
  border-radius: 10px;
`;

const NameContainer = styled.div`
  height: 50px;
  font-size: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;  
  color: ${(props) => props.theme.colors.light};
`

export type CameraProps = {
  url: string;
  name: string;
}
export const Camera = ({ url, name }: CameraProps) => {
  return (
    <CameraContainer>
      <ReactPlayer
        url={url}
        height="100%"
        width="100%"
        muted={true}
        playing={true}
      />
      <NameContainer>{name}</NameContainer>
    </CameraContainer>
  );
};
