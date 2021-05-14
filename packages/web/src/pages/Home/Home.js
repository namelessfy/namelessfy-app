import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import PlaylistPreview from "../../components/PlaylistPreview";
import PlaylistList from "../../components/PlaylistList";
import Loader from "../../components/Loader";

import { getFollowedUsers } from "../../redux/user/user-actions";
import { getFavorites, getMySongs } from "../../redux/song/song-actions";
import { getPlaylists } from "../../redux/playlist/playlist-actions";
import { userSelector } from "../../redux/user/user-selectors";
import { songSelector } from "../../redux/song/song-selectors";
import { playlistSelector } from "../../redux/playlist/playlist-selectors";
import { playerSelector } from "../../redux/musicPlayer/player-selectors";

import { Container } from "./style";

function Home() {
  const dispatch = useDispatch();
  const { isGettingFollowedUsers } = useSelector(userSelector);
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

  return (
    <>
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
    </>
  );
}

export default Home;
