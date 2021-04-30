import React from "react";
import PropTypes from "prop-types";

import { Container, DialogueButton, Background } from "./style";

function DialogueBox({ x, y, buttons, hideDialogue }) {
  return (
    <Background onClick={hideDialogue}>
      <Container x={x} y={y} numberOfButtons={Object.keys(buttons).length}>
        {Object.keys(buttons).map((key) => (
          <DialogueButton key={key} type="button" onClick={buttons[key]}>
            {key}
          </DialogueButton>
        ))}
      </Container>
    </Background>
  );
}
DialogueBox.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  buttons: PropTypes.object.isRequired,
  hideDialogue: PropTypes.func.isRequired,
};

export default DialogueBox;
