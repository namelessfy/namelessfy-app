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
import UserPage from "./pages/UserPage";
import UploadSong from "./pages/UploadSong";
import EditSong from "./pages/EditSong";
import Playlist from "./pages/Playlist";
import CreatePlaylist from "./pages/CreatePlaylist";
import Queue from "./pages/Queue";

import ProtectedRoute from "./components/ProtectedRoute";

import { onAuthStateChanged } from "./services/auth";
import { syncSignIn, signOut } from "./redux/auth/auth-actions";
import EditUser from "./pages/EditUser/EditUser";
import EditPlaylist from "./pages/EditPlaylist/EditPlaylist";

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
        <ProtectedRoute path={`${ROUTES.PLAYLIST}/:id`} component={Playlist} />
        <ProtectedRoute path={ROUTES.USER_PAGE} component={UserPage} />
        <ProtectedRoute path={ROUTES.EDIT_USER} component={EditUser} />
        <ProtectedRoute path={ROUTES.UPLOAD_SONG} component={UploadSong} />
        <ProtectedRoute path={`${ROUTES.EDIT_SONG}/:id`} component={EditSong} />
        <ProtectedRoute path={ROUTES.EDIT_PLAYLIST} component={EditPlaylist} />
        <ProtectedRoute path={ROUTES.QUEUE} component={Queue} />
        <ProtectedRoute
          path={ROUTES.CREATE_PLAYLIST}
          component={CreatePlaylist}
        />
        <ProtectedRoute path={ROUTES.HOME} component={Home} exact />
      </Switch>
    </div>
  );
}

export default App;
