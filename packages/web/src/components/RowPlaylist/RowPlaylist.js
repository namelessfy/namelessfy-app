import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";

import * as ROUTES from "../../routes";

import DialogueBox from "../DialogueBox";

import {
  setPlaylistInfo,
  deletePlaylist,
  deletePlaylistReset,
  dislikePlaylist,
  likePlaylist,
  editPlaylistReset,
} from "../../redux/playlist/playlist-actions";
import { deleteSongReset } from "../../redux/song/song-actions";

import { userSelector } from "../../redux/user/user-selectors";
import { playlistSelector } from "../../redux/playlist/playlist-selectors";

import { isIdInList } from "../../utils/utils";

import { PlaylistContainer, PlaylistTitle } from "./style";

function RowPlaylist({ info }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(userSelector);
  const { myPlaylists, playlistInfo } = useSelector(playlistSelector);
  const [isShowingDialogue, setIsShowingDialogue] = useState(false);
  const [dialoguePosition, setDialoguePosition] = useState({ x: 0, y: 0 });

  function showDialogueBox(e) {
    e.preventDefault();
    setDialoguePosition({ x: e.clientX, y: e.clientY });
    setIsShowingDialogue(true);
  }

  const likeFunction = isIdInList(info._id, myPlaylists)
    ? {
        "Unfollow Playlist": () => dispatch(dislikePlaylist(info._id)),
      }
    : {
        "Follow Playlist": () => dispatch(likePlaylist(info._id)),
      };

  const ownerFunction =
    currentUser._id === info.author
      ? {
          Edit: () => {
            dispatch(setPlaylistInfo(info));
            history.push(ROUTES.EDIT_PLAYLIST);
          },
          Delete: () => dispatch(deletePlaylist(info._id)),
        }
      : {
          ...likeFunction,
        };

  function handleClick() {
    dispatch(deleteSongReset());
    dispatch(editPlaylistReset());
    if (info._id !== playlistInfo._id) {
      dispatch(setPlaylistInfo(null));
    }
    history.push(`${ROUTES.PLAYLIST}/${info._id}`);
  }

  const dialogueButtons = {
    "View Playlist": handleClick,
    ...ownerFunction,
  };

  return (
    <PlaylistContainer
      src={
        info.thumbnail ||
        "https://i.pinimg.com/originals/ee/87/15/ee871547fa4b959307a8776cd61aad6d.jpg"
      }
      onClick={handleClick}
      onContextMenu={showDialogueBox}
    >
      {isShowingDialogue && (
        <DialogueBox
          x={dialoguePosition.x}
          y={dialoguePosition.y}
          buttons={dialogueButtons}
          hideDialogue={() => setIsShowingDialogue(false)}
        />
      )}
      <PlaylistTitle>{info.title}</PlaylistTitle>
    </PlaylistContainer>
  );
}

RowPlaylist.propTypes = {
  info: PropTypes.object.isRequired,
};

export default RowPlaylist;
