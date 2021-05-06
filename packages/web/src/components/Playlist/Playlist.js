import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import * as ROUTES from "../../routes";

import DialogueBox from "../DialogueBox";

import {
  PlaylistCover,
  PlaylistTitle,
  PlaylistContainer,
  BottomContainer,
  InfoContainer,
} from "./style";

import { Icon } from "../../styles/mainStyles";
import { setPlaylisInfo } from "../../redux/playlist/playlist-actions";

function Playlist({ playlistInfo }) {
  const dispatch = useDispatch();
  const history = useHistory();
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

  function handleClick() {
    console.log(playlistInfo);
    dispatch(setPlaylisInfo(playlistInfo));
    history.push(ROUTES.PLAYLIST);
  }

  const dialogueButtons = {
    "View Playlist": handleClick,
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
};

export default Playlist;
