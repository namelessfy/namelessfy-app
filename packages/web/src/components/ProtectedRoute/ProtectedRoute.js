import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { authSelector } from "../../redux/auth/auth-selectors";

import * as ROUTES from "../../routes";

import MusicPlayer from "../MusicPlayer";
import Navbar from "../Navbar";

import { Main } from "../../styles/mainStyles";

function ProtectedRoute({ ...props }) {
  const location = useLocation();
  const { isAuthenticated } = useSelector(authSelector);

  if (isAuthenticated) {
    if (location.pathname !== ROUTES.COMPLETE_SIGNUP) {
      return (
        <>
          <Main marginBottom>
            <Navbar />

            <Route {...props} />
          </Main>
          <MusicPlayer />
        </>
      );
    }

    return <Route {...props} />;
  }
  return <Redirect to={ROUTES.LOGIN} />;
}

export default ProtectedRoute;
