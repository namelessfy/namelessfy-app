import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../components/Navbar";
import Song from "../../components/Song";

import { Separation, Title } from "../../styles/formStyles";

import { SongsContainer } from "./style";

import { Main } from "../../styles/mainStyles";
import { userSelector } from "../../redux/user/user-selectors";
import {
  setAutoPlay,
  setQueueAndCurrentSong,
} from "../../redux/musicPlayer/player-actions";
import { startListByIndex } from "../../utils/playerUtils";

function UploadSong() {
  const dispatch = useDispatch();
  const { mySongs } = useSelector(userSelector);

  function handlePlaySong(index) {
    const song = mySongs[index];

    const list = startListByIndex(index, [...mySongs]);

    dispatch(setAutoPlay(true));
    dispatch(setQueueAndCurrentSong(song, list));
  }

  return (
    <Main>
      <Navbar />
      <Title>My Songs</Title>
      <Separation />
      <SongsContainer>
        {mySongs.map((song, index) => (
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
