import { useParams } from "react-router-dom";
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

const CameraGridContainer = styled.div`
  height: 100%;
  flex: 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row: auto auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

const CameraBox = styled.div`
  background-color: #333;
  border-radius: 10px;
  color: #fff;
  margin: 5px;
`;

const MultiCamera = () => {
  const { id } = useParams();
  return (
    <Container>
      <CameraGridContainer>
        <CameraBox />
        <CameraBox />
        <CameraBox />
        <CameraBox />
      </CameraGridContainer>
      <SideBarContainer>
        <SideMenuContainer>
          <SideMenuOption isClickable={true} link={`../${id}`}>
            <OneCameraIcon />
          </SideMenuOption>
          <SideMenuOption isClickable={false}>
            <SplitCameraIcon />
          </SideMenuOption>
          <SideMenuOption isClickable={true} link={`../${id}/accept`}>
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

export default MultiCamera;
