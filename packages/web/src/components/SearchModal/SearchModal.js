import React from "react";
import PropTypes from "prop-types";

import { Background, Modal } from "./style";

function SearchModal({ close }) {
  return (
    <>
      <Background onClick={close} />
      <Modal>
        <h2>Search:</h2>
        <input
          placeholder="Search..."
          onChange={(e) => console.log(e.target.value)}
        />
        <button type="button" onClick=" ">
          Go!
        </button>
      </Modal>
    </>
  );
}

SearchModal.propTypes = {
  close: PropTypes.func.isRequired,
};

export default SearchModal;
