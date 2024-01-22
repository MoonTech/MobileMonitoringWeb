import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { useGetRoomRecordings } from "../../queries/getRoomRecordings";
import { RecordingElement } from "./components/recordingElement";
import { useList } from "../../../contexts/listDataContext";

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

const Title = styled.h1`
  color: ${(props) => props.theme.colors.backgroundFont};
`;

export type RecordingsProps = {
  token?: string;
};

export const Recordings = ({ token }: RecordingsProps) => {
  const { id } = useParams();
  const recordings = useGetRoomRecordings(id as string, token ?? null);
  const { list } = useList();
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
