import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useCache } from "../contexts/roomListContext";
import { Link } from "react-router-dom";
import { useLogout } from "../mutations/logout";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 30px;
  background-color: ${(props) => props.theme.colors.background2};
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  height: 80px;
`;

const Logo = styled.h1`
  font-family: "Droid Sans", serif;
  margin: 0;
  padding: 0;
  font-weight: bold;
  display: flex;
  letter-spacing: 2px;
  color: ${(props) => props.theme.colors.light};
`;

const AuthStateButton = styled.div`
  color: ${(props) => props.theme.colors.light};
  padding: 10px;
  border-radius: 10px;
  transition: 0.2s all;
  &:hover {
    background-color: ${(props) => props.theme.colors.dark};
    cursor: pointer;
  }
`;

const Header: React.FC = () => {
  const { userData, setUserData } = useCache();
  const mutateAsync = useLogout();
  return (
    <Container>
      <Logo>MobileMonitoring</Logo>
      {userData === null ? (
        <Link to="/login">
          <AuthStateButton>
            <LoginIcon />
          </AuthStateButton>
        </Link>
      ) : (
        <Link to="/login">
          <AuthStateButton
            onClick={() => {
              mutateAsync();
              setUserData(null);
            }}
          >
            <LogoutIcon />
          </AuthStateButton>
        </Link>
      )}
    </Container>
  );
};

export default Header;
