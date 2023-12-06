import { useState } from "react";
import {
  AuthorizationForm,
  Button,
  Container,
  ErrorMessage,
  Header,
  Input,
  StyledLink,
} from "../components";

const CreateRoom: React.FC = () => {
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomName || !password || !confirmPassword) {
      setError("Please fill in all fields.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
      setRoomName("");
      setPassword("");
      setConfirmPassword("");
      // Perform room creation logic here (e.g., API call to create room)
    }
  };

  return (
    <Container>
      <AuthorizationForm onSubmit={handleSubmit}>
        <Header>Create Room</Header>
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
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit">Create Room</Button>
        <StyledLink to="/login">Go to Login</StyledLink>
      </AuthorizationForm>
    </Container>
  );
};

export default CreateRoom;
