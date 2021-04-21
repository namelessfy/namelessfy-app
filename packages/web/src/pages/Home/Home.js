import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Home.scss";
import Header from "../../components/Header";
import * as ROUTES from "../../routes";

import { authSelector } from "../../redux/auth/auth-selectors";
import { hasUserAllInfo } from "../../utils/utils";

function Home() {
  const { isAuthenticated, currentUser } = useSelector(authSelector);

  if (isAuthenticated && !hasUserAllInfo(currentUser)) {
    return <Redirect to={ROUTES.COMPLETE_SIGNUP} />;
  }

  return (
    <main className="p-4">
      <Header />
      <section className="p-4">
        {isAuthenticated ? (
          <h1 className="text-xl">Hello {currentUser.email}</h1>
        ) : (
          <h1 className="text-xl">You are currently not logged in</h1>
        )}
      </section>
    </main>
  );
}

export default Home;
