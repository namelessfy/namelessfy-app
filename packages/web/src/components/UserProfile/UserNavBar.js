import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { Media, NavButton, NavContainer } from "./styles";

import UserList from "./UserList";
import * as ROUTES from "../../routes";

function UserNavBar({ songs }) {
  const [view, setView] = useState("songs");
  const history = useHistory();

  const switchToSongs = () => {
    const s = "songs";
    setView(s);
  };
  const switchToAlbums = () => {
    const a = "albums";
    setView(a);
  };

  const switchToPlaylists = () => {
    const p = "playlists";
    setView(p);
  };

  const buttonAddSong = {
    name: "Add Song",
    function: () => {
      history.push(ROUTES.UPLOAD_SONG);
    },
  };

  const songsContent = {
    type: "songs",
    elements: songs,
  };

  return (
    <div>
      <NavContainer>
        <NavButton
          type="button"
          onClick={switchToSongs}
          selected={view === "songs"}
        >
          {" "}
          Songs{" "}
        </NavButton>
        <NavButton
          type="button"
          onClick={switchToAlbums}
          selected={view === "albums"}
        >
          {" "}
          Albums{" "}
        </NavButton>
        <NavButton
          type="button"
          onClick={switchToPlaylists}
          selected={view === "playlists"}
        >
          {" "}
          Playlists{" "}
        </NavButton>
      </NavContainer>

      {view === "songs" && (
        <UserList button={buttonAddSong} content={songsContent} />
      )}
      {view === "albums" && <Media>Albums</Media>}
      {view === "playlists" && <Media>Playlists</Media>}
    </div>
  );
}

UserNavBar.propTypes = {
  songs: PropTypes.array.isRequired,
};

export default UserNavBar;
