import React, { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./styles/App.css";

import * as ROUTES from "./routes";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import CompleteSignUp from "./pages/CompleteSignUp";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import UserPage from "./pages/UserPage";
import UploadSong from "./pages/UploadSong";

import ProtectedRoute from "./components/ProtectedRoute";
import MusicPlayer from "./components/MusicPlayer";

import { onAuthStateChanged } from "./services/auth";
import { syncSignIn, signOut } from "./redux/auth/auth-actions";
import EditUser from "./pages/EditUser/EditUser";
import { authSelector } from "./redux/auth/auth-selectors";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(authSelector);

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
      {isAuthenticated && location.pathname !== ROUTES.COMPLETE_SIGNUP && (
        <MusicPlayer />
      )}
      <Switch>
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.RESET_PASSWORD} component={ResetPassword} />
        <Route path={ROUTES.HOME} component={Home} exact />
        <Route path={ROUTES.USER_PAGE} component={UserPage} exact />
        <Route path={ROUTES.EDIT_USER} component={EditUser} exact />
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
