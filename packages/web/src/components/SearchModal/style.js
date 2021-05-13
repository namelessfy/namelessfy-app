import styled, { keyframes } from "styled-components";
import * as colors from "../../styles/colors";

const modalIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
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
  z-index: 10;
  animation: ${modalIn} 0.5s ease-in-out;
`;

const modalHeight = 200; /* px */
const modalWidth = 80; /* % */
const buttonWidth = 100; // px

const Modal = styled.div`
  position: absolute;
  width: ${modalWidth}%;
  height: ${modalHeight}px;
  background-color: ${colors.MAIN};
  border-radius: 10px;
  box-shadow: 2px 2px 5px #000;
  color: ${colors.WHITE};
  z-index: 11;
  top: calc(40% - ${modalHeight / 2}px);
  left: calc(50% - ${modalWidth / 2}%);
  animation: ${modalIn} 0.5s ease-in-out;

  & h2 {
    font-size: larger;
    margin: 1.5rem 10% 1rem;
  }

  & > div {
    display: flex;
    width: 80%;
    margin: 0 10%;
    justify-content: space-between;
    align-items: center;

    & input {
      width: calc(100% - 30px);
      height: 35px;
      color: ${colors.DARK};
      background-color: ${colors.WHITE};
      box-shadow: inset 2px 2px 10px #000;
      border-radius: 10px;
      border: 2px solid ${colors.MAIN};
      outline: none;
      padding: 0 1em;
      font-size: large;
      font-weight: 500;
      overflow: hidden;

      &::placeholder {
        color: ${colors.DARK};
        opacity: 0.8;
      }

      &:focus,
      &:hover {
        outline: none;
        box-shadow: inset 2px 2px 5px #000;
        border: 2px solid ${colors.WHITE};
      }
    }
  }

  & > button {
    background-color: ${colors.NEUTRAL};
    margin: 2em calc(50% - ${buttonWidth / 2}px) 1em;
    padding: 0.2em 0;
    border-radius: 10px;
    box-shadow: 2px 2px 5px #0008;
    position: relative;
    align-self: center;
    transition: width 0.2s ease-in-out, margin 0.2s ease-in-out;
    font-family: Poppins, sans-serif;
    width: ${buttonWidth}px;
    font-size: 18px;

    &::after {
      content: "";
      position: absolute;
      display: block;
      height: 100%;
      width: 100%;
      border-radius: 10px;
      top: 0;
      left: 0;
      box-shadow: 0 0 0 2px ${colors.WHITE};
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    &:hover,
    &:focus {
      outline: none;
      margin: 2em calc(50% - ${(buttonWidth * 1.2) / 2}px) 1em;
      width: ${buttonWidth * 1.2}px;
      &::after {
        opacity: 1;
      }
    }
  }
`;

export { Background, Modal };
