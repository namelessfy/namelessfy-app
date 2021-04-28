import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import Song from "../Song";

import {
  setQueueAndCurrentSong,
  setAutoPlay,
} from "../../redux/musicPlayer/player-actions";

import { Button } from "../../styles/formStyles";

import { startListByIndex } from "../../utils/playerUtils";

import { ButtonContainer, MediaContainer } from "./styles";

function UserList({ button, content }) {
  const dispatch = useDispatch();
  function handlePlaySong(index) {
    const song = content.elements[index];

    const list = startListByIndex(index, [...content.elements]);

    dispatch(setAutoPlay(true));
    dispatch(setQueueAndCurrentSong(song, list));
  }
  return (
    <div>
      <ButtonContainer>
        <Button onClick={button.function}>{button.name}</Button>
      </ButtonContainer>
      <MediaContainer>
        {content.type === "songs" &&
          content.elements.map((song, index) => (
            <Song
              key={song._id}
              songInfo={song}
              handleClick={() => {
                handlePlaySong(index);
              }}
            />
          ))}
      </MediaContainer>
    </div>
  );
}

UserList.propTypes = {
  button: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
};

export default UserList;