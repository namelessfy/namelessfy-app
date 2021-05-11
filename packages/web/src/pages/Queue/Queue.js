import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { playerSelector } from "../../redux/musicPlayer/player-selectors";
import { Separation, Title } from "../../styles/formStyles";
import { QueueContainer, SectionTitle, SongList } from "./styles";

import { setQueue, setPreQueue } from "../../redux/musicPlayer/player-actions";
import DragAndDropList from "../../components/DragAndDropList/DragAndDropList";

function Queue() {
  const {
    queue,
    isShuffle,
    shuffleQueue,
    preQueue,
    currentSong,
    currentPlaylist,
  } = useSelector(playerSelector);
  const dispatch = useDispatch();

  function handleOnNextFromDragEnd(result) {
    if (result.destination?.droppableId === "nextFrom") {
      const items = isShuffle ? [...shuffleQueue] : [...queue];
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      dispatch(setQueue(items));
    }
  }

  function handleOnQueueDragEnd(result) {
    if (result.destination?.droppableId === "Queue") {
      const items = [...preQueue];
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      dispatch(setPreQueue(items));
    }
  }

  return (
    <>
      <Title>Queue</Title>
      <Separation />
      <QueueContainer>
        {currentSong && (
          <>
            <SectionTitle>Playing:</SectionTitle>
            <SongList>
              <DragAndDropList
                dropId="Current Song"
                handleOnDragEnd={() => {}}
                songList={[currentSong]}
              />
            </SongList>
          </>
        )}
        {preQueue.length > 0 && (
          <>
            <SectionTitle>Queue:</SectionTitle>
            <DragAndDropList
              dropId="Queue"
              handleOnDragEnd={handleOnQueueDragEnd}
              songList={preQueue}
            />
          </>
        )}
        {isShuffle
          ? shuffleQueue.length > 0 && (
              <>
                <SectionTitle>Next from {currentPlaylist}:</SectionTitle>
                <DragAndDropList
                  dropId="nextFrom"
                  handleOnDragEnd={handleOnNextFromDragEnd}
                  songList={shuffleQueue}
                />
              </>
            )
          : queue.length > 0 && (
              <>
                <SectionTitle>Next from {currentPlaylist}:</SectionTitle>
                <DragAndDropList
                  dropId="nextFrom"
                  handleOnDragEnd={handleOnNextFromDragEnd}
                  songList={queue}
                />
              </>
            )}
      </QueueContainer>
    </>
  );
}

export default Queue;
