import styled from "styled-components";
import heartFull from "../../img/heart-full.svg";
import heartEmpty from "../../img/heart-empty.svg";
import play from "../../img/play.svg";
import pause from "../../img/pause.svg";
import next from "../../img/next.svg";
import previous from "../../img/previous.svg";
import random from "../../img/random.svg";
import list from "../../img/list.svg";
import * as colors from "../../styles/colors";

const icons = {
  play,
  pause,
  heartEmpty,
  heartFull,
  next,
  previous,
  random,
  list,
};
const modalWidth = {
  xBig: 500,
  big: 440,
  medium: 380,
  small: 320,
  xSmall: 250,
};
const iconSizes = {
  xLarge: 32,
  large: 30,
  normal: 28,
  small: 26,
  xSmall: 24,
};

const SongPalyerCard = styled.section`
  width: ${modalWidth.xBig}px;
  height: 700px;
  background-color: ${colors.MAIN};
  position: absolute;
  top: calc(50vh - 350px);
  left: calc(50vw - ${modalWidth.xBig / 2}px);
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  @media (max-width: 560px) {
    width: ${modalWidth.big}px;
    left: calc(50vw - ${modalWidth.big / 2}px);
  }

  @media (max-width: 480px) {
    width: ${modalWidth.medium}px;
    left: calc(50vw - ${modalWidth.medium / 2}px);
  }

  @media (max-width: 400px) {
    width: ${modalWidth.small}px;
    left: calc(50vw - ${modalWidth.small / 2}px);
  }

  @media (max-width: 320px) {
    width: ${modalWidth.xSmall}px;
    left: calc(50vw - ${modalWidth.xSmall / 2}px);
  }
`;

const Thumbnail = styled.div`
  width: 100%;
  height: ${modalWidth.xBig}px;
  border-radius: 10px;
  background: url(${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 560px) {
    height: ${modalWidth.big}px;
  }

  @media (max-width: 480px) {
    height: ${modalWidth.medium}px;
  }

  @media (max-width: 400px) {
    height: ${modalWidth.small}px;
  }

  @media (max-width: 320px) {
    height: ${modalWidth.xSmall}px;
  }
`;

const Icon = styled.div`
  width: 32px;
  height: 32px;
  background: url(${({ name }) => icons[name]});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  &:hover,
  &:focus {
    outline: none;
    opacity: 0.8;
  }
`;

const SongInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0.5rem auto 1rem;
`;

const SongTitle = styled.h2`
  font-size: larger;
  cursor: pointer;
  & > a:hover,
  & > a:focus {
    outline: none;
    text-decoration: underline;
  }
`;

const Artists = styled.div`
  & > a {
    color: ${colors.LIGHT};
    cursor: pointer;

    &:hover,
    &:focus {
      outline: none;
      text-decoration: underline;
    }
  }

  & a:not(:last-child):after {
    content: ",";
    color: ${colors.WHITE};
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
  margin: 1rem auto;
`;

export {
  SongPalyerCard,
  Thumbnail,
  Icon,
  Buttons,
  SongInfo,
  SongTitle,
  Artists,
};
