import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./style";

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

function SwitchTheme() {
  const [theme, setTheme] = useState("light");

  const ThemeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>
        Hello World
        <button type="button" onClick={() => ThemeToggler()}>
          Change Theme
        </button>
      </StyledApp>
    </ThemeProvider>
  );
}

export default SwitchTheme;
