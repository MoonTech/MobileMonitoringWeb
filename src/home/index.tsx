import { styled } from "styled-components";
import AddRoom from "../forms/addRoom";
import { useCache } from "../contexts/dataCacheContext";
import AddIcon from "@mui/icons-material/Add";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { RoomView } from "../roomView";
import CreateIcon from "@mui/icons-material/Create";
import CreateRoom from "../forms/createRoom";
import { useGetMyRooms } from "../queries/myRooms";
import { Room } from "../types/room";

const Bar = styled.div`
  background-color: ${(props) => props.theme.colors.primaryLight};
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 60px;
  transition: 0.2s all;
`;

const Content = styled.div`
  max-height: 100%;
  width: 100%;
  transition: 0.2s all;
`;

type RoomElementProps = {
  name: string;
  onClick: any;
};

const RoomElement = (props: RoomElementProps) => {
  return (
    <RoomOuter>
      <RoomInner onClick={props.onClick}>{props.name.charAt(0)}</RoomInner>
    </RoomOuter>
  );
};

const RoomOuter = styled.div`
  padding: 5px;
  position: relative;
`;

const RoomInner = styled.div`
  padding: auto;
  display: flex;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 40px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.light};
  transition: all 0.2s;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.secondaryDark};
  }
`;

type AddRoomElementProps = {
  onClick: any;
};

const AddRoomElement = (props: AddRoomElementProps) => {
  return (
    <AddRoomElementContainer onClick={props.onClick}>
      <AddIcon fontSize="large" />
    </AddRoomElementContainer>
  );
};

const NewRoomElement = (props: AddRoomElementProps) => {
  return (
    <AddRoomElementContainer onClick={props.onClick}>
      <CreateIcon fontSize="large" />
    </AddRoomElementContainer>
  );
};

const AddRoomElementContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  padding: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s all;
  &:hover {
    background-color: ${(props) => props.theme.colors.secondaryDark};
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  transition: 0.2s all;
`;

const Home = () => {
  const { list, setList, userData } = useCache();
  const myRooms = useGetMyRooms();
  const roomsMapped =
    myRooms.isLoading || myRooms.isError || userData === null
      ? []
      : myRooms.data!.rooms.map(
        (room) => ({ name: room.roomName, accessToken: "" }) as Room,
      );
  const location = useLocation();
  const navigate = useNavigate();
  const filteredList = list.filter(
    (room) => !roomsMapped.some((r) => r.name === room.name),
  );
  if (list.length !== filteredList.length) setList(filteredList);
  const roomList = [...roomsMapped, ...filteredList];

  return (
    <Container>
      <Bar>
        {roomList.map((room) =>
          room ? (
            <RoomElement
              key={room.name}
              name={room.name}
              onClick={() => {
                navigate(`${room.name}/single`);
                window.location.reload();
              }}
            />
          ) : (
            <></>
          ),
        )}
        <AddRoomElement onClick={() => {
          navigate("add")
          window.location.reload();
        }} />
        {userData ? <NewRoomElement onClick={() => navigate("new")} /> : <></>}
      </Bar>
      <Content>
        <Routes key={location.pathname} location={location}>
          <Route path="add" element={<AddRoom />} />
          <Route path="new" element={<CreateRoom />} />
          <Route path=":id/*" element={<RoomView />} />
        </Routes>
      </Content>
    </Container>
  );
};

export default Home;
