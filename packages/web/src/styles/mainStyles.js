import styled from "styled-components";

import * as colors from "./colors";
import * as fonts from "./fonts";

import heartFull from "../img/heart-full.svg";
import heartEmpty from "../img/heart-empty.svg";
import play from "../img/play.svg";
import pause from "../img/pause.svg";
import next from "../img/next.svg";
import previous from "../img/previous.svg";
import random from "../img/random.svg";
import randomClicked from "../img/randomClicked.svg";
import list from "../img/list.svg";
import close from "../img/close.svg";
import ellipsis from "../img/ellipsis.svg";
import edit from "../img/edit.svg";
import toggleOn from "../img/toggle-on.svg";
import toggleOff from "../img/toggle-off.svg";
import grid from "../img/grid.svg";
import menu from "../img/menu.svg";
import filter from "../img/filter.svg";
import home from "../img/home.svg";
import search from "../img/search.svg";

const icons = {
  play,
  pause,
  heartEmpty,
  heartFull,
  next,
  previous,
  random,
  list,
  close,
  randomClicked,
  ellipsis,
  edit,
  toggleOn,
  toggleOff,
  grid,
  menu,
  filter,
  search,
  home,
};

const iconSizes = {
  s: {
    large: 30,
    normal: 24,
    small: 20,
    xSmall: 16,
  },
  m: {
    large: 36,
    normal: 30,
    small: 24,
    xSmall: 20,
  },
  l: {
    large: 48,
    normal: 36,
    small: 30,
    xSmall: 24,
  },
};

const Main = styled.main`
  background: linear-gradient(
    to bottom right,
    ${colors.MAIN} 0%,
    ${colors.DARK} 100%
  );
  background-size: cover;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  font-family: ${fonts.MAIN}, sans-serif;
  margin: 0;
  position: relative;
  padding: 0;
  overflow-x: hidden;

  ${({ marginBottom }) =>
    marginBottom &&
    `padding-bottom: 100px; @media (max-width: 650px) {
    padding-bottom: 160px;
    padding-top: 0;
  }`}
  padding-bottom: 100px;
  color: ${colors.WHITE};

  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.SMOOTH};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.LIGHT};
  }

  @media (min-width: 1024px) {
    ::-webkit-scrollbar {
      width: 7px;
    }
  }
`;

const Icon = styled.button`
  width: ${({ size }) => iconSizes.l[size]}px;
  height: ${({ size }) => iconSizes.l[size]}px;
  background: url(${({ name }) => icons[name]});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  ${({ disabled }) => disabled && "pointer-events: none;"}
  &:hover,
  &:focus {
    outline: none;
    opacity: 0.8;
  }

  @media (max-width: 480px) {
    width: ${({ size }) => iconSizes.m[size]}px;
    height: ${({ size }) => iconSizes.m[size]}px;
  }

  @media (max-width: 320px) {
    width: ${({ size, card }) =>
      card ? iconSizes.s[size] : iconSizes.m[size]}px;
    height: ${({ size, card }) =>
      card ? iconSizes.s[size] : iconSizes.m[size]}px;
  }
`;

export { Main, Icon };
