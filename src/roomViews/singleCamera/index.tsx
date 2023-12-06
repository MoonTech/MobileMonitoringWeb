import { styled } from "styled-components";
import { SideBarContainer } from "../components/sideBarContainer";
import { SideMenuContainer } from "../components/sideMenuContainer";
import { CameraListContainer } from "../components/cameraListContainer";
import { SideMenuOption } from "../components/sideMenuOption";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { OneCameraIcon } from "../components/oneCameraIcon";
import { SplitCameraIcon } from "../components/splitCameraIcon";
import { Camera } from "../components/camera";
import { Container } from "../components/container";

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
    <Container>
      <MainCameraContainer>
        <CameraOutside>
          <CameraBox />
        </CameraOutside>
      </MainCameraContainer>
      <SideBarContainer>
        <SideMenuContainer>
          <SideMenuOption isClickable={false}>
            <OneCameraIcon />
          </SideMenuOption>
          <SideMenuOption isClickable={true} link="split">
            <SplitCameraIcon />
          </SideMenuOption>
          <SideMenuOption isClickable={true} link="accept">
            <CheckBoxIcon fontSize="inherit" />
          </SideMenuOption>
        </SideMenuContainer>
        <CameraListContainer>
          <Camera />
          <Camera />
          <Camera />
          <Camera />
          <Camera />
          <Camera />
        </CameraListContainer>
      </SideBarContainer>
    </Container>
  );
};

export default SingleCamera;
