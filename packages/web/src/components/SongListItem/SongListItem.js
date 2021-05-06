import React from "react";
import PropTypes from "prop-types";
import {
  SongArtist,
  SongDuration,
  SongItem,
  SongTitle,
  Icontainer,
} from "./styles";
import { Icon } from "../../styles/mainStyles";

function SongListItem({ songInfo }) {
  function toMinutes(time) {
    const min = Math.floor(time / 60);
    let sec = Math.round(time % 60);
    sec = sec < 10 ? `0${sec}` : sec;
    return `${min}:${sec}`;
  }

  return (
    <SongItem>
      <SongTitle>{songInfo.title}</SongTitle>
      <SongArtist>
        {songInfo.artistId.map((artist) => (
          <span key={artist._id}>{artist.userName}</span>
        ))}
      </SongArtist>
      <SongDuration>{toMinutes(songInfo.duration)}</SongDuration>
      <Icontainer>
        <Icon name="menu" size="small" />
      </Icontainer>
    </SongItem>
  );
}

SongListItem.propTypes = {
  songInfo: PropTypes.object.isRequired,
};

export default SongListItem;
