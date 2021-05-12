import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";

import * as ROUTES from "../../routes";

import {
  setSearchInput,
  search,
  setSearchReference,
} from "../../redux/search/search-actions";
import SearchModal from "../SearchModal";
import { searchSelector } from "../../redux/search/search-selectors";
import Menu from "../Menu";

import {
  NavbarContainer,
  MenuLogo,
  NamelessfyLogo,
  SearchBar,
  NavbarMobile,
  Icon,
} from "./style";

function Navbar() {
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 650px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-device-width: 650px)",
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

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

  function changeReference(e) {
    dispatch(setSearchReference(e.target.value));
  }

  return (
    <>
      {<Menu show={isMenuOpen} close={() => setIsMenuOpen(false)} />}
      {isDesktop && (
        <NavbarContainer>
          <ul>
            <Link to={ROUTES.HOME} onClick={closeAll}>
              <NamelessfyLogo />
            </Link>
            <SearchBar
              type="text"
              placeholder="Search..."
              onChange={onChangeHandler}
              size="25"
            />
            <SearchBar
              type="text"
              placeholder="reference..."
              onChange={changeReference}
              size="10"
            />
            <MenuLogo onClick={() => setIsMenuOpen(true)} />
          </ul>
        </NavbarContainer>
      )}
      {isMobile && (
        <>
          {isSearchOpen && <SearchModal close={() => setIsSearchOpen(false)} />}
          <NavbarMobile>
            <div>
              <Link to={ROUTES.HOME} onClick={closeAll}>
                <Icon name="home" />
              </Link>
              <Icon name="search" onClick={() => setIsSearchOpen(true)} />
              <Icon name="menu" onClick={toggleMenu} />
            </div>
          </NavbarMobile>
        </>
      )}
    </>
  );
}

export default Navbar;
