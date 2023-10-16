import { useState } from "react";
import { AuthorizationForm, Button, Container, ErrorMessage, Header, Input, StyledLink } from "../formComponents";

const Login: React.FC = () => {
    const [roomName, setRoomName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!roomName || !password) {
            setError("Please fill in all fields.");
        } else {
            setError("");
            setRoomName("");
            setPassword("");
        }
    };

    return (
        <Container>
            <AuthorizationForm onSubmit={handleSubmit}>
                <Header>Login</Header>
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
                <Button type="submit">Login</Button>
                <StyledLink to="/register">Create new room</StyledLink>
            </AuthorizationForm>
        </Container>
    );
};

export default Login;
