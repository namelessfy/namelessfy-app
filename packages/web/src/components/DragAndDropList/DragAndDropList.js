import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  SongList,
  SongItem,
  SongTitle,
  SongArtist,
  SongDuration,
  Icontainer,
} from "./styles";
import { Icon } from "../../styles/mainStyles";

function toMinutes(time) {
  const min = Math.floor(time / 60);
  let sec = Math.round(time % 60);
  sec = sec < 10 ? `0${sec}` : sec;
  return `${min}:${sec}`;
}

function DragAndDropList({ handleOnDragEnd, dropId, songList }) {
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={dropId}>
        {(provide) => (
          <SongList {...provide.droppableProps} ref={provide.innerRef}>
            {songList?.map((song, index) => {
              return (
                <Draggable
                  key={song?._id}
                  draggableId={song?._id}
                  index={index}
                >
                  {(provided) => (
                    <SongItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <SongTitle>{song?.title}</SongTitle>
                      <SongArtist>
                        {song?.artistId?.map((artist) => (
                          <span key={artist._id}>{artist.userName}</span>
                        ))}
                      </SongArtist>
                      <SongDuration>{toMinutes(song?.duration)}</SongDuration>
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
  );
}

export default DragAndDropList;
