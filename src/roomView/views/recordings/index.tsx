import { styled } from "styled-components";
import DownloadIcon from "@mui/icons-material/Download";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "../../../contexts/themeContext";
import { useGetRoomRecordings } from "../../queries/getRoomRecordings";
import { useDownloadRecording } from "../../queries/downloadRecording";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useCache } from "../../../contexts/dataCacheContext";
import { useDeleteRecording } from "../../mutations/deleteRecording";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex: 3;
  justify-content: center;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  width: min(800px, 70vw);
`;

const CameraElementContainer = styled.div`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.backgroundLight};
  color: ${(props) => props.theme.colors.backgroundFont};
  height: 80px;
  display: flex;
  flex-direction: row;
  margin-right: 20px;
  margin-left: 20px;
  transition: 0.2s all;
`;

const ClickContainer = styled.div`
  width: 80px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  cursor: pointer;
`;

const MiddleContainer = styled.div`
  flex: 5;
  display: flex;
  justify-content: center;
`;

type RecordingElementProps = {
  recordingName: string;
  token?: string;
  isOwnedRoom: boolean;
};

const RecordingElement = ({
  recordingName,
  token,
  isOwnedRoom,
}: RecordingElementProps) => {
  const { theme } = useTheme();
  const downloadRecording = useDownloadRecording(recordingName, token ?? null);
  const { mutateAsync } = useDeleteRecording(recordingName);
  return (
    <CameraElementContainer>
      <MiddleContainer>
        <h2>{recordingName}</h2>
      </MiddleContainer>
      <ClickContainer
        onClick={async () => {
          await downloadRecording().catch(() => {
            toast("Could not download the recording", {
              position: "bottom-left",
              autoClose: 5000,
              closeOnClick: true,
              theme,
            });
          });
        }}
      >
        <DownloadIcon fontSize="inherit" className="icon" />
      </ClickContainer>
      {isOwnedRoom ? (
        <ClickContainer
          onClick={async () => {
            await mutateAsync().catch(() => {
              toast("Could not delete the recording", {
                position: "bottom-left",
                autoClose: 5000,
                closeOnClick: true,
                theme,
              });
            });
          }}
        >
          <DeleteForeverIcon fontSize="inherit" className="icon" />
        </ClickContainer>
      ) : (
        <></>
      )}
    </CameraElementContainer>
  );
};

const Title = styled.h1`
  color: ${(props) => props.theme.colors.backgroundFont};
`;

export type RecordingsProps = {
  token?: string;
};

export const Recordings = ({ token }: RecordingsProps) => {
  const { id } = useParams();
  const recordings = useGetRoomRecordings(id as string, token ?? null);
  const { list } = useCache();
  const isOwnedRoom = !list.some((room) => room.name === id);

  return (
    <Content>
      <List>
        <Title>Download recordings for room: {id}</Title>
        {recordings.data?.map((recording) => (
          <RecordingElement
            recordingName={recording.name}
            token={token}
            key={recording.name}
            isOwnedRoom={isOwnedRoom}
          />
        ))}
      </List>
    </Content>
  );
};
