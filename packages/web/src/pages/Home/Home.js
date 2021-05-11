import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import PlaylistPreview from "../../components/PlaylistPreview";
import PlaylistList from "../../components/PlaylistList";
import Loader from "../../components/Loader";

import * as ROUTES from "../../routes";

import { userSelector } from "../../redux/user/user-selectors";
import { songSelector } from "../../redux/song/song-selectors";
import { getFavorites, getMySongs } from "../../redux/song/song-actions";
import { playlistSelector } from "../../redux/playlist/playlist-selectors";
import { getPlaylists } from "../../redux/playlist/playlist-actions";

import { hasUserAllInfo } from "../../utils/utils";

import { Main } from "../../styles/mainStyles";
import { Container } from "./style";
import { playerSelector } from "../../redux/musicPlayer/player-selectors";
import { getFollowedUsers } from "../../redux/user/user-actions";

function Home() {
  const dispatch = useDispatch();
  const { currentUser, isGettingFollowedUsers } = useSelector(userSelector);
  const {
    favorites,
    mySongs,
    isGettingFavorites,
    isGettingMySongs,
  } = useSelector(songSelector);
  const { myPlaylists, isGettingMyPlaylists } = useSelector(playlistSelector);
  const { lastSongsPlayed } = useSelector(playerSelector);

  useEffect(() => {
    dispatch(getPlaylists());
    dispatch(getFollowedUsers());
    dispatch(getMySongs());
    dispatch(getFavorites());
  }, [dispatch]);

  if (!hasUserAllInfo(currentUser)) {
    return <Redirect to={ROUTES.COMPLETE_SIGNUP} />;
  }

  return (
    <Main marginBottom>
      {(isGettingFollowedUsers ||
        isGettingFavorites ||
        isGettingMySongs ||
        isGettingMyPlaylists) && <Loader />}
      <Container>
        {myPlaylists?.length > 0 && (
          <PlaylistList title="Your playlists" playlists={myPlaylists} />
        )}
        {lastSongsPlayed?.length > 0 && (
          <PlaylistPreview title="Last songs played" songs={lastSongsPlayed} />
        )}
        {favorites?.length > 0 && (
          <PlaylistPreview title="Your favorite songs" songs={favorites} />
        )}
        {mySongs?.length > 0 && (
          <PlaylistPreview title="Your Songs" songs={mySongs} />
        )}
      </Container>
    </Main>
  );
}

export default Home;
