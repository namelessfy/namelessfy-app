import React from "react";
import PropTypes from "prop-types";

import { Background, Modal } from "./style";

function DialogueModal({ text, confirm, cancel }) {
  return (
    <>
      <Background onClick={cancel.func}>
        <Modal>
          <h2>{text}</h2>
          <div>
            <button type="button" onClick={confirm.func}>
              {confirm.title}
            </button>
            <button type="button" onClick={cancel.func}>
              {cancel.title}
            </button>
          </div>
        </Modal>
      </Background>
    </>
  );
}

DialogueModal.propTypes = {
  text: PropTypes.string.isRequired,
  confirm: PropTypes.object.isRequired,
  cancel: PropTypes.object.isRequired,
};

export default DialogueModal;
