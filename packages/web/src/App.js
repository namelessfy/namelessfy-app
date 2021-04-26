import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./styles/App.css";

import * as ROUTES from "./routes";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import CompleteSignUp from "./pages/CompleteSignUp";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import UploadSong from "./pages/UploadSong";

import ProtectedRoute from "./components/ProtectedRoute";

import { onAuthStateChanged } from "./services/auth";
import { syncSignIn, signOut } from "./redux/auth/auth-actions";

function App() {
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
      <Switch>
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.RESET_PASSWORD} component={ResetPassword} />
        <Route path={ROUTES.LOGIN} component={Login} />
        <ProtectedRoute
          path={ROUTES.COMPLETE_SIGNUP}
          component={CompleteSignUp}
        />
        <ProtectedRoute path={ROUTES.UPLOAD_SONG} component={UploadSong} />
        <ProtectedRoute path={ROUTES.HOME} component={Home} exact />
      </Switch>
    </div>
  );
}

export default App;
