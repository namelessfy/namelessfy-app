import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { Link, useHistory } from "react-router-dom";

import * as ROUTES from "../../routes";

import DialogueBox from "../DialogueBox";
import SelectPlaylistModal from "../SelectPlaylistModal/index";

import {
  SongCover,
  SongTitle,
  SongArtists,
  SongContainer,
  BottomContainer,
  InfoContainer,
} from "./style";

import { Icon } from "../../styles/mainStyles";
import {
  dislikeSong,
  likeSong,
  deleteSong,
} from "../../redux/song/song-actions";
import { isIdInList } from "../../utils/utils";
import { songSelector } from "../../redux/song/song-selectors";
import { userSelector } from "../../redux/user/user-selectors";
import { playerSelector } from "../../redux/musicPlayer/player-selectors";
import {
  addSongToPreQueue,
  resetCurrentSongDeleted,
} from "../../redux/musicPlayer/player-actions";

function Song({ songInfo, handleClick, contextFunctions, isMenu }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentSong } = useSelector(playerSelector);
  const { favorites } = useSelector(songSelector);
  const { currentUser } = useSelector(userSelector);
  const [isShowingDialogue, setIsShowingDialogue] = useState(false);
  const [dialoguePosition, setDialoguePosition] = useState({ x: 0, y: 0 });
  const [isShowingModal, setIsShowingModal] = useState(false);

  function showDialogueBox(e) {
    e.preventDefault();
    setDialoguePosition({ x: e.clientX, y: e.clientY });
    setIsShowingDialogue(true);
  }

  const likeFunction = isIdInList(songInfo._id, favorites)
    ? { Dislike: () => dispatch(dislikeSong(songInfo._id)) }
    : { Like: () => dispatch(likeSong(songInfo._id)) };

  const ownerFunction = isIdInList(currentUser._id, songInfo?.artistId)
    ? {
        Edit: () => history.push(`${ROUTES.EDIT_SONG}/${songInfo._id}`),
        Delete: () => dispatch(deleteSong(songInfo._id)),
      }
    : "";

  const playFunction =
    songInfo._id === currentSong?._id ? "" : { Play: handleClick };

  const dialogueButtons = {
    ...playFunction,
    ...likeFunction,
    "Add to playlist": () => setIsShowingModal(true),
    ...ownerFunction,
    "Add to Queue": () => dispatch(addSongToPreQueue(songInfo)),
    ...contextFunctions,
  };

  function playSong() {
    dispatch(resetCurrentSongDeleted());
    handleClick();
  }

  return (
    <>
      <SongContainer isMenu={isMenu}>
        {isShowingModal && !isMenu && (
          <SelectPlaylistModal
            songId={songInfo._id}
            closeModal={() => setIsShowingModal(false)}
          />
        )}
        {isShowingDialogue && !isMenu && (
          <DialogueBox
            x={dialoguePosition.x}
            y={dialoguePosition.y}
            buttons={dialogueButtons}
            hideDialogue={() => setIsShowingDialogue(false)}
          />
        )}
        {!isMenu ? (
          <SongCover
            src={
              songInfo.thumbnail ||
              "https://i.pinimg.com/originals/ee/87/15/ee871547fa4b959307a8776cd61aad6d.jpg"
            }
            onClick={playSong}
            onContextMenu={showDialogueBox}
          />
        ) : (
          <SongCover
            src={
              songInfo.thumbnail ||
              "https://i.pinimg.com/originals/ee/87/15/ee871547fa4b959307a8776cd61aad6d.jpg"
            }
            onClick={playSong}
            isMenu
          />
        )}

        <BottomContainer isMenu={isMenu}>
          <InfoContainer isMenu={isMenu}>
            <SongTitle onClick={playSong} isMenu={isMenu}>
              {songInfo.title}
            </SongTitle>
            <SongArtists isMenu={isMenu}>
              {songInfo.artistId.map((artist, index) => (
                <Link
                  key={artist._id}
                  to={`${ROUTES.USER_PAGE}/${artist.userName}`}
                >
                  {index > 0 ? ` ${artist.userName}` : artist.userName}
                </Link>
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
    </>
  );
}

Song.propTypes = {
  songInfo: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  contextFunctions: PropTypes.object,
  isMenu: PropTypes.bool,
};

Song.defaultProps = { contextFunctions: null, isMenu: false };

export default Song;
