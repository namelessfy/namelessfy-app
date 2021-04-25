import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { authSelector } from "../../redux/auth/auth-selectors";
import * as ROUTES from "../../routes";

function ProtectedRoute({ ...props }) {
  const { isAuthenticated } = useSelector(authSelector);
  return isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to={ROUTES.LOGIN} />
  );
}

export default ProtectedRoute;
