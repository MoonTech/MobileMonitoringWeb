import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useTheme } from "../../contexts/themeContext";
import { useLogin } from "../mutations/login";
import {
  AuthorizationForm,
  Button,
  Container,
  ErrorMessage,
  Header,
  Input,
  StyledLink,
} from "../components";
import { useUserData } from "../../contexts/userDataContext";

const Login: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { userData } = useUserData();
  const { mutateAsync } = useLogin();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !password) {
      setError("Please fill in all fields.");
    } else {
      try {
        await mutateAsync({ password, login: name });
        setName("");
        setPassword("");
        navigate("../room/add");
      } catch (error) {
        toast("Error occured while logging in", {
          position: "bottom-left",
          autoClose: 5000,
          closeOnClick: true,
          theme,
        });
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
          <StyledLink to="/room/add">Go back to monitoring</StyledLink>
        </AuthorizationForm>
      )}
      <ToastContainer />
    </Container>
  );
};

export default Login;
