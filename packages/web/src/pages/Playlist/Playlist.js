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

import { songSelector } from "../../redux/song/song-selectors";
import {
  setAutoPlay,
  setQueueAndCurrentSong,
} from "../../redux/musicPlayer/player-actions";
import { startListByIndex } from "../../utils/playerUtils";
import { CenterContent } from "../../styles/formStyles";

function UploadSong() {
  const dispatch = useDispatch();
  const { mySongs } = useSelector(songSelector);
  const [isGrid, setIsGrid] = useState(true);

  function toggleGrid() {
    setIsGrid(!isGrid);
  }

  function handlePlaySong(index) {
    const song = mySongs[index];

    const list = startListByIndex(index, [...mySongs]);

    dispatch(setAutoPlay(true));
    dispatch(setQueueAndCurrentSong(song, list));
  }

  return (
    <Main>
      <Navbar />
      <CenterContent>
        <Thumbnail src={mySongs[0].thumbnail} />
      </CenterContent>
      <Author>
        by <a href="#">janpc</a>
      </Author>
      <PlaylistInfo>
        <div>
          <p>618 songs</p>
          <p>1854 minutes</p>
        </div>
        <Icon name="heartFull" size="small" />
      </PlaylistInfo>
      <TitleContainer>
        <Title>My Songs</Title>
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
        {mySongs?.map((song, index) => (
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
