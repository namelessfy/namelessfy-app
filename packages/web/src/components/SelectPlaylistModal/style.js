import styled, { keyframes } from "styled-components";
import * as colors from "../../styles/colors";

const animatedModal = keyframes`
    0% {opacity: 0;}
    100% {opacity: 1;}

`;

const ModalBackground = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #0004;
  z-index: 10;
  animation: ${animatedModal} 0.5 ease-in-out;
`;

const ModalHeight = 500;
const ModalWidth = "min(500px, 80vw)";

const Modal = styled.div`
  position: relative;
  width: ${ModalWidth};
  max-height: ${ModalHeight}px;
  z-index: 0;
  background-color: ${colors.DARK};
  border-radius: 10px;
  box-shadow: 2px 2px 5px #000;
  animation: ${animatedModal} 0.5 ease-in-out;
`;

const ModalButton = styled.button`
  width: 100%;
  height: ${ModalHeight / 8}px;
  background-color: transparent;
  align-text: center;
  border-bottom: 2px solid ${colors.MAIN};
  font-weight: 200;
  &:last-of-type {
    border: none;
  }

  &:hover,
  &:focus {
    outline: none;
    background-color: ${colors.MAIN};
    color: ${colors.WHITE};
  }
  ${({ newPlaylist }) =>
    newPlaylist &&
    `
    background-color: ${colors.NEUTRAL};
    font-weight: 400;
    font-size: large;
    color: ${colors.WHITE};
  `};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ModalScroll = styled.div`
  width: 100%;
  height: calc(100% - 100px);
  overflow: hidden;
  overflow-y: auto;
  margin-top: 100px;
  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.SMOOTH};
    border-radius: 10px;
    margin: 10px 0px;
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

const ModalTitle = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${ModalWidth};
  height: 100px;
  box-shadow: 2px 2px 5px #0008;
  background-color: ${colors.MAIN};
  border-radius: 10px;
`;

export {
  ModalBackground,
  Modal,
  ModalButton,
  ButtonContainer,
  ModalTitle,
  ModalScroll,
};
