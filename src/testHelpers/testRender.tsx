import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { render as rtlRender } from "@testing-library/react";
import { lightTheme } from "../styles/themes/light";
import { DataCacheProvider } from "../contexts/dataCacheContext";
import { RoomOptionsProvider } from "../contexts/roomOptionsContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeSettingProvider } from "../contexts/themeContext";

export const testRender = (component: React.ReactNode) => {
  return rtlRender(
    <MemoryRouter>
      <ThemeSettingProvider>
        <QueryClientProvider client={new QueryClient()}>
          <DataCacheProvider>
            <RoomOptionsProvider>
              <ThemeProvider theme={lightTheme}>{component}</ThemeProvider>
            </RoomOptionsProvider>
          </DataCacheProvider>
        </QueryClientProvider>
      </ThemeSettingProvider>
    </MemoryRouter>,
  );
};
