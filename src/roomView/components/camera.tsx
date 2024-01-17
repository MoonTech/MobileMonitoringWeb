import { styled } from "styled-components";
import { clickOption } from "..";
import ReactFlvPlayer from "../../components/ReactFlvPlayer";

export const CameraContainer = styled.div`
  height: 250px;
  max-height: 250px;
  background-color: ${(props) => props.theme.colors.cameraDark};
  color: ${(props) => props.theme.colors.cameraLight};
  border: 2px solid black;
  border-radius: 10px;
`;

const CameraBottomContainer = styled.div`
  height: 50px;
  font-size: 30px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.cameraDarker};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
`;

const CameraNameContainer = styled.div`
  margin-left: 10px;
`;

const CameraInclusionContainer = styled.div`
  height: 40px;
  margin-right: 10px;
  background-color: ${(props) => props.theme.colors.secondaryDark};
  border-radius: 10px;
  transition: 0.2s all;
  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    cursor: pointer;
  }
`;

const SelectedContainer = styled.div`
  height: 200px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const SelectedHeader = styled.h1`
  flex: 1;
`;

export type CameraProps = {
  url: string;
  name: string;
  onClick?: any;
  clickOption: clickOption;
};

export const Camera = ({ url, name, onClick, clickOption }: CameraProps) => {
  return (
    <CameraContainer>
      {clickOption === "selected" ? (
        <SelectedContainer>
          <SelectedHeader>selected</SelectedHeader>
        </SelectedContainer>
      ) : (
        <ReactFlvPlayer url={url} height="200px" width="100%" />
      )}
      <CameraBottomContainer>
        <CameraNameContainer>{name}</CameraNameContainer>
        {clickOption !== "none" && (
          <CameraInclusionContainer onClick={onClick}>
            {clickOption === "available" || clickOption === "unavailable"
              ? "Select"
              : "Remove"}
          </CameraInclusionContainer>
        )}
      </CameraBottomContainer>
    </CameraContainer>
  );
};
