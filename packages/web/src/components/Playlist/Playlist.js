import React, { useState } from "react";
import PropTypes from "prop-types";

import DialogueBox from "../DialogueBox";

import {
  PlaylistCover,
  PlaylistTitle,
  PlaylistContainer,
  BottomContainer,
  InfoContainer,
} from "./style";

import { Icon } from "../../styles/mainStyles";

function Playlist({ playlistInfo, handleClick }) {
  const [isShowingDialogue, setIsShowingDialogue] = useState(false);
  const [dialoguePosition, setDialoguePosition] = useState({ x: 0, y: 0 });

  function showDialogueBox(e) {
    e.preventDefault();
    setDialoguePosition({ x: e.clientX, y: e.clientY });
    setIsShowingDialogue(true);
  }

  const likeFunction = {};

  const ownerFunction = {
    Edit: () => {},
    Delete: () => {},
  };

  const dialogueButtons = {
    Play: handleClick,
    ...likeFunction,
    ...ownerFunction,
  };

  return (
    <PlaylistContainer>
      {isShowingDialogue && (
        <DialogueBox
          x={dialoguePosition.x}
          y={dialoguePosition.y}
          buttons={dialogueButtons}
          hideDialogue={() => setIsShowingDialogue(false)}
        />
      )}
      <PlaylistCover
        src={
          playlistInfo.thumbnail ||
          "https://i.pinimg.com/originals/ee/87/15/ee871547fa4b959307a8776cd61aad6d.jpg"
        }
        onClick={handleClick}
        onContextMenu={showDialogueBox}
      />
      <BottomContainer>
        <InfoContainer>
          <PlaylistTitle onClick={handleClick}>
            {playlistInfo.title}
          </PlaylistTitle>
        </InfoContainer>
        <Icon
          name="ellipsis"
          size="xSmall"
          id="dialogueButton"
          onClick={showDialogueBox}
        />
      </BottomContainer>
    </PlaylistContainer>
  );
}

Playlist.propTypes = {
  playlistInfo: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Playlist;
