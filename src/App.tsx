import { ThemeProvider } from 'styled-components';
import { defaultTheme } from "./styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes, Navigate } from "react-router-dom";
import GlobalStyle from "./styles/global";
import Header from "./components/header";
import CreateRoom from "./authorization/createRoom";
import Login from "./authorization/login";

const App = () => {
    return (
        <ThemeProvider theme={defaultTheme} >
            <GlobalStyle />
            <QueryClientProvider client={new QueryClient()}>
                <Header />
                <Routes>
                    <Route path="/" element={<Navigate to="/register" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<CreateRoom />} />
                </Routes>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
