import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useCache } from "../contexts/dataCacheContext";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/themeContext";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 30px;
  background-color: ${(props) => props.theme.colors.primary};
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  height: 80px;
`;

const RightConstainer = styled.div`
  display: flex;
`;

const Logo = styled.h1`
  margin: 0;
  padding: 0;
  font-weight: bold;
  display: flex;
  letter-spacing: 2px;
  color: ${(props) => props.theme.colors.light};
`;

const HeaderButton = styled.div`
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
  const { theme, setTheme } = useTheme();
  return (
    <Container>
      <Logo>MobileMonitoring</Logo>
      <RightConstainer>
        <HeaderButton
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
        >
          {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </HeaderButton>
        {userData === null ? (
          <Link to="/login">
            <HeaderButton>
              <LoginIcon />
            </HeaderButton>
          </Link>
        ) : (
          <Link to="/login">
            <HeaderButton
              onClick={() => {
                setUserData(null);
              }}
            >
              <LogoutIcon />
            </HeaderButton>
          </Link>
        )}
      </RightConstainer>
    </Container>
  );
};

export default Header;
