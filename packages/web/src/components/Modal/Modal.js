import React from "react";
import PropTypes from "prop-types";

import { Background, Modal, Button } from "./style";

function DialogueModal({ text, confirm, cancel }) {
  return (
    <>
      <Background onClick={cancel.func}>
        <Modal>
          <h2>{text}</h2>
          <div>
            <Button type="button" onClick={confirm.func}>
              {confirm.title}
            </Button>
            <Button type="button" onClick={cancel.func} cancel>
              {cancel.title}
            </Button>
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
