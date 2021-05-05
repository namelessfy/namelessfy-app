import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

import Playlist from "../Playlist";

import {
  PlaylistContainer,
  Title,
  TitleContainer,
  Buttons,
  Container,
} from "./style";
import { Icon } from "../../styles/mainStyles";

function PlaylistList({ playlists, title }) {
  const [page, setPage] = useState(1);
  const [shownPlaylists, setShownPlaylists] = useState([]);
  const [playlistsPerPage, setPlaylistsPerPage] = useState(5);

  const isBigScreen = useMediaQuery({ minWidth: 800 });

  useEffect(() => {
    if (isBigScreen) {
      setPlaylistsPerPage(5);
    } else {
      setPlaylistsPerPage(4);
    }
  }, [isBigScreen, page]);

  useEffect(() => {
    const playlistsToShow = playlists.slice(
      0 + playlistsPerPage * (page - 1),
      playlistsPerPage + playlistsPerPage * (page - 1),
    );
    setShownPlaylists(playlistsToShow);
  }, [playlists, page, playlistsPerPage]);

  function handleNextPage() {
    if (page < playlists.length / playlistsPerPage) {
      setPage(page + 1);
    } else {
      setPage(1);
    }
  }

  function handlePreviousPage() {
    if (page === 1) {
      setPage(Math.floor(playlists.length / playlistsPerPage) + 1);
    } else {
      setPage(page - 1);
    }
  }

  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        <Buttons>
          <Icon name="previous" onClick={handlePreviousPage} size="xSmall" />
          {page}/{Math.floor(playlists.length / playlistsPerPage) + 1}
          <Icon name="next" onClick={handleNextPage} size="xSmall" />
        </Buttons>
      </TitleContainer>
      <hr />
      <PlaylistContainer>
        {shownPlaylists.map((playlist) => (
          <Playlist
            key={playlist._id}
            playlistInfo={playlist}
            handleClick={() => {}}
          />
        ))}
      </PlaylistContainer>
    </Container>
  );
}

PlaylistList.propTypes = {
  playlists: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default PlaylistList;
