import React, { useState } from "react";
import { Media, MediaContainer, NavContainer } from "./styles";

function UserNavBar() {
  const [view, setView] = useState("songs");

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

  return (
    <div>
      <NavContainer>
        <button type="button" onClick={switchToSongs}>
          {" "}
          Songs{" "}
        </button>
        <button type="button" onClick={switchToAlbums}>
          {" "}
          Albums{" "}
        </button>
        <button type="button" onClick={switchToPlaylists}>
          {" "}
          Playlists{" "}
        </button>
      </NavContainer>

      <MediaContainer>
        {view === "songs" && <Media>Songs</Media>}
        {view === "albums" && <Media>Albums</Media>}
        {view === "playlists" && <Media>Playlists</Media>}
      </MediaContainer>
    </div>
  );
}

export default UserNavBar;
