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
import { useCache } from "../contexts/dataCacheContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDeleteRoom } from "./mutations/deleteRoom";
import { toast, ToastContainer } from "react-toastify";
import { useTheme } from "../contexts/themeContext";
import { CodeQR } from "./views/qr";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import ListIcon from "@mui/icons-material/List";
import { Recordings } from "./views/recordings";
import { useRoomOptions } from "../contexts/roomOptionsContext";
import ReactFlvPlayer from "../components/ReactFlvPlayer";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import DeleteConfirmationPopup from "./components/deleteConfirmationPopup";

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
  background-color: #111;
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

const SelectedHeader = styled.h1`
  height: 160px;
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
      {clickOption === "selected" ? (
        <SelectedHeader>selected</SelectedHeader>
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
  const { userData, list, setList } = useCache();
  const { roomDictionary, setRoomDictionary } = useRoomOptions();
  const navigate = useNavigate();
  const isOwnedRoom = !list.some((room) => room.name === id);
  const { mutateAsync } = useDeleteRoom(id as string);
  if (roomDictionary[id!] === undefined) {
    roomDictionary[id!] = { split: [], single: null };
    setRoomDictionary(roomDictionary);
  }
  const roomState = roomDictionary[id!]!;

  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);

  const handleDeleteClick = () => {
    setConfirmationPopupOpen(true);
  };

  const handleCloseConfirmationPopup = () => {
    setConfirmationPopupOpen(false);
  };

  const handleConfirmDelete = async () => {
    setConfirmationPopupOpen(false);

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
  };

  return (
    <Container>
      <MainCameraContainer>
        <Routes key={location.pathname} location={location}>
          <Route
            path="single"
            element={
              <SingleCamera
                isOwnedRoom={isOwnedRoom}
                camera={roomState.single}
              />
            }
          />
          <Route
            path="split"
            element={<SplitCamera cameras={roomState.split} />}
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
          {isOwnedRoom && (
            <SideMenuOption
              isClickable={screenType !== "accept"}
              link={`../${id}/accept`}
            >
              <CheckBoxIcon fontSize="inherit" />
            </SideMenuOption>
          )}
          <SideMenuOption
            isClickable={screenType !== "recordings"}
            link={`../${id}/recordings`}
          >
            <ListIcon fontSize="inherit" />
          </SideMenuOption>
          {isOwnedRoom && (
            <SideMenuOption
              isClickable={screenType !== "qr"}
              link={`../${id}/qr`}
            >
              <QrCode2Icon fontSize="inherit" />
            </SideMenuOption>
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
                ? roomState.split.some((cam) => cam.id === camera.id)
                  ? "selected"
                  : roomState.split.length === 4
                  ? "unavailable"
                  : "available"
                : roomState.single === null || roomState.single.id !== camera.id
                ? "available"
                : "selected";
            return (
              <Camera
                clickOption={clickOption}
                url={camera.watchUrl}
                onClick={() => {
                  let clone = { ...roomDictionary };
                  let current = clone[id!]!;
                  if (screenType === "split") {
                    if (clickOption === "selected") {
                      current.split = current.split.filter(
                        (cam) => cam.id !== camera.id,
                      );
                      clone[id!] = current;
                      setRoomDictionary(clone);
                    }
                    if (clickOption === "available") {
                      current.split = current.split.some(
                        (c) => c.id === camera.id,
                      )
                        ? current.split
                        : [...current.split, camera];
                      clone[id!] = current;
                      setRoomDictionary(clone);
                    }
                  }
                  if (screenType === "single") {
                    if (clickOption === "available") {
                      current.single = camera;
                      clone[id!] = current;
                      setRoomDictionary(clone);
                    }
                    if (clickOption === "selected") {
                      current.single = null;
                      clone[id!] = current;
                      setRoomDictionary(clone);
                    }
                  }
                }}
                name={camera.cameraName}
                key={camera.id}
              />
            );
          })}
        </CameraListContainer>
        <DeleteContainer>
          <DeleteButtonContainer onClick={handleDeleteClick}>
            {userData ? (
              <DeleteForeverIcon fontSize="inherit" />
            ) : (
              <VisibilityOffIcon fontSize="inherit" />
            )}
          </DeleteButtonContainer>
        </DeleteContainer>
      </SideBarContainer>
      <ToastContainer />
      {isConfirmationPopupOpen && (
        <DeleteConfirmationPopup
          onClose={handleCloseConfirmationPopup}
          onConfirm={handleConfirmDelete}
          isOwnedRoom={isOwnedRoom}
        />
      )}
    </Container>
  );
};
