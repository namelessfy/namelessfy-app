import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./Home.scss";
import Header from "../../components/Header";
import MusicPlayer from "../../components/MusicPlayer";
import * as ROUTES from "../../routes";

import { authSelector } from "../../redux/auth/auth-selectors";
import { hasUserAllInfo } from "../../utils/utils";
import { Main } from "../../styles/mainStyles";

import Navbar from "../../components/Navbar/Navbar";

function Home() {
  const { isAuthenticated, currentUser } = useSelector(authSelector);

  if (isAuthenticated && !hasUserAllInfo(currentUser)) {
    return <Redirect to={ROUTES.COMPLETE_SIGNUP} />;
  }

  return (
    <Main>
      {isAuthenticated && <Navbar />}
      <MusicPlayer />
      <section className="p-4">
        {isAuthenticated ? (
          <h1 className="text-xl">Hello {currentUser.email}</h1>
        ) : (
          <h1 className="text-xl">Hello World</h1>
        )}
      </section>
    </Main>
  );
}

export default Home;
