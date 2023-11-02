import { styled, ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/global";
import Header from "./components/header";
import Home from "./home";
import { RoomListProvider } from "./contexts/roomListContext";

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <QueryClientProvider client={new QueryClient()}>
        <Container>
          <Header />
          <Content>
            <Routes>
              <Route
                path="/*"
                element={
                  <RoomListProvider>
                    <Home />
                  </RoomListProvider>
                }
              />
            </Routes>
          </Content>
        </Container>
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
