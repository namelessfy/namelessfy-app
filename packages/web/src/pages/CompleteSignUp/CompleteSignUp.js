import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import EditUserForm from "../../components/EditUserForm";

import { Main } from "../../styles/mainStyles";
import { Title, Separation } from "./style";

import * as ROUTES from "../../routes";

import { authSelector } from "../../redux/auth/auth-selectors";
import { hasUserAllInfo } from "../../utils/utils";

function CompleteSignUP() {
  const { isAuthenticated, currentUser } = useSelector(authSelector);

  if (isAuthenticated && hasUserAllInfo(currentUser)) {
    return <Redirect to={ROUTES.HOME} />;
  }
  return (
    <Main>
      <section>
        <Title>Complete Sign Up</Title>
        <Separation />
        <EditUserForm />
      </section>
    </Main>
  );
}

export default CompleteSignUP;