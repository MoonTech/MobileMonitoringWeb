import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { render as rtlRender } from "@testing-library/react";
import { lightTheme } from "../styles/themes/light";
import { RoomOptionsProvider } from "../contexts/roomOptionsContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeSettingProvider } from "../contexts/themeContext";
import { ListDataProvider } from "../contexts/listDataContext";
import { UserDataProvider } from "../contexts/userDataContext";

export const testRender = (component: React.ReactNode) => {
  return rtlRender(
    <MemoryRouter>
      <ThemeSettingProvider>
        <QueryClientProvider client={new QueryClient()}>
          <UserDataProvider>
            <ListDataProvider>
              <RoomOptionsProvider>
                <ThemeProvider theme={lightTheme}>{component}</ThemeProvider>
              </RoomOptionsProvider>
            </ListDataProvider>
          </UserDataProvider>
        </QueryClientProvider>
      </ThemeSettingProvider>
    </MemoryRouter>,
  );
};
