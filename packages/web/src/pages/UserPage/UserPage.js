import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile/UserProfile";

import {
  getUserPlaylists,
  getUserPlaylistsReset,
} from "../../redux/playlist/playlist-actions";
import {
  getUserFavorites,
  getUserFavoritesReset,
  getUserSongs,
  getUserSongsReset,
} from "../../redux/song/song-actions";
import {
  getOthersFollowedUsers,
  getUser,
  getUserReset,
} from "../../redux/user/user-actions";
import { playlistSelector } from "../../redux/playlist/playlist-selectors";
import { songSelector } from "../../redux/song/song-selectors";
import { userSelector } from "../../redux/user/user-selectors";

function UserPage() {
  const dispatch = useDispatch();
  const {
    currentUser,
    user,
    isGettingUser,
    getUserError,
    othersFollowedUsers,
    followedUsers,
  } = useSelector(userSelector);
  const {
    mySongs,
    favorites,
    userSongs,
    userFavorites,
    isGettingUserSongs,
    isGettingUserFavorites,
  } = useSelector(songSelector);
  const { myPlaylists, userPlaylists, isGettingUserPlaylists } = useSelector(
    playlistSelector,
  );
  const { userName } = useParams();

  useEffect(() => {
    if (userName !== currentUser.userName) {
      dispatch(getUser(userName));
    }
  }, [userName, currentUser]);

  useEffect(() => {
    if (user?._id) {
      dispatch(getOthersFollowedUsers(user._id));
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
    <>
      {(isGettingUser ||
        isGettingUserSongs ||
        isGettingUserFavorites ||
        isGettingUserPlaylists) && <Loader />}
      {userName === currentUser.userName && !isGettingUser && !getUserError && (
        <UserProfile
          user={currentUser}
          songs={mySongs}
          favorites={favorites}
          playlists={myPlaylists}
          isCurrentUser
          userFollowedUsers={followedUsers}
        />
      )}
      {userName !== currentUser.userName && !isGettingUser && !getUserError && (
        <UserProfile
          user={user}
          songs={userSongs}
          favorites={userFavorites}
          playlists={userPlaylists}
          userFollowedUsers={othersFollowedUsers}
        />
      )}
      {isGettingUser && isGettingUser}
    </>
  );
}

export default UserPage;
