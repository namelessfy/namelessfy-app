import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { Media, NavButton, NavContainer } from "./styles";

import UserList from "./UserList";
import * as ROUTES from "../../routes";
import { userSelector } from "../../redux/user/user-selectors";
import { setUserView } from "../../redux/user/user-actions";

function UserNavBar({ songs, playlists }) {
  const dispatch = useDispatch();
  const { initialView } = useSelector(userSelector);
  const history = useHistory();

  const switchToSongs = () => {
    dispatch(setUserView("song"));
  };
  const switchToAlbums = () => {
    dispatch(setUserView("album"));
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

  const songsContent = {
    type: "songs",
    elements: songs,
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
          onClick={switchToAlbums}
          selected={initialView === "album"}
        >
          {" "}
          Albums{" "}
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
        <UserList button={buttonAddSong} content={songsContent} />
      )}
      {initialView === "album" && <Media>Albums</Media>}
      {initialView === "playlist" && (
        <UserList button={buttonAddPlayList} content={playlistContent} />
      )}
    </div>
  );
}

UserNavBar.propTypes = {
  songs: PropTypes.array.isRequired,
  playlists: PropTypes.array.isRequired,
};

export default UserNavBar;
