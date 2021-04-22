import styled from "styled-components";
import heartFull from "../../img/heart-full.svg";
import heartEmpty from "../../img/heart-empty.svg";
import play from "../../img/play.svg";
import pause from "../../img/pause.svg";
import next from "../../img/next.svg";
import previous from "../../img/previous.svg";
import random from "../../img/random.svg";
import list from "../../img/list.svg";
import close from "../../img/close.svg";
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
  close,
};
const modalWidth = {
  xBig: 450,
  big: 440,
  medium: 380,
  small: 320,
  xSmall: 250,
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
const Background = styled.section`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #0004;
  top: 0;
  left: 0;
  z-index: 10;
`;

const SongPalyerCard = styled.section`
  width: ${modalWidth.xBig}px;
  height: fit-content;
  background-color: ${colors.MAIN};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 10px #0008;
  z-index: 11;
  position: relative;

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

const SongPalyer = styled.section`
  width: min(100%, 1000px);
  height: 80px;
  background-color: ${colors.MAIN};
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 2px 2px 10px #0008;
  z-index: 4;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0 5rem;

  @media (min-width: 1000px) {
    left: calc(50vw - 500px);
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

const Icon = styled.button`
  width: ${({ size }) => iconSizes.l[size]}px;
  height: ${({ size }) => iconSizes.l[size]}px;
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

  @media (max-width: 480px) {
    width: ${({ size }) => iconSizes.m[size]}px;
    height: ${({ size }) => iconSizes.m[size]}px;
  }

  @media (max-width: 320px) {
    width: ${({ size }) => iconSizes.s[size]}px;
    height: ${({ size }) => iconSizes.s[size]}px;
  }
`;

const SongInfo = styled.div`
  display: flex;

  ${({ card }) => {
    if (card) {
      return `display: flex;
      justify-content: space-between;
      align-items: center;
      width: 85%;
      margin: 0.5rem auto 1rem;
    
      & > div {
        max-width: calc(100% - 50px);
      }`;
    }

    return `
      cursor: pointer;
      width: 350px;
      justify-content: left;
      flex-direction: column;
    `;
  }}
`;

const SongTitle = styled.h2`
  font-size: larger;
  cursor: pointer;
  margin-bottom: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ card }) => {
    if (card) {
      return `& > a:hover,
      & > a:focus {
        outline: none;
        text-decoration: underline;
      }`;
    }
    return `
    pointer-events: none;
    &:hover,
      &:focus {
        outline: none;
        text-decoration: underline;
      }`;
  }}

  @media (max-width: 480px) {
    font-size: large;
  }

  @media (max-width: 320px) {
    font-size: medium;
  }
`;

const Artists = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ card }) => {
    if (card) {
      return `& > a {
        color: ${colors.LIGHT};
        cursor: pointer;
        margin-top: 0.5em;
    
        @media (max-width: 480px) {
          font-size: medium;
        }
    
        @media (max-width: 320px) {
          font-size: small;
        }
    
        &:hover,
        &:focus {
          outline: none;
          text-decoration: underline;
        }
      }
    
      & a:not(:last-child):after {
        content: ",";
        color: ${colors.WHITE};
      }`;
    }

    return `
    pointer-events: none;
    & > span {
      color: ${colors.LIGHT};
      cursor: pointer;
      margin-top: 0.5em;
      pointer-events: none;
  
      @media (max-width: 480px) {
        font-size: medium;
      }
  
      @media (max-width: 320px) {
        font-size: small;
      }
  
      &:hover,
      &:focus {
        outline: none;
        text-decoration: underline;
      }
    }
  
    & span:not(:last-child):after {
      content: ",";
      color: ${colors.WHITE};
    }`;
  }}
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  ${({ card }) => {
    if (card) {
      return `width: 80%;
      margin: 1rem auto;`;
    }

    return `width: 300px;`;
  }}}
`;

const Slider = styled.input`
  width: 80%;
  margin: 1rem auto 2rem;
  appearance: none;
  height: 6px;
  background: ${colors.LIGHT};
  outline: none;
  box-shadow: inset 1px 1px 4px 0px #000;
  border-radius: 5px;
  &:hover,
  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 15px;
    height: 15px;
    background: ${colors.NEUTRAL};
    cursor: pointer;
    box-shadow: 2px 2px 10px #0008;
    border-radius: 50%;
    transition: all 0.2s;

    &:hover,
    &:focus {
      width: 20px;
      height: 20px;
    }
  }

  &::-moz-range-thumb {
  }
`;

const Timer = styled.span`
  ${({ card }) => {
    if (card) {
      return `
        margin: 1rem auto 0;
        font-size: medium;
  
        @media (max-width: 320px) {
          font-size: small;
        }`;
    }

    return `
        margin: 0;
        font-size: large;
  
        @media (max-width: 320px) {
          font-size: medium;
        }`;
  }}
`;

const Close = styled.button`
  width: 24px;
  height: 24px;
  background: url(${icons.close});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  position: absolute;
  right: 1rem;
  top: 1rem;
  &:hover,
  &:focus {
    outline: none;
    opacity: 0.8;
  }
`;

const LikeBackground = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 0 2rem 0 0;
`;

export {
  SongPalyerCard,
  Thumbnail,
  Icon,
  Buttons,
  SongInfo,
  SongTitle,
  Artists,
  Slider,
  Timer,
  Background,
  Close,
  SongPalyer,
  LikeBackground,
};
