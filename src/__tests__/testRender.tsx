import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../styles/theme";
import { render as rtlRender } from "@testing-library/react";

export const testRender = (component: React.ReactNode) => {
  return rtlRender(
    <MemoryRouter>
      <ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>
    </MemoryRouter>,
  );
};
