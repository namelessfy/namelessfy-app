import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import Header from "../../components/Header";
import * as ROUTES from "../../routes";

import { Main } from "../../styles/mainStyles";

import { authSelector } from "../../redux/auth/auth-selectors";
import { hasUserAllInfo } from "../../utils/utils";
import UserProfile from "../../components/UserProfile/UserProfile";

function UserPage() {
  return (
    <Main>
      <Header />
      <section>
        <UserProfile />
      </section>
    </Main>
  );
}

export default UserPage;
