import { useState } from "react";
import { useCache } from "../../contexts/dataCacheContext";
import { useRoomToken } from "../../mutations/roomToken";
import {
  AuthorizationForm,
  Button,
  Container,
  ErrorMessage,
  Header,
  Input,
} from "../components";

const AddRoom: React.FC = () => {
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const mutateAsync = useRoomToken();
  const { list, setList } = useCache();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomName || !password) {
      setError("Please fill in all fields.");
    } else {
      setError("");
      setRoomName("");
      setPassword("");
      const token = await mutateAsync({
        roomName: roomName,
        password: password,
      });
      if (token) {
        setList([...list, { name: roomName, accessToken: token }]);
      } else {
        setError("Could not add room");
      }
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
