import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Main } from "../../styles/mainStyles";
import UserProfile from "../../components/UserProfile/UserProfile";

import {
  getMySongs,
  getUserFavorites,
  getUserFavoritesReset,
  getUserSongs,
  getUserSongsReset,
} from "../../redux/song/song-actions";
import { userSelector } from "../../redux/user/user-selectors";
import { songSelector } from "../../redux/song/song-selectors";
import { playlistSelector } from "../../redux/playlist/playlist-selectors";
import { getUser, getUserReset } from "../../redux/user/user-actions";

import { hasUserAllInfo } from "../../utils/utils";
import {
  getUserPlaylists,
  getUserPlaylistsReset,
} from "../../redux/playlist/playlist-actions";
import Loader from "../../components/Loader";

function UserPage() {
  const dispatch = useDispatch();
  const { currentUser, user, isGettingUser, getUserError } = useSelector(
    userSelector,
  );
  const { mySongs, favorites, userSongs, userFavorites, isGettingUserSongs, isGettingUserFavorites } = useSelector(
    songSelector,
  );
  const { myPlaylists, userPlaylists, isGettingUserPlaylists } = useSelector(playlistSelector);
  const [ hasAllInfo, setHasAllInfo ] = useState(false);
  const { userName } = useParams();

  useEffect(() => {
    setHasAllInfo(hasUserAllInfo(currentUser));
  }, [currentUser]);

  useEffect(() => {
    if (hasAllInfo && userName !== currentUser.userName) {
      dispatch(getUser(userName));
    }
  }, [hasAllInfo, userName, currentUser]);

  useEffect(() => {
    dispatch(getMySongs());
  }, []);

  useEffect(() => {
    if (user?._id) {
      dispatch(getUserSongs(user._id));
      dispatch(getUserFavorites(user._id));
      dispatch(getUserPlaylists(user._id));
    }
  }, [user]);

  useEffect(() => {
    return () => {
      dispatch(getUserSongsReset());
      dispatch(getUserFavoritesReset());
      dispatch(getUserPlaylistsReset());
      dispatch(getUserReset());
    };
  }, []);

  return (
    <Main marginBottom>
      {(isGettingUser || isGettingUserSongs || isGettingUserFavorites || isGettingUserPlaylists) && <Loader />}
      {userName === currentUser.userName && !isGettingUser && !getUserError && (
        <UserProfile
          user={currentUser}
          songs={mySongs}
          favorites={favorites}
          playlists={myPlaylists}
          isCurrentUser
        />
      )}
      {userName !== currentUser.userName && !isGettingUser && !getUserError && (
        <UserProfile
          user={user}
          songs={userSongs}
          favorites={userFavorites}
          playlists={userPlaylists}
        />
      )}
      {isGettingUser && isGettingUser}
    </Main>
  );
}

export default UserPage;
