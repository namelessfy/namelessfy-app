import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";

import * as ROUTES from "../../routes";

import {
  setSearchInput,
  search,
  setSearchReference,
} from "../../redux/search/search-actions";
import { searchSelector } from "../../redux/search/search-selectors";

import { Background, Modal } from "./style";

function SearchModal({ close }) {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  function onClickHandler(e) {
    dispatch(setSearchInput(inputValue));
    if (location.pathname !== ROUTES.SEARCH) {
      history.push(ROUTES.SEARCH);
    }
    close();
  }

  function changeReference(e) {
    dispatch(setSearchReference(e.target.value));
  }

  return (
    <>
      <Background onClick={close} />
      <Modal>
        <h2>Search:</h2>
        <input
          placeholder="Search..."
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input placeholder="reference..." onChange={changeReference} />
        <button type="button" onClick={onClickHandler}>
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
