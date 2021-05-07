import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Navbar from "../../components/Navbar";
import { playerSelector } from "../../redux/musicPlayer/player-selectors";
import { Separation, Title } from "../../styles/formStyles";
import { Main } from "../../styles/mainStyles";
import {
  QueueContainer,
  SectionTitle,
  SongList,
  SongItem,
  SongTitle,
  SongArtist,
  SongDuration,
  Icontainer,
} from "./styles";
import { Icon } from "../../styles/mainStyles";
import SongListItem from "../../components/SongListItem";
import { setQueue, setPreQueue } from "../../redux/musicPlayer/player-actions";

function Queue() {
  const { queue, preQueue, currentSong, currentPlaylist } = useSelector(
    playerSelector,
  );
  const dispatch = useDispatch();

  function handleOnNextFromDragEnd(result) {
    if (result.destination?.droppableId === "nextFrom") {
      const items = [...queue];
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

  function toMinutes(time) {
    const min = Math.floor(time / 60);
    let sec = Math.round(time % 60);
    sec = sec < 10 ? `0${sec}` : sec;
    return `${min}:${sec}`;
  }
  return (
    <Main>
      <Navbar />
      <Title>Queue</Title>
      <Separation />
      <QueueContainer>
        {currentSong && (
          <>
            <SectionTitle>Playing:</SectionTitle>
            <SongList>
              <SongListItem songInfo={currentSong} />
            </SongList>
          </>
        )}
        {preQueue.length > 0 && (
          <>
            <SectionTitle>Queue:</SectionTitle>
            <DragDropContext onDragEnd={handleOnQueueDragEnd}>
              <Droppable droppableId="Queue">
                {(provide) => (
                  <SongList
                    className="Queue"
                    {...provide.droppableProps}
                    ref={provide.innerRef}
                  >
                    {preQueue.map((song, index) => {
                      return (
                        <Draggable
                          key={song?._id}
                          draggableId={song?._id}
                          index={index}
                        >
                          {(provided) => (
                            <SongItem
                              songInfo={song}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <SongTitle>{song?.title}</SongTitle>
                              <SongArtist>
                                {song?.artistId?.map((artist) => (
                                  <span key={artist._id}>
                                    {artist.userName}
                                  </span>
                                ))}
                              </SongArtist>
                              <SongDuration>
                                {toMinutes(song?.duration)}
                              </SongDuration>
                              <Icontainer>
                                <Icon name="menu" size="small" />
                              </Icontainer>
                            </SongItem>
                          )}
                        </Draggable>
                      );
                    })}
                    {provide.placeholder}
                  </SongList>
                )}
              </Droppable>
            </DragDropContext>
          </>
        )}
        {queue.length > 0 && (
          <>
            <SectionTitle>Next from {currentPlaylist}:</SectionTitle>
            <DragDropContext onDragEnd={handleOnNextFromDragEnd}>
              <Droppable droppableId="nextFrom">
                {(provide) => (
                  <SongList
                    className="nextFrom"
                    {...provide.droppableProps}
                    ref={provide.innerRef}
                  >
                    {queue.map((song, index) => {
                      return (
                        <Draggable
                          key={song?._id}
                          draggableId={song?._id}
                          index={index}
                        >
                          {(provided) => (
                            <SongItem
                              songInfo={song}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <SongTitle>{song?.title}</SongTitle>
                              <SongArtist>
                                {song?.artistId?.map((artist) => (
                                  <span key={artist._id}>
                                    {artist.userName}
                                  </span>
                                ))}
                              </SongArtist>
                              <SongDuration>
                                {toMinutes(song?.duration)}
                              </SongDuration>
                              <Icontainer>
                                <Icon name="menu" size="small" disabled />
                              </Icontainer>
                            </SongItem>
                          )}
                        </Draggable>
                      );
                    })}
                    {provide.placeholder}
                  </SongList>
                )}
              </Droppable>
            </DragDropContext>
          </>
        )}
      </QueueContainer>
    </Main>
  );
}

export default Queue;
