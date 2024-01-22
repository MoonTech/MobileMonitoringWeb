import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../mutations/signUp";
import "react-toastify/dist/ReactToastify.css";
import {
  AuthorizationForm,
  Button,
  Container,
  ErrorMessage,
  Header,
  Input,
  StyledLink,
} from "../components";
import { toast, ToastContainer } from "react-toastify";
import { useTheme } from "../../contexts/themeContext";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { mutateAsync } = useSignUp();
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !password || !confirmPassword) {
      setError("Please fill in all fields.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      try {
        await mutateAsync({ password, login: name });
        setName("");
        setPassword("");
        setConfirmPassword("");
        navigate("../room/add");
      } catch {
        toast("Error occured while signing in", {
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
      <AuthorizationForm onSubmit={handleSubmit}>
        <Header>Sign up</Header>
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
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit">Submit</Button>
        <StyledLink to="/login">Go to Login</StyledLink>
        <StyledLink to="/room/add">Go back to monitoring</StyledLink>
      </AuthorizationForm>
      <ToastContainer />
    </Container>
  );
};

export default SignUp;
