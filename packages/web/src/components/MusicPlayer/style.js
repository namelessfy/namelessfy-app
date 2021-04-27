import styled, { keyframes } from "styled-components";
import close from "../../img/close.svg";
import * as colors from "../../styles/colors";
import { MAIN as mainFont } from "../../styles/fonts";

const modalWidth = {
  xBig: 450,
  big: 440,
  medium: 380,
  small: 320,
  xSmall: 250,
};

const backgroundIn = keyframes`
  0% {
    opacity: 0;
    top: 90vh;
    height: 10vh;
    background-color: #0000;
  }

  50%{
    opacity: 1;
    background-color: #0000;
  }

  100% {
    opacity: 1;
    top: 0;
    height: 100vh;
    background-color: #0004;
  }
`;
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
  animation: ${backgroundIn} 0.5s ease-out;
  overflow: hidden;
  color: ${colors.WHITE};
  font-family: ${mainFont};
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
  }

  @media (max-width: 480px) {
    width: ${modalWidth.medium}px;
  }

  @media (max-width: 400px) {
    width: ${modalWidth.small}px;
  }

  @media (max-width: 320px) {
    width: ${modalWidth.xSmall}px;
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
  color: ${colors.WHITE};
  font-family: ${mainFont};

  @media (min-width: 1000px) {
    left: calc(50vw - 500px);
  }

  @media (max-width: 750px) {
    padding: 0 3rem;
  }

  @media (max-width: 650px) {
    height: 155px;
    padding-bottom: 75px;
  }

  @media (max-width: 650px) {
    padding: 0 2rem 75px;
  }

  @media (max-width: 320px) {
    height: 140px;
    padding: 0 2rem 75px;
  } ;
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

      @media (max-width: 1000px) {
        min-width: 350px;
        width: auto;
      }
      @media (max-width: 600px) {
        min-width: 0;
        width: calc(100% - 200px);
      }

      @media (max-width: 480px) {
        min-width: 0;
        width: calc(100% - 150px);
      }

      @media (max-width: 420px) {
        min-width: 0;
        width: calc(100% - 80px);
      }

      @media (max-width: 350px) {
        min-width: 0;
        width: calc(100% - 50px);
      }
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

    return `
    width: 300px;
    @media (max-width: 850px) {
      width: 240px;
      &>.songButtonsList{
        display: none;
      }
    };
    @media (max-width: 700px) {
      width: 200px;
      &>.songButtonsRandom{
        display: none;
      }
    };

    @media (max-width: 480px) {
      width: 150px;
    };

    @media (max-width: 480px) {
      width: 80px;
      &>.songButtonsPrevious{
        display: none;
      }
    };

    @media (max-width: 350px) {
      width: 50px;
      &>.songButtonsNext{
        display: none;
      }
    };

    `;
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
        width: 120px;
        text-align: right;
  
        @media (max-width: 1000px) {
          display: none;
        }`;
  }}
`;

const Close = styled.button`
  width: 24px;
  height: 24px;
  background: url(${close}),
    radial-gradient(circle, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 90%);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  position: absolute;
  right: 1rem;
  top: 1rem;
  border-radius: 50%;

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

  @media (max-width: 650px) {
    display: none;
  } ;
`;

export {
  SongPalyerCard,
  Thumbnail,
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
