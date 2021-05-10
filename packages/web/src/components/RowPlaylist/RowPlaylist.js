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

function RowPlaylist({ playlistInfo }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(userSelector);
  const { deletePlaylistSuccess, myPlaylists } = useSelector(playlistSelector);
  const [isShowingDialogue, setIsShowingDialogue] = useState(false);
  const [dialoguePosition, setDialoguePosition] = useState({ x: 0, y: 0 });

  function showDialogueBox(e) {
    e.preventDefault();
    setDialoguePosition({ x: e.clientX, y: e.clientY });
    setIsShowingDialogue(true);
  }

  useEffect(() => {
    if (deletePlaylistSuccess) {
      dispatch(deletePlaylistReset());
      history.push(ROUTES.USER_PAGE);
    }
  }, [deletePlaylistSuccess]);

  const likeFunction = isIdInList(playlistInfo._id, myPlaylists)
    ? {
        "Unfollow Playlist": () => dispatch(dislikePlaylist(playlistInfo._id)),
      }
    : {
        "Follow Playlist": () => dispatch(likePlaylist(playlistInfo._id)),
      };

  const ownerFunction =
    currentUser._id === playlistInfo.author
      ? {
          Edit: () => {
            dispatch(setPlaylistInfo(playlistInfo));
            history.push(ROUTES.EDIT_PLAYLIST);
          },
          Delete: () => dispatch(deletePlaylist(playlistInfo._id)),
        }
      : {
          ...likeFunction,
        };

  function handleClick() {
    dispatch(deleteSongReset());
    dispatch(editPlaylistReset());
    dispatch(setPlaylistInfo(null));
    history.push(`${ROUTES.PLAYLIST}/${playlistInfo._id}`);
  }

  const dialogueButtons = {
    "View Playlist": handleClick,
    ...ownerFunction,
  };

  return (
    <PlaylistContainer
      src={
        playlistInfo.thumbnail ||
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
      <PlaylistTitle>{playlistInfo.title}</PlaylistTitle>
    </PlaylistContainer>
  );
}

RowPlaylist.propTypes = {
  playlistInfo: PropTypes.object.isRequired,
};

export default RowPlaylist;
