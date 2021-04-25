import React from "react";
import PropTypes from "prop-types";

import { SongCover, SongTitle, SongArtists, SongContainer } from "./style";

function Song({ songInfo, handleClick }) {
  return (
    <SongContainer>
      <SongCover src={songInfo.thumbnail} onClick={handleClick} />
      <SongTitle onClick={handleClick}>{songInfo.title}</SongTitle>
      <SongArtists>
        {songInfo.artistId.map((artist, index) => (
          <a key={artist._id}>
            {index > 0 ? ` ${artist.userName}` : artist.userName}
          </a>
        ))}
      </SongArtists>
    </SongContainer>
  );
}

Song.propTypes = {
  songInfo: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Song;
