import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { authSelector } from "../../redux/auth/auth-selectors";
import * as ROUTES from "../../routes";
import MusicPlayer from "../MusicPlayer";

function ProtectedRoute({ ...props }) {
  const location = useLocation();
  const { isAuthenticated } = useSelector(authSelector);

  if (isAuthenticated) {
    if (location.pathname !== ROUTES.COMPLETE_SIGNUP) {
      return (
        <>
          <MusicPlayer />
          <Route {...props} />
        </>
      );
    }

    return <Route {...props} />;
  }
  return <Redirect to={ROUTES.LOGIN} />;
}

export default ProtectedRoute;
