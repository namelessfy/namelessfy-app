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
} from "./style";
import { Main, Icon } from "../../styles/mainStyles";

import { userSelector } from "../../redux/user/user-selectors";
import {
  setAutoPlay,
  setQueueAndCurrentSong,
} from "../../redux/musicPlayer/player-actions";
import { startListByIndex } from "../../utils/playerUtils";
import { CenterContent } from "../../styles/formStyles";

function UploadSong() {
  const dispatch = useDispatch();
  const { mySongs } = useSelector(userSelector);
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
        <Thumbnail />
      </CenterContent>
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
