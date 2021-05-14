import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import UserList from "./UserList";

import * as ROUTES from "../../routes";

import { setQueueToShuffle } from "../../redux/musicPlayer/player-actions";
import { setUserView } from "../../redux/user/user-actions";
import { userSelector } from "../../redux/user/user-selectors";

import { NavButton, NavContainer } from "./styles";

function UserNavBar({ songs, playlists, favSongs, isGrid }) {
  const dispatch = useDispatch();
  const { initialView } = useSelector(userSelector);
  const history = useHistory();

  const switchToSongs = () => {
    dispatch(setUserView("song"));
  };
  const switchToFavs = () => {
    dispatch(setUserView("favs"));
  };

  const switchToPlaylists = () => {
    dispatch(setUserView("playlist"));
  };

  const buttonAddSong = {
    name: "Add Song",
    function: () => {
      history.push(ROUTES.UPLOAD_SONG);
    },
  };

  const buttonAddPlayList = {
    name: "Add Playlist",
    function: () => {
      history.push(ROUTES.CREATE_PLAYLIST);
    },
  };

  const buttonShufflePlay = {
    name: "Shuffle Play",
    function: () => {
      dispatch(setQueueToShuffle(favSongs));
    },
  };

  const songsContent = {
    type: "songs",
    elements: songs,
  };

  const favsContent = {
    type: "favs",
    elements: favSongs,
  };

  const playlistContent = {
    type: "playlist",
    elements: playlists,
  };

  return (
    <div>
      <NavContainer>
        <NavButton
          type="button"
          onClick={switchToSongs}
          selected={initialView === "song"}
        >
          {" "}
          Songs{" "}
        </NavButton>
        <NavButton
          type="button"
          onClick={switchToFavs}
          selected={initialView === "favs"}
        >
          {" "}
          Favourite Songs{" "}
        </NavButton>
        <NavButton
          type="button"
          onClick={switchToPlaylists}
          selected={initialView === "playlist"}
        >
          {" "}
          Playlists{" "}
        </NavButton>
      </NavContainer>

      {initialView === "song" && (
        <UserList
          button={buttonAddSong}
          content={songsContent}
          isGrid={isGrid}
        />
      )}
      {initialView === "favs" && (
        <UserList
          button={buttonShufflePlay}
          content={favsContent}
          isGrid={isGrid}
        />
      )}
      {initialView === "playlist" && (
        <UserList
          button={buttonAddPlayList}
          content={playlistContent}
          isGrid={isGrid}
        />
      )}
    </div>
  );
}

UserNavBar.propTypes = {
  songs: PropTypes.array.isRequired,
  favSongs: PropTypes.array.isRequired,
  playlists: PropTypes.array.isRequired,
  isGrid: PropTypes.bool.isRequired,
};

export default UserNavBar;
