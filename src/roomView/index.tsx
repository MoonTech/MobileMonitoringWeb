import { styled } from "styled-components";
import { SideBarContainer } from "./components/sideBarContainer";
import { SideMenuContainer } from "./components/sideMenuContainer";
import { CameraListContainer } from "./components/cameraListContainer";
import { SideMenuOption } from "./components/sideMenuOption";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { OneCameraIcon } from "./components/oneCameraIcon";
import { SplitCameraIcon } from "./components/splitCameraIcon";
import { Container } from "./components/container";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import SingleCamera from "./views/singleCamera";
import SplitCamera from "./views/splitCamera";
import AcceptCameras from "./views/acceptCameras";
import { useWatchRoom } from "./queries/watchRoom";
import React, { useState } from "react";
import { WatchCamera } from "../types/watchCamera";
import { useCache } from "../contexts/dataCacheContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDeleteRoom } from "./mutations/deleteRoom";
import { toast, ToastContainer } from "react-toastify";
import { useTheme } from "../contexts/themeContext";
import ReactPlayer from "react-player";
import { CodeQR } from "./views/qr";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import ListIcon from "@mui/icons-material/List";
import { Recordings } from "./views/recordings";

export const CameraContainer = styled.div`
  height: 250px;
  max-height: 250px;
  background-color: #333;
  color: #ddd;
  border: 2px solid black;
  border-radius: 10px;
`;

const CameraBottomContainer = styled.div`
  height: 50px;
  font-size: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

type clickOption = "none" | "unavailable" | "available" | "selected";

export type CameraProps = {
  url: string;
  name: string;
  onClick?: any;
  clickOption: clickOption;
};

export const Camera = ({ url, name, onClick, clickOption }: CameraProps) => {
  return (
    <CameraContainer onClick={onClick}>
      <ReactPlayer
        url={url}
        height="200px"
        width="100%"
        muted={true}
        playing={true}
        config={{
          file: {
            forceFLV: true
          }
        }}
      />
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

const MainCameraContainer = styled.div`
  height: 100%;
  flex: 3;
  display: flex;
`;

const DeleteContainer = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryDark};
  height: 80px;
  padding: 5px;
`;

const DeleteButtonContainer = styled.div`
  border-radius: 10px;
  transition: 0.2s all;
  &:hover {
    background-color: ${(props) => props.theme.colors.secondary};
    cursor: pointer;
  }
  font-size: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.light};
`;

export const RoomView = () => {
  const location = useLocation();
  const { id } = useParams();
  const screenType = location.pathname.split("/").at(-1);
  const cameras = useWatchRoom(id!);
  const { theme } = useTheme();
  const { list, setList } = useCache();
  const navigate = useNavigate();
  const isOwnedRoom = !list.some((room) => room.name === id);
  const { mutateAsync } = useDeleteRoom(id as string);
  const [viewState, setViewState] = useState<
    WatchCamera | WatchCamera[] | null
  >(screenType === "split" ? [] : null);

  return (
    <Container>
      <MainCameraContainer>
        <Routes key={location.pathname} location={location}>
          <Route
            path="single"
            element={
              <SingleCamera
                isOwnedRoom={isOwnedRoom}
                camera={viewState as WatchCamera | null}
              />
            }
          />
          <Route
            path="split"
            element={<SplitCamera cameras={viewState as WatchCamera[]} />}
          />
          <Route path="accept" element={<AcceptCameras />} />
          <Route path="qr" element={<CodeQR />} />
          <Route
            path="recordings"
            element={
              <Recordings
                token={
                  isOwnedRoom
                    ? undefined
                    : list.find((r) => r.name === id)?.accessToken ?? undefined
                }
              />
            }
          />
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
          {isOwnedRoom ? (
            <SideMenuOption
              isClickable={screenType !== "accept"}
              link={`../${id}/accept`}
            >
              <CheckBoxIcon fontSize="inherit" />
            </SideMenuOption>
          ) : (
            <></>
          )}
          <SideMenuOption
            isClickable={screenType !== "recordings"}
            link={`../${id}/recordings`}
          >
            <ListIcon fontSize="inherit" />
          </SideMenuOption>
          {isOwnedRoom ? (
            <SideMenuOption
              isClickable={screenType !== "qr"}
              link={`../${id}/qr`}
            >
              <QrCode2Icon fontSize="inherit" />
            </SideMenuOption>
          ) : (
            <></>
          )}
        </SideMenuContainer>
        <CameraListContainer>
          {cameras.data?.connectedCameras.map((camera) => {
            const clickOption =
              screenType === "accept" ||
                screenType === "qr" ||
                screenType === "recordings"
                ? "none"
                : screenType === "split"
                  ? (viewState as WatchCamera[]).some(
                    (cam) => cam.id === camera.id,
                  )
                    ? "selected"
                    : (viewState as WatchCamera[]).length === 4
                      ? "unavailable"
                      : "available"
                  : viewState === null ||
                    (viewState as WatchCamera).id !== camera.id
                    ? "available"
                    : "selected";
            return (
              <Camera
                clickOption={clickOption}
                url={camera.watchUrl}
                onClick={() => {
                  if (screenType === "split") {
                    if (clickOption === "selected")
                      setViewState(
                        (viewState as WatchCamera[]).filter(
                          (cam) => cam.id !== camera.id,
                        ),
                      );
                    if (clickOption === "available")
                      setViewState([...(viewState as WatchCamera[]), camera]);
                  }
                  if (screenType === "single") {
                    if (clickOption === "available") setViewState(camera);
                    if (clickOption === "selected") setViewState(null);
                  }
                }}
                name={camera.cameraName}
                key={camera.id}
              />
            );
          })}
        </CameraListContainer>
        <DeleteContainer>
          <DeleteButtonContainer
            onClick={async () => {
              if (isOwnedRoom) {
                try {
                  await mutateAsync();
                  navigate("../add");
                } catch {
                  toast("Could not delete a room", {
                    position: "bottom-left",
                    autoClose: 5000,
                    closeOnClick: true,
                    theme,
                  });
                }
              } else {
                setList(list.filter((item) => item.name !== id));
                navigate("../add");
              }
            }}
          >
            <DeleteForeverIcon fontSize="inherit" />
          </DeleteButtonContainer>
        </DeleteContainer>
      </SideBarContainer>
      <ToastContainer />
    </Container>
  );
};
