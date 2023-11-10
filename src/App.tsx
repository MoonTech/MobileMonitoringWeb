import { styled, ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { Navigate, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/global";
import Header from "./components/header";
import Home from "./home";
import { DataCacheProvider } from "./contexts/roomListContext";
import SignUp from "./forms/signUp";
import Login from "./forms/login";

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
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
    </ThemeProvider>
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
  height: 100%;
  background-color: ${(props) => props.theme.colors.foreground};
`;

export default App;
