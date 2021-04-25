import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

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

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  exact: false,
};

export default ProtectedRoute;
