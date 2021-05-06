import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Song from "../../components/Song";
import { playerSelector } from "../../redux/musicPlayer/player-selectors";
import { Separation, Title } from "../../styles/formStyles";
import { Main } from "../../styles/mainStyles";
import { QueueContainer, SectionTitle, SongList } from "./styles";
import SongListItem from "../../components/SongListItem";

function Queue() {
  const { queue, preQueue, currentSong, currentPlaylist } = useSelector(
    playerSelector,
  );

  return (
    <Main>
      <Navbar />
      <Title>Queue</Title>
      <Separation />
      <QueueContainer>
        <SectionTitle>Playing:</SectionTitle>
        <SongList>
          <SongListItem songInfo={currentSong} />
        </SongList>
        {preQueue.length > 0 && (
          <>
            <SectionTitle>Queue:</SectionTitle>
            <SongList>
              {preQueue.map((song) => (
                <SongListItem key={song._id} songInfo={song} />
              ))}
            </SongList>
          </>
        )}
        <SectionTitle>Next from {currentPlaylist}:</SectionTitle>
        <SongList>
          {queue.map((song) => (
            <SongListItem key={song._id} songInfo={song} />
          ))}
        </SongList>
      </QueueContainer>
    </Main>
  );
}

export default Queue;
