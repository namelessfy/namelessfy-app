import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";

import MusicPlayer from "../MusicPlayer";
import Navbar from "../Navbar";

import * as ROUTES from "../../routes";

import { hasUserAllInfo } from "../../utils/utils";

import { authSelector } from "../../redux/auth/auth-selectors";
import { userSelector } from "../../redux/user/user-selectors";

import { Main } from "../../styles/mainStyles";

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
      <Main>
        <Route {...props} />
      </Main>
    );
  }
  return <Redirect to={ROUTES.LOGIN} />;
}

export default ProtectedRoute;
