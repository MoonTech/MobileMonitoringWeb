import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useCache } from "../../contexts/dataCacheContext";
import { useLogin } from "../../mutations/login";
import { LoginRequest } from "../../types/loginRequest";
import {
  AuthorizationForm,
  Button,
  Container,
  ErrorMessage,
  Header,
  Input,
  StyledLink,
} from "../components";

const Login: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { userData } = useCache();
  const { mutateAsync } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !password) {
      setError("Please fill in all fields.");
    } else {
      setName("");
      setPassword("");
      try {
        await mutateAsync({
          login: name,
          password: password,
        } as LoginRequest);
      } catch (error) {
        setError("login failed. try again");
      }
    }
  };

  return (
    <Container>
      {userData !== null ? (
        <h1> Already loged in! </h1>
      ) : (
        <AuthorizationForm onSubmit={handleSubmit}>
          <Header>Login</Header>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Submit</Button>
          <StyledLink to="/signup">Go to Sign up</StyledLink>
        </AuthorizationForm>
      )}
    </Container>
  );
};

export default Login;
