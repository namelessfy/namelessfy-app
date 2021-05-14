import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import Song from "../Song";

import { startListByIndex } from "../../utils/playerUtils";

import {
  setQueueAndCurrentSong,
  setAutoPlay,
} from "../../redux/musicPlayer/player-actions";

import { SongsContainer, Title, TitleContainer, Container } from "./style";

function PlaylistPreviewMenu({ songs, title }) {
  const dispatch = useDispatch();

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
      </TitleContainer>
      <hr />
      <SongsContainer>
        {songs.map((song, index) => (
          <Song
            key={song._id}
            songInfo={song}
            handleClick={() => {
              handlePlaySong(index);
            }}
            isMenu
          />
        ))}
      </SongsContainer>
    </Container>
  );
}

PlaylistPreviewMenu.propTypes = {
  songs: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default PlaylistPreviewMenu;
