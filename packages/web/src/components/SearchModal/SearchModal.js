import React from "react";
import PropTypes from "prop-types";

import { Background, Modal } from "./style";

function SeacrhModal({ close }) {
  return (
    <>
      <Background onClick={close} />
      <Modal>
        <h2>Search:</h2>
        <input placeholder="Search..." />
        <button type="button">Go!</button>
      </Modal>
    </>
  );
}

SeacrhModal.propTypes = {
  close: PropTypes.func.isRequired,
};

export default SeacrhModal;
