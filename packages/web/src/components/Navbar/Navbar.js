import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation, useHistory } from "react-router-dom";

import * as ROUTES from "../../routes";

import SearchModal from "../SearchModal";
import Menu from "../Menu";
import DialogueBox from "../DialogueBox";

import {
  setSearchInput,
  setSearchReference,
} from "../../redux/search/search-actions";
import { searchSelector } from "../../redux/search/search-selectors";

import {
  NavbarContainer,
  MenuLogo,
  NamelessfyLogo,
  SearchBar,
  NavbarMobile,
  SearchContainer,
} from "./style";
import { Icon } from "../../styles/mainStyles";

function Navbar() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShowingDialogue, setIsShowingDialogue] = useState(false);
  const [dialoguePosition, setDialoguePosition] = useState({ x: 0, y: 0 });

  const { searchReference } = useSelector(searchSelector);

  const isDesktop = useMediaQuery({
    query: "(min-device-width: 650px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-device-width: 650px)",
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  };

  function onChangeHandler(e) {
    if (location.pathname !== ROUTES.SEARCH) {
      history.push(ROUTES.SEARCH);
    }
    dispatch(setSearchInput(e.target.value));
  }

  function showDialogueBox(e) {
    e.preventDefault();
    setDialoguePosition({ x: e.clientX, y: e.clientY });
    setIsShowingDialogue(true);
  }

  const dialogueButtons = {
    All: () => dispatch(setSearchReference(null)),
    Users: () => dispatch(setSearchReference("user")),
    Tracks: () => dispatch(setSearchReference("track")),
    Playlists: () => dispatch(setSearchReference("playlist")),
    Genres: () => dispatch(setSearchReference("genre")),
  };

  return (
    <>
      {<Menu show={isMenuOpen} close={() => setIsMenuOpen(false)} />}
      {isShowingDialogue && (
        <DialogueBox
          x={dialoguePosition.x}
          y={dialoguePosition.y}
          buttons={dialogueButtons}
          hideDialogue={() => setIsShowingDialogue(false)}
        />
      )}
      {isDesktop && (
        <NavbarContainer>
          <ul>
            <Link to={ROUTES.HOME} onClick={closeAll}>
              <NamelessfyLogo />
            </Link>
            <SearchContainer>
              <Icon name="filter" size="small" onClick={showDialogueBox} />
              <div>
                <SearchBar
                  type="text"
                  placeholder={
                    searchReference === null
                      ? "Search all..."
                      : `Search ${searchReference}s...`
                  }
                  onChange={onChangeHandler}
                  size="25"
                />
              </div>
            </SearchContainer>

            <MenuLogo onClick={() => setIsMenuOpen(true)} />
          </ul>
        </NavbarContainer>
      )}
      {isMobile && (
        <>
          {isSearchOpen && (
            <SearchModal
              openDialogueBox={showDialogueBox}
              close={() => setIsSearchOpen(false)}
            />
          )}
          <NavbarMobile>
            <div>
              <Link to={ROUTES.HOME} onClick={closeAll}>
                <Icon name="home" size="normal" />
              </Link>
              <Icon
                name="search"
                size="normal"
                onClick={() => setIsSearchOpen(true)}
              />
              <Icon name="menu" size="normal" onClick={toggleMenu} />
            </div>
          </NavbarMobile>
        </>
      )}
    </>
  );
}

export default Navbar;
