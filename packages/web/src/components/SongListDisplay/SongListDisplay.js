import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { isIdInList } from "../../utils/utils";

import { dislikeSong, likeSong } from "../../redux/song/song-actions";
import { songSelector } from "../../redux/song/song-selectors";

import {
  SongArtist,
  SongDuration,
  SongItem,
  SongList,
  SongTitle,
} from "../DragAndDropList/styles";
import { Icon } from "../../styles/mainStyles";

function toMinutes(time) {
  const min = Math.floor(time / 60);
  let sec = Math.round(time % 60);
  sec = sec < 10 ? `0${sec}` : sec;
  return `${min}:${sec}`;
}

function SongListDisplay({ songInfo, handleClick }) {
  const dispatch = useDispatch();
  const { favorites } = useSelector(songSelector);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (favorites && songInfo) {
      setIsLiked(isIdInList(songInfo._id, favorites));
    }
  }, [favorites, songInfo]);

  function clickOnSong(e) {
    if (e.target.id !== "heartIcon") {
      handleClick();
    }
  }
  function toggleLike() {
    if (isLiked) {
      dispatch(dislikeSong(songInfo._id));
    } else {
      dispatch(likeSong(songInfo._id));
    }
  }
  return (
    <SongList onClick={clickOnSong}>
      <SongItem key={songInfo?._id}>
        <Icon
          id="heartIcon"
          name={isLiked ? "heartFull" : "heartEmpty"}
          size="small"
          onClick={toggleLike}
        />

        <SongTitle>{songInfo?.title}</SongTitle>
        <SongArtist>
          {songInfo?.artistId?.map((artist) => (
            <span key={artist._id}>{artist.userName}</span>
          ))}
        </SongArtist>
        <SongDuration>{toMinutes(songInfo?.duration)}</SongDuration>
      </SongItem>
    </SongList>
  );
}

SongListDisplay.propTypes = {
  songInfo: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default SongListDisplay;
