import styled from "styled-components";
import * as colors from "../../styles/colors";

import menuIcon from "../../img/menu.svg";
import namelessfyIcon from "../../img/namelessfyLogo.svg";
import homeIcon from "../../img/home.svg";
import searchIcon from "../../img/search.svg";

const icons = {
  menu: menuIcon,
  namelessfy: namelessfyIcon,
  home: homeIcon,
  search: searchIcon,
};

const NavbarContainer = styled.div`
  color: ${colors.WHITE};
  width: min(85%, 1000px);
  margin: 1.5rem auto 0;

  & ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const MenuLogo = styled.div`
  background: url("${menuIcon}");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 42px;
  width: 42px;
  transition: opacity 0.2s ease-in-out;
  cursor: pointer;

  &:hover,
  &:focus {
    outline: none;
    opacity: 0.8;
  }
`;

const NamelessfyLogo = styled.button`
  background: url("${namelessfyIcon}");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 40px;
  width: 55px;
  transition: opacity 0.2s ease-in-out;
  cursor: pointer;

  &:hover,
  &:focus {
    outline: none;
    opacity: 0.8;
  }
`;

const SearchBar = styled.input`
  height: 35px;
  color: ${colors.DARK};
  background-color: ${colors.SMOOTH};
  box-shadow: inset 2px 2px 10px #000;
  border-radius: 50px;
  border: none;
  outline: none;
  margin: auto auto;
  padding: 0 2em;
  font-size: large;
  font-weight: 500;

  &::placeholder {
    color: ${colors.DARK};
    opacity: 0.8;
  }
`;

const iconWidth = 30; // px

const NavbarMobile = styled.div`
  color: ${colors.WHITE};
  background-color: ${colors.MAIN};
  position: absolute;
  bottom: 0;
  height: 70px;
  width: 100vw;
  margin: 0;
  box-shadow: 0 0 20px #0008;
  border-radius: 10px 10px 0 0;

  z-index: 5;

  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: calc(35px / 2);
    & > * {
      width: calc(100% / 3);
      top: calc(50% - 25px);
      left: calc(50% - 25px);
      height: ${iconWidth}px;
    }
    & > a > button {
      margin-left: calc(50% - 17.5px);
    }
    & > * + * {
      border-left: solid 1px white;
    }
  }
`;

const Icon = styled.button`
  background: url("${(props) => icons[props.name]}");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  transition: opacity 0.2s ease-in-out;
  cursor: pointer;
  min-width: ${iconWidth}px;
  min-height: ${iconWidth}px;

  &:hover,
  &:focus {
    outline: none;
    opacity: 0.8;
  }
`;

export {
  NavbarContainer,
  MenuLogo,
  NamelessfyLogo,
  SearchBar,
  NavbarMobile,
  Icon,
};
