import React from "react";
import PropTypes from "prop-types";

import { Background, Modal } from "./style";

function SeacrhModal({ hideModal }) {
  return (
    <Background onClick={hideModal}>
      {" "}
      <Modal>
        <h2>Search:</h2>
        <input placeholder="Search..." />
      </Modal>
    </Background>
  );
}
SeacrhModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
};

export default SeacrhModal;
