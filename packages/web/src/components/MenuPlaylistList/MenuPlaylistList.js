import React from "react";
import PropTypes from "prop-types";

import RowPlaylist from "../RowPlaylist";

import { PlaylistsContainer, Title, TitleContainer, Container } from "./style";

function MenuPlaylistList({ playlists, title }) {
  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
      <hr />
      <PlaylistsContainer>
        {playlists.map((playlist) => (
          <RowPlaylist key={playlist._id} info={playlist} />
        ))}
      </PlaylistsContainer>
    </Container>
  );
}

MenuPlaylistList.propTypes = {
  playlists: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default MenuPlaylistList;
