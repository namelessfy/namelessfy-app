import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import * as ROUTES from "../../routes";

import SeacrhModal from "../SearchModal";

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

  const [isShowingSeacrhModal, setIsShowingSeacrhModal] = useState(false);

  const handelSearchClick = () => {
    setIsShowingSeacrhModal(true);
  };

  const handelHideSearch = () => {
    setIsShowingSeacrhModal(false);
  };

  return (
    <>
      {isDesktop && (
        <NavbarContainer>
          <ul>
            <Link to={ROUTES.HOME}>
              <NamelessfyLogo />
            </Link>
            <SearchBar placeholder="Search..." />
            <MenuLogo />
          </ul>
        </NavbarContainer>
      )}
      {isMobile && (
        <>
          {isShowingSeacrhModal && <SeacrhModal hideModal={handelHideSearch} />}
          <NavbarMobile>
            <div>
              <Link to={ROUTES.HOME}>
                <Icon name="home" />
              </Link>
              <Icon name="search" onClick={handelSearchClick} />
              <Icon name="menu" />
            </div>
          </NavbarMobile>
        </>
      )}
    </>
  );
}

export default Navbar;
