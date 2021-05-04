import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { playlistSelector } from "../../redux/playlist/playlist-selectors";
import {
  ModalBackground,
  Modal,
  ModalButton,
  ButtonContainer,
  ModalTitle,
  ModalScroll,
} from "./style";

function SelectPlaylistModal({ songId, closeModal }) {
  const { myPlaylists } = useSelector(playlistSelector);
  function clickHandler(playlistId) {
    console.log(playlistId);
    closeModal();
  }

  function clickBackground(e) {
    if (e.target.id === "songBackground") {
      closeModal();
    }
  }

  return (
    <ModalBackground id="songBackground" onClick={clickBackground}>
      <Modal>
        <ModalTitle>Choose your playlist:</ModalTitle>
        <ModalScroll>
          <ButtonContainer>
            {myPlaylists.map((playlist) => (
              <ModalButton
                type="button"
                key={playlist._id}
                onClick={() => clickHandler(playlist._id)}
              >
                {playlist.title}
              </ModalButton>
            ))}
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
