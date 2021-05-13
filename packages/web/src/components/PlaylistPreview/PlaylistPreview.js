import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";

import {
  setQueueAndCurrentSong,
  setAutoPlay,
} from "../../redux/musicPlayer/player-actions";

import Song from "../Song";

import {
  SongsContainer,
  Title,
  TitleContainer,
  Buttons,
  Container,
} from "./style";
import { Icon } from "../../styles/mainStyles";
import { startListByIndex } from "../../utils/playerUtils";
import { calcMaxPages } from "../../utils/utils";

function PlaylistPreview({ songs, title }) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [shownSongs, setShownSongs] = useState([]);
  const [songsPerPage, setSongsPerPage] = useState(5);

  const isBigScreen = useMediaQuery({ minWidth: 800 });
  const isSmallScreen = useMediaQuery({ maxWidth: 350 });

  useEffect(() => {
    if (isBigScreen) {
      setSongsPerPage(5);
    } else if (isSmallScreen) {
      setSongsPerPage(3);
    } else {
      setSongsPerPage(4);
    }
  }, [isBigScreen, isSmallScreen, page]);

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
    const maxPages = calcMaxPages(songs, songsPerPage);
    if (maxPages !== 1) {
      if (page === 1) {
        setPage(maxPages);
      } else {
        setPage(page - 1);
      }
    }
  }

  function handlePlaySong(index) {
    const song = songs[index];

    const list = startListByIndex(index, [...songs]);

    dispatch(setAutoPlay(true));
    dispatch(setQueueAndCurrentSong(song, list, title));
  }

  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        <Buttons>
          <Icon name="previous" onClick={handlePreviousPage} size="xSmall" />
          {page}/{calcMaxPages(songs, songsPerPage)}
          <Icon name="next" onClick={handleNextPage} size="xSmall" />
        </Buttons>
      </TitleContainer>
      <hr />
      <SongsContainer>
        {shownSongs.map((song, index) => (
          <Song
            key={song._id}
            songInfo={song}
            handleClick={() => {
              handlePlaySong(index + songsPerPage * (page - 1));
            }}
          />
        ))}
      </SongsContainer>
    </Container>
  );
}

PlaylistPreview.propTypes = {
  songs: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default PlaylistPreview;
