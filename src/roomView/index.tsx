import { styled } from "styled-components";
import { SideBarContainer } from "./components/sideBarContainer";
import { SideMenuContainer } from "./components/sideMenuContainer";
import { CameraListContainer } from "./components/cameraListContainer";
import { SideMenuOption } from "./components/sideMenuOption";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { OneCameraIcon } from "./components/oneCameraIcon";
import { SplitCameraIcon } from "./components/splitCameraIcon";
import { Camera } from "./components/camera";
import { Container } from "./components/container";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import SingleCamera from "./views/singleCamera";
import SplitCamera from "./views/splitCamera";
import AcceptCameras from "./views/acceptCameras";
import { useWatchRoom } from "./queries/watchRoom";
import { useState } from "react";

const MainCameraContainer = styled.div`
  height: 100%;
  flex: 3;
  display: flex;
`;

export const RoomView = () => {
  const location = useLocation();
  const { id } = useParams();
  const screenType = location.pathname.split("/").at(-1);
  const cameras = useWatchRoom("roomname");
  console.log(cameras);
  const [singleCamera, setSingleCamera] = useState(screenType === 'single' ? cameras.response?.connectedCameras[0] : null);
  const [splitCameras, setSplitCameras] = useState(screenType === 'split' ? cameras.response?.connectedCameras : null);

  return (
    <Container>
      <MainCameraContainer>
        <Routes key={location.pathname} location={location}>
          <Route path="single" element={<SingleCamera camera={singleCamera!} />} />
          <Route path="split" element={<SplitCamera cameras={splitCameras!} />} />
          <Route path="accept" element={<AcceptCameras />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </MainCameraContainer>
      <SideBarContainer>
        <SideMenuContainer>
          <SideMenuOption
            isClickable={screenType !== "single"}
            link={`../${id}/single`}
          >
            <OneCameraIcon />
          </SideMenuOption>
          <SideMenuOption
            isClickable={screenType !== "split"}
            link={`../${id}/split`}
          >
            <SplitCameraIcon />
          </SideMenuOption>
          <SideMenuOption
            isClickable={screenType !== "accept"}
            link={`../${id}/accept`}
          >
            <CheckBoxIcon fontSize="inherit" />
          </SideMenuOption>
        </SideMenuContainer>
        <CameraListContainer>
          {cameras.response?.connectedCameras.map((camera) => (
            <Camera
              url={camera.url}
              onClick={() => {
                if (screenType === "split") {
                  setSplitCameras([]);
                }
                if (screenType === "single") {
                  setSingleCamera(camera);
                }
              }}
              name={camera.name}
              key={camera.id}
            />
          ))}
        </CameraListContainer>
      </SideBarContainer>
    </Container>
  );
};
