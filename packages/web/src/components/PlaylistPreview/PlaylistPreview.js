import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

import Song from "../Song";

import { Container, Title, TitleContainer, Buttons } from "./style";
import { Icon } from "../../styles/mainStyles";
import usePlayer from "../../hooks/usePlayer";
import { startListByIndex } from "../../utils/playerUtils";

function PlaylistPreview({ songs, title }) {
  const { setSongAndQueue, currentSong, play } = usePlayer();
  const [page, setPage] = useState(1);
  const [shownSongs, setShownSongs] = useState([]);
  const [songsPerPage, setSongsPerPage] = useState(5);

  const isBigScreen = useMediaQuery({ minWidth: 1000 });

  useEffect(() => {
    if (isBigScreen) {
      setSongsPerPage(5);
    } else {
      setSongsPerPage(4);
    }
  }, [isBigScreen, page]);

  useEffect(() => {
    const songsToShow = songs.slice(
      0 + songsPerPage * (page - 1),
      songsPerPage + songsPerPage * (page - 1),
    );
    setShownSongs(songsToShow);
  }, [songs, page, songsPerPage]);

  function handleNextPage() {
    if (page < songs.length / songsPerPage) {
      setPage(page + 1);
    } else {
      setPage(1);
    }
  }

  function handlePreviousPage() {
    if (page === 1) {
      setPage(Math.floor(songs.length / songsPerPage) + 1);
    } else {
      setPage(page - 1);
    }
  }

  function handlePlaySong(index) {
    const song = songs[index];
    const list = startListByIndex(index, [...songs, currentSong]);
    setSongAndQueue(song, list);
  }

  return (
    <>
      <TitleContainer>
        <Title>{title}</Title>
        <Buttons>
          <Icon name="previous" onClick={handlePreviousPage} size="xSmall" />
          <Icon name="next" onClick={handleNextPage} size="xSmall" />
        </Buttons>
      </TitleContainer>
      <hr />
      <Container>
        {shownSongs.map((song, index) => (
          <Song
            key={song._id}
            songInfo={song}
            handleClick={() => {
              handlePlaySong(index + songsPerPage * (page - 1));
            }}
          />
        ))}
      </Container>
    </>
  );
}

PlaylistPreview.propTypes = {
  songs: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default PlaylistPreview;
