import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import * as ROUTES from "../../routes";

import { setSearchInput } from "../../redux/search/search-actions";
import { searchSelector } from "../../redux/search/search-selectors";

import { Background, Modal } from "./style";
import { Icon } from "../../styles/mainStyles";

function SearchModal({ close, openDialogueBox }) {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const { searchReference } = useSelector(searchSelector);

  function onClickHandler(e) {
    dispatch(setSearchInput(inputValue));
    if (location.pathname !== ROUTES.SEARCH) {
      history.push(ROUTES.SEARCH);
    }
    close();
  }

  return (
    <>
      <Background onClick={close} />
      <Modal>
        <h2>Search:</h2>
        <div>
          <Icon name="filter" size="small" onClick={openDialogueBox} />
          <input
            type="text"
            placeholder={
              searchReference === null
                ? "Search all..."
                : `Search ${searchReference}s...`
            }
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <button type="button" onClick={onClickHandler}>
          Go!
        </button>
      </Modal>
    </>
  );
}

SearchModal.propTypes = {
  close: PropTypes.func.isRequired,
  openDialogueBox: PropTypes.func.isRequired,
};

export default SearchModal;
