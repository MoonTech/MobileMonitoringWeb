import { styled } from "styled-components";
import AddRoom from "../forms/addRoom";
import { useCache } from "../contexts/roomListContext";
import AddIcon from "@mui/icons-material/Add";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SingleCamera from "../roomViews/singleCamera";
import MultiCamera from "../roomViews/multiCamera";
import AcceptCameras from "../roomViews/acceptCameras";

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
  background-color: ${(props) => props.theme.colors.background};
  font-size: 10px;
  color: ${(props) => props.theme.colors.foreground};
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
  color: ${(props) => props.theme.colors.dark};
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

const Container = styled.div`
  display: grid;
  grid-template-columns: 60px auto;
  height: 100%;
`;

const Home = () => {
  const { list, setList } = useCache();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container>
      <Bar>
        {list.map((room) => (
          <RoomElement
            key={room.name}
            name={room.name}
            onClick={() => navigate(room.name)}
            onClickClose={() => {
              setList(list.filter((r) => r.name !== room.name));
              if (location.pathname.includes(room.name)) navigate("add");
            }}
          />
        ))}
        <AddRoomElement onClick={() => navigate("add")} />
      </Bar>
      <Content>
        <Routes key={location.pathname} location={location}>
          <Route path="add" element={<AddRoom />} />
          <Route path=":id" element={<SingleCamera />} />
          <Route path=":id/split" element={<MultiCamera />} />
          <Route path=":id/accept" element={<AcceptCameras />} />
        </Routes>
      </Content>
    </Container>
  );
};

export default Home;
