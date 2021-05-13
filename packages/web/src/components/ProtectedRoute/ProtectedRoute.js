import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { authSelector } from "../../redux/auth/auth-selectors";
import { userSelector } from "../../redux/user/user-selectors";

import * as ROUTES from "../../routes";

import MusicPlayer from "../MusicPlayer";
import Navbar from "../Navbar";

import { Main } from "../../styles/mainStyles";

import { hasUserAllInfo } from "../../utils/utils";

function ProtectedRoute({ ...props }) {
  const location = useLocation();
  const { isAuthenticated } = useSelector(authSelector);
  const { currentUser } = useSelector(userSelector);

  if (isAuthenticated) {
    if (location.pathname !== ROUTES.COMPLETE_SIGNUP) {
      if (!hasUserAllInfo(currentUser)) {
        return <Redirect to={ROUTES.COMPLETE_SIGNUP} />;
      }
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

    return (
      <Main marginBottom>
        <Route {...props} />
      </Main>
    );
  }
  return <Redirect to={ROUTES.LOGIN} />;
}

export default ProtectedRoute;
