import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import { playlistSelector } from "../../redux/playlist/playlist-selectors";

import {
  addToPlaylist,
  setCacheSongId,
  addToPlaylistReset,
} from "../../redux/playlist/playlist-actions";

import * as ROUTES from "../../routes";

import {
  ModalBackground,
  Modal,
  ModalButton,
  ButtonContainer,
  ModalTitle,
  ModalScroll,
} from "./style";
import DialogueModal from "../Modal/Modal";
import { userSelector } from "../../redux/user/user-selectors";

function SelectPlaylistModal({ songId, closeModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(userSelector);
  const { myPlaylists, addToPlaylistSuccess } = useSelector(playlistSelector);
  const [isShowingConfirmPopUp, setIsShowingConfirmPopUp] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [isAddingRepeatTrack, setIsAddingRepeatTrack] = useState(false);

  useEffect(() => {
    if (addToPlaylistSuccess) {
      dispatch(addToPlaylistReset());
      closeModal();
    }
  }, [dispatch, addToPlaylistSuccess, closeModal]);

  function clickHandler(playlist) {
    const index = playlist.tracks.findIndex((track) => track === songId);
    if (index !== -1) {
      setIsAddingRepeatTrack(true);
    }
    setIsShowingConfirmPopUp(true);
    setCurrentPlaylist(playlist);
  }

  function clickBackground(e) {
    if (e.target.id === "songBackground") {
      closeModal();
    }
  }

  function handleNewPlaylist() {
    dispatch(setCacheSongId(songId));
    history.push(ROUTES.CREATE_PLAYLIST);
  }

  return isShowingConfirmPopUp ? (
    <DialogueModal
      text={
        isAddingRepeatTrack
          ? `This song already exists in ${currentPlaylist.title}. Do you want to add it again?`
          : `Add to playlist ${currentPlaylist.title}`
      }
      cancel={{ func: () => setIsShowingConfirmPopUp(false), title: "cancel" }}
      confirm={{
        func: () => dispatch(addToPlaylist(songId, currentPlaylist._id)),
        title: "confirm",
      }}
    />
  ) : (
    <ModalBackground id="songBackground" onClick={clickBackground}>
      <Modal>
        <ModalTitle>Choose your playlist:</ModalTitle>
        <ModalScroll>
          <ButtonContainer>
            <ModalButton
              type="button"
              key="newPlaylist"
              onClick={handleNewPlaylist}
              newPlaylist
            >
              Add to new playlist
            </ModalButton>
            {myPlaylists.map(
              (playlist) =>
                playlist.author === currentUser._id && (
                  <ModalButton
                    type="button"
                    key={playlist._id}
                    onClick={() => clickHandler(playlist)}
                  >
                    {playlist.title}
                  </ModalButton>
                ),
            )}
          </ButtonContainer>
        </ModalScroll>
      </Modal>
    </ModalBackground>
  );
}

SelectPlaylistModal.propTypes = {
  songId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default SelectPlaylistModal;
