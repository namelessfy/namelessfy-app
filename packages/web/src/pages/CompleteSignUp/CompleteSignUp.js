import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import EditUserForm from "../../components/EditUserForm";

import * as ROUTES from "../../routes";

import { hasUserAllInfo } from "../../utils/utils";

import { userSelector } from "../../redux/user/user-selectors";

import { Title, Separation } from "./style";

function CompleteSignUP() {
  const { currentUser } = useSelector(userSelector);

  return hasUserAllInfo(currentUser) ? (
    <Redirect to={ROUTES.HOME} />
  ) : (
    <section>
      <Title>Complete Sign Up</Title>
      <Separation />
      <EditUserForm />
    </section>
  );
}

export default CompleteSignUP;
