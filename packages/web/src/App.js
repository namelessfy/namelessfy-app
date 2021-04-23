import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled, { ThemeProvider } from "styled-components";

import "./styles/App.scss";
import {
  lightTheme,
  darkTheme,
  GlobalStyles,
} from "./components/ThemeSwitch/style";

import * as ROUTES from "./routes";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import CompleteSignUp from "./pages/CompleteSignUp";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import UserPage from "./pages/UserPage";
import UploadSong from "./pages/UploadSong";

import { onAuthStateChanged } from "./services/auth";
import { syncSignIn, signOut } from "./redux/auth/auth-actions";

function App() {
  const StyledApp = styled.div`
    
  `;
  
  const [theme, setTheme] = useState("light");
  
  const ThemeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = onAuthStateChanged((user) => {
      if (user) {
        dispatch(syncSignIn());
      } else {
        dispatch(signOut());
      }
    });

    return () => {
      if (unsubscribeFromAuth) {
        unsubscribeFromAuth();
      }
    };
  }, [dispatch]);

  return (
    <div className="App__container">
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <StyledApp>
          <button type="button" onClick={() => ThemeToggler()}>
            Change Theme
          </button>
          <Switch>
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.COMPLETE_SIGNUP} component={CompleteSignUp} />
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.RESET_PASSWORD} component={ResetPassword} />
            <Route path={ROUTES.HOME} component={Home} exact />
            <Route path={ROUTES.USER_PAGE} component={UserPage} exact />
          </Switch>
        </StyledApp>
      </ThemeProvider>
    </div>
  );

  return (
    <div className="App__container">
      <Switch>
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.COMPLETE_SIGNUP} component={CompleteSignUp} />
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route path={ROUTES.UPLOAD_SONG} component={UploadSong} />
        <Route path={ROUTES.RESET_PASSWORD} component={ResetPassword} />
        <Route path={ROUTES.HOME} component={Home} exact />
        <Route path={ROUTES.USER_PAGE} component={UserPage} exact />
      </Switch>
    </div>
  );
}

export default App;
