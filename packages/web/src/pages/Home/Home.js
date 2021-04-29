import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import Navbar from "../../components/Navbar";
import PlaylistPreview from "../../components/PlaylistPreview";

import * as ROUTES from "../../routes";

import { userSelector } from "../../redux/user/user-selectors";
import { songSelector } from "../../redux/song/song-selectors";
import { hasUserAllInfo } from "../../utils/utils";

import { Main } from "../../styles/mainStyles";
import { Container } from "./style";
import { getFavorites, getMySongs } from "../../redux/song/song-actions";

function Home() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(userSelector);
  const { favorites, mySongs } = useSelector(songSelector);
  const [hasAllInfo, setHasAllInfo] = useState(false);
  const [hasMySongs, setHasMySongs] = useState(false);

  useEffect(() => {
    if (hasAllInfo && !hasMySongs) {
      dispatch(getMySongs());
    }
  }, [hasAllInfo, hasMySongs]);

  useEffect(() => {
    if (mySongs) {
      setHasMySongs(true);
    }
  }, [mySongs]);

  useEffect(() => {
    if (hasAllInfo) {
      dispatch(getFavorites());
    }
  }, [hasAllInfo]);

  useEffect(() => {
    setHasAllInfo(hasUserAllInfo(currentUser));
  }, [currentUser]);

  if (!hasUserAllInfo(currentUser)) {
    return <Redirect to={ROUTES.COMPLETE_SIGNUP} />;
  }

  return (
    <Main>
      <Navbar />
      <Container>
        {favorites?.length > 0 && (
          <PlaylistPreview title="Liked Songs" songs={favorites} />
        )}
        {mySongs?.length > 0 && (
          <PlaylistPreview title="My Songs" songs={mySongs} />
        )}
      </Container>
    </Main>
  );
}

export default Home;
