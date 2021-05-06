import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import Navbar from "../../components/Navbar";
import PlaylistPreview from "../../components/PlaylistPreview";
import PlaylistList from "../../components/PlaylistList";

import * as ROUTES from "../../routes";

import { userSelector } from "../../redux/user/user-selectors";
import { songSelector } from "../../redux/song/song-selectors";
import { playlistSelector } from "../../redux/playlist/playlist-selectors";
import { hasUserAllInfo } from "../../utils/utils";

import { Main } from "../../styles/mainStyles";
import { Container } from "./style";
import { getFavorites, getMySongs } from "../../redux/song/song-actions";
import { getPlaylists } from "../../redux/playlist/playlist-actions";

function Home() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(userSelector);
  const { favorites, mySongs } = useSelector(songSelector);
  const { myPlaylists } = useSelector(playlistSelector);
  const [hasAllInfo, setHasAllInfo] = useState(false);
  const [hasMySongs, setHasMySongs] = useState(false);
  const [hasPlaylists, setHasPlaylists] = useState(false);

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
    if (hasAllInfo && !hasPlaylists) {
      dispatch(getPlaylists());
    }
  }, [hasAllInfo]);

  useEffect(() => {
    console.log("My Playlists", myPlaylists);
    if (myPlaylists) {
      setHasPlaylists(true);
    }
  }, [myPlaylists]);

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
    <Main marginBottom>
      <Navbar />
      <Container>
        {favorites?.length > 0 && (
          <PlaylistPreview title="Liked Songs" songs={favorites} />
        )}
        {mySongs?.length > 0 && (
          <PlaylistPreview title="My Songs" songs={mySongs} />
        )}
        {myPlaylists?.length > 0 && (
          <PlaylistList title="My Playlists" playlists={myPlaylists} />
        )}
      </Container>
    </Main>
  );
}

export default Home;
