import { styled, ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { Navigate, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/global";
import Header from "./components/header";
import Home from "./home";
import { DataCacheProvider } from "./contexts/dataCacheContext";
import SignUp from "./forms/signUp";
import Login from "./forms/login";
import { lightTheme } from "./styles/themes/light";
import { darkTheme } from "./styles/themes/dark";
import { ThemeSettingProvider, useTheme } from "./contexts/themeContext";

const ThemedApp = () => {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <QueryClientProvider client={new QueryClient()}>
        <DataCacheProvider>
          <Container>
            <Header />
            <Content>
              <Routes>
                <Route path="/room/*" element={<Home />} />
                <Route path="" element={<Navigate to="room/add" />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<h1>404</h1>} />
              </Routes>
            </Content>
          </Container>
        </DataCacheProvider>
      </QueryClientProvider>
    </ThemeProvider >
  );
}

const App = () => {
  return (
    <ThemeSettingProvider>
      <ThemedApp />
    </ThemeSettingProvider>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  align-items: stretch;
  flex-direction: column;
  display: flex;
  background-color: ${(props) => props.theme.colors.white};
  height: calc(100vh - 80px);
`;

export default App;
