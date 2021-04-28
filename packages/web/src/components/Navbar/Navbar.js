import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import * as ROUTES from "../../routes";

import SeacrhModal from "../SearchModal";
import Menu from "../Menu";

import {
  NavbarContainer,
  MenuLogo,
  NamelessfyLogo,
  SearchBar,
  NavbarMobile,
  Icon,
} from "./style";

import { AddInput, Button } from "../../styles/formStyles";

function Navbar() {
  const isDesktop = useMediaQuery({
    query: "(min-device-width: 650px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-device-width: 650px)",
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  };

  return (
    <>
      {<Menu show={isMenuOpen} close={() => setIsMenuOpen(false)} />}
      {isDesktop && (
        <NavbarContainer>
          <ul>
            <Link to={ROUTES.HOME} onClick={closeAll}>
              <NamelessfyLogo />
            </Link>
            <SearchBar placeholder="Search..." />
            <MenuLogo onClick={() => setIsMenuOpen(true)} />
          </ul>
        </NavbarContainer>
      )}
      {isMobile && (
        <>
          {isSearchOpen && <SeacrhModal close={() => setIsSearchOpen(false)} />}
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
