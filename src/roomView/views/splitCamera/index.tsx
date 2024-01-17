import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useRoomOptions } from "../../../contexts/roomOptionsContext";
import { WatchCamera } from "../../../types/watchCamera";
import { Camera } from "./components/camera";

const CameraGridContainer = styled.div`
  height: 100%;
  flex: 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row: 30vh 30vh;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
`;

const NotSelectedCameraContainer = styled.div`
  color: ${(props) => props.theme.colors.cameraLight};
  height: 40vh;
  background-color: ${(props) => props.theme.colors.cameraDark};
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const CameraOutside = styled.div`
  height: 40vh;
  max-height: 40vh;
`;

export type SplitCameraProps = {
  cameras: WatchCamera[];
  isOwnedRoom: boolean;
};

const SplitCamera = ({ cameras, isOwnedRoom }: SplitCameraProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { roomDictionary, setRoomDictionary } = useRoomOptions();

  const redirectToSingle = (n: number) => {
    return () => {
      if (cameras.length <= n) return;
      let clone = { ...roomDictionary };
      let current = clone[id!]!;
      current.single = cameras[n];
      clone[id!] = current;
      setRoomDictionary(clone);
      navigate(`../../${id!}/single`);
    };
  };
  return (
    <CameraGridContainer>
      {Array.from({ length: 4 }, (_, index) => index).map((n) => (
        <CameraOutside>
          {cameras.length > n ? (
            <Camera
              url={cameras[n].watchUrl}
              name={cameras[n].cameraName}
              isOwnedRoom={isOwnedRoom}
              id={cameras[n].id}
              onClick={redirectToSingle(n)}
            />
          ) : (
            <NotSelectedCameraContainer>
              <h2>No camera selected</h2>
            </NotSelectedCameraContainer>
          )}
        </CameraOutside>
      ))}
    </CameraGridContainer>
  );
};

export default SplitCamera;
