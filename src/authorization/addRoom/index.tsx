import { useState } from "react";
import { useList } from "../../contexts/roomListContext";
import {
  AuthorizationForm,
  Button,
  Container,
  ErrorMessage,
  Header,
  Input,
} from "../formComponents";

const AddRoom: React.FC = () => {
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { list, setList } = useList();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomName || !password) {
      setError("Please fill in all fields.");
    } else {
      setError("");
      setRoomName("");
      setPassword("");
      setList([...list, { name: roomName, id: "id" + Math.random() }]);
    }
  };

  return (
    <Container>
      <AuthorizationForm onSubmit={handleSubmit}>
        <Header>Add Observed Room</Header>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </AuthorizationForm>
    </Container>
  );
};

export default AddRoom;
