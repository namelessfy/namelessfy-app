import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import Song from "../Song";
import Playlist from "../Playlist";
import SongListDisplay from "../SongListDisplay";
import RowPlaylist from "../RowPlaylist";

import { startListByIndex } from "../../utils/playerUtils";

import {
  setQueueAndCurrentSong,
  setAutoPlay,
} from "../../redux/musicPlayer/player-actions";

import { ButtonContainer, MediaContainer } from "./styles";
import { Button } from "../../styles/formStyles";

function UserList({ button, content, isGrid }) {
  const dispatch = useDispatch();
  function handlePlaySong(index) {
    const song = content.elements[index];

    const list = startListByIndex(index, [...content.elements]);

    dispatch(setAutoPlay(true));
    dispatch(setQueueAndCurrentSong(song, list, "My Songs"));
  }

  return (
    <div>
      {button && (
        <ButtonContainer>
          <Button onClick={button.function}>{button.name}</Button>
        </ButtonContainer>
      )}
      <MediaContainer
        isRowPlaylist={isGrid === false && content.type === "playlist"}
      >
        {content.type === "songs" &&
          content.elements?.map((song, index) =>
            isGrid ? (
              <Song
                key={song._id}
                songInfo={song}
                handleClick={() => {
                  handlePlaySong(index);
                }}
              />
            ) : (
              <SongListDisplay
                key={song._id}
                songInfo={song}
                handleClick={() => {
                  handlePlaySong(index);
                }}
              />
            ),
          )}
        {content.type === "favs" &&
          content.elements?.map((song, index) =>
            isGrid ? (
              <Song
                key={song._id}
                songInfo={song}
                handleClick={() => {
                  handlePlaySong(index);
                }}
              />
            ) : (
              <SongListDisplay
                key={song._id}
                songInfo={song}
                handleClick={() => {
                  handlePlaySong(index);
                }}
              />
            ),
          )}
        {content.type === "playlist" &&
          content.elements?.map((playlist, index) =>
            isGrid ? (
              <Playlist
                key={playlist._id}
                playlistInfo={playlist}
                handleClick={() => {}}
              />
            ) : (
              <RowPlaylist
                key={playlist._id}
                info={playlist}
                handleClick={() => {}}
              />
            ),
          )}
      </MediaContainer>
    </div>
  );
}

UserList.propTypes = {
  button: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired,
  isGrid: PropTypes.bool.isRequired,
};

export default UserList;
