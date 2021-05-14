import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";

import * as ROUTES from "./routes";

import CompleteSignUp from "./pages/CompleteSignUp";
import CreatePlaylist from "./pages/CreatePlaylist";
import EditPlaylist from "./pages/EditPlaylist/EditPlaylist";
import EditSong from "./pages/EditSong";
import EditUser from "./pages/EditUser/EditUser";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Playlist from "./pages/Playlist";
import Queue from "./pages/Queue";
import ResetPassword from "./pages/ResetPassword";
import Search from "./pages/Search/Search";
import SignUp from "./pages/SignUp";
import UploadSong from "./pages/UploadSong";
import UserPage from "./pages/UserPage";

import ProtectedRoute from "./components/ProtectedRoute";

import { onAuthStateChanged } from "./services/auth";

import { syncSignIn, signOut, resetAuthState } from "./redux/auth/auth-actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = onAuthStateChanged((user) => {
      if (user) {
        dispatch(resetAuthState());
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
    <div>
      <Switch>
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.RESET_PASSWORD} component={ResetPassword} />
        <ProtectedRoute
          path={ROUTES.COMPLETE_SIGNUP}
          component={CompleteSignUp}
        />
        <ProtectedRoute path={`${ROUTES.EDIT_SONG}/:id`} component={EditSong} />

        <ProtectedRoute path={ROUTES.EDIT_USER} component={EditUser} />
        <ProtectedRoute
          path={`${ROUTES.USER_PAGE}/:userName`}
          component={UserPage}
        />
        <ProtectedRoute
          path={ROUTES.CREATE_PLAYLIST}
          component={CreatePlaylist}
        />
        <ProtectedRoute path={ROUTES.EDIT_PLAYLIST} component={EditPlaylist} />
        <ProtectedRoute path={`${ROUTES.PLAYLIST}/:id`} component={Playlist} />

        <ProtectedRoute path={ROUTES.UPLOAD_SONG} component={UploadSong} />
        <ProtectedRoute path={`${ROUTES.SEARCH}`} component={Search} />
        <ProtectedRoute path={ROUTES.QUEUE} component={Queue} />
        <ProtectedRoute path={ROUTES.HOME} component={Home} exact />
      </Switch>
    </div>
  );
}

export default App;
