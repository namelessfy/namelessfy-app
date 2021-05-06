import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../components/Navbar";
import Song from "../../components/Song";

import {
  SongsContainer,
  TitleContainer,
  Title,
  ToggleContainer,
  Separation,
  Thumbnail,
  Author,
  PlaylistInfo,
} from "./style";
import { Main, Icon } from "../../styles/mainStyles";

import {
  setAutoPlay,
  setQueueAndCurrentSong,
} from "../../redux/musicPlayer/player-actions";
import { startListByIndex } from "../../utils/playerUtils";
import { CenterContent } from "../../styles/formStyles";
import { playlistSelector } from "../../redux/playlist/playlist-selectors";
import { userSelector } from "../../redux/user/user-selectors";

function UploadSong() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(userSelector);
  const { playlistInfo } = useSelector(playlistSelector);
  const [isGrid, setIsGrid] = useState(true);

  function toggleGrid() {
    setIsGrid(!isGrid);
  }

  function handlePlaySong(index) {
    const song = playlistInfo.tracks[index];

    const list = startListByIndex(index, [...playlistInfo.tracks]);

    dispatch(setAutoPlay(true));
    dispatch(setQueueAndCurrentSong(song, list));
  }

  return (
    <Main marginBottom>
      <Navbar />
      <CenterContent>
        <Thumbnail src={playlistInfo.thumbnail} />
      </CenterContent>
      <Author>
        by <a href="#">{playlistInfo.authorName}</a>
      </Author>
      <PlaylistInfo>
        <div>
          <p>618 songs</p>
          <p>1854 minutes</p>
        </div>
        {playlistInfo.author === currentUser._id ? (
          <Icon name="edit" size="small" />
        ) : (
          <Icon name="heartFull" size="small" />
        )}
      </PlaylistInfo>
      <TitleContainer>
        <Title>{playlistInfo.title}</Title>
        <ToggleContainer>
          <Icon
            name={isGrid ? "toggleOn" : "toggleOff"}
            size="normal"
            onClick={toggleGrid}
          />
          <Icon
            name={isGrid ? "grid" : "list"}
            size="normal"
            onClick={toggleGrid}
          />
        </ToggleContainer>
      </TitleContainer>
      <Separation />
      <SongsContainer>
        {playlistInfo.tracks.map((song, index) => (
          <Song
            key={song._id}
            songInfo={song}
            handleClick={() => {
              handlePlaySong(index);
            }}
          />
        ))}
      </SongsContainer>
    </Main>
  );
}

export default UploadSong;
