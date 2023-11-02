import { styled } from "styled-components";
import AddRoom from "../authorization/addRoom";
import { useList } from "../contexts/roomListContext";
import AddIcon from "@mui/icons-material/Add";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

const Bar = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Content = styled.div``;

type RoomElementProps = {
  name: string;
  onClick: any;
  onClickClose: any;
};

const RoomElement = (props: RoomElementProps) => {
  return (
    <RoomOuter>
      <CloseButton onClick={props.onClickClose}>x</CloseButton>
      <RoomInner onClick={props.onClick}>{props.name.charAt(0)}</RoomInner>
    </RoomOuter>
  );
};

const CloseButton = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: black;
  font-size: 10px;
  color: white;
  display: flex;
  justify-content: center;
  text-align: top;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.3, 1.3) rotate(1turn);
    cursor: pointer;
  }
`;

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
  background-color: ${(props) => props.theme.colors.foreground2};
  transition: 0.2s all;
  &:hover {
    background-color: ${(props) => props.theme.colors.darkMiddle};
    cursor: pointer;
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

const AddRoomElementContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  padding: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
  transition: 0.2s all;
  &:hover {
    background-color: ${(props) => props.theme.colors.background2};
    cursor: pointer;
  }
`;

const Home = () => {
  const { list, setList } = useList();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container>
      <Bar>
        {list.map((room) => (
          <RoomElement
            key={room.id}
            name={room.name}
            onClick={() => navigate("room/" + room.id)}
            onClickClose={() => {
              setList(list.filter((r) => r.name !== room.name));
              if (location.pathname.includes(room.id)) navigate("room/add");
            }}
          />
        ))}
        <AddRoomElement onClick={() => navigate("room/add")} />
      </Bar>
      <Content>
        <Routes key={location.pathname} location={location}>
          <Route path="room/add" element={<AddRoom />} />
          <Route path="room/:id" element={<div>essa</div>} />
        </Routes>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 60px auto;
  height: 100%;
`;

export default Home;
