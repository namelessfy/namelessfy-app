import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { signOut } from "../../redux/auth/auth-actions";

import { Background } from "./style";
import { Button } from "../../styles/formStyles";

function SeacrhModal({ show, close }) {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <>
      <Background isShowing={show}>
        <h2>Menu:</h2>
        <Button type="button" onClick={close}>
          close
        </Button>
        <br />
        <Button type="button" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Background>
    </>
  );
}

SeacrhModal.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default SeacrhModal;