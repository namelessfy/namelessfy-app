import React, { useState } from "react";
import PropTypes from "prop-types";

import DialogueBox from "../DialogueBox";

import {
  SongCover,
  SongTitle,
  SongArtists,
  SongContainer,
  BottomContainer,
  InfoContainer,
} from "./style";

import { Icon } from "../../styles/mainStyles";

function Song({ songInfo, handleClick }) {
  const [isShowingDialogue, setIsShowingDialogue] = useState(false);
  const [dialoguePosition, setDialoguePosition] = useState({ x: 0, y: 0 });

  function showDialogueBox(e) {
    e.preventDefault();
    setDialoguePosition({ x: e.clientX, y: e.clientY });
    setIsShowingDialogue(true);
  }

  const dialogueButtons = {
    Play: handleClick,
    "Song information": () => console.log("Show song information"),
    Like: () => console.log("like"),
    "Add to playlis": () => console.log("Add to playlis"),
    Edit: () => console.log("edit"),
  };

  return (
    <SongContainer>
      {isShowingDialogue && (
        <DialogueBox
          x={dialoguePosition.x}
          y={dialoguePosition.y}
          buttons={dialogueButtons}
          hideDialogue={() => setIsShowingDialogue(false)}
        />
      )}
      <SongCover
        src={
          songInfo.thumbnail ||
          "https://i.pinimg.com/originals/ee/87/15/ee871547fa4b959307a8776cd61aad6d.jpg"
        }
        onClick={handleClick}
        onContextMenu={showDialogueBox}
      />
      <BottomContainer>
        <InfoContainer>
          <SongTitle onClick={handleClick}>{songInfo.title}</SongTitle>
          <SongArtists>
            {songInfo.artistId.map((artist, index) => (
              <a key={artist._id}>
                {index > 0 ? ` ${artist.userName}` : artist.userName}
              </a>
            ))}
          </SongArtists>
        </InfoContainer>
        <Icon
          name="ellipsis"
          size="xSmall"
          id="dialogueButton"
          onClick={showDialogueBox}
        />
      </BottomContainer>
    </SongContainer>
  );
}

Song.propTypes = {
  songInfo: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Song;
