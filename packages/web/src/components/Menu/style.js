import styled from "styled-components";
import * as colors from "../../styles/colors";

const Back = styled.section`
  color: ${colors.WHITE};
  @media (min-width: 650px) {
    position: fixed;
    height: 100vh;
    right: 0;
    top: 0;
    background-color: #0004;
    ${({ isShowing }) =>
      isShowing
        ? `
      opacity: 1;
      width: 100vw;
      z-index: 13;
      transition: all 0.5s ease-in-out, z-index 0s ease-in-out;
  `
        : `opacity: 0; 
      width: 10vw; 
      z-index: -1; 
      transition: all 0.5s ease-in-out, z-index 0s ease-in-out 0.5s;`}
  }
`;

const Background = styled.section`
  position: absolute;
  height: 100vh;
  background: linear-gradient(
    to bottom right,
    ${colors.MAIN} 0%,
    ${colors.DARK} 100%
  );
  right: 0;
  transition: all 0.5s ease-in-out, z-index 0s ease-in-out 0.5s;
  overflow-x: hidden;

  ${({ isShowing }) =>
    isShowing
      ? `
      opacity: 1;
      width: 100vw;
      z-index: 5;
      transition: all 0.5s ease-in-out, z-index 0s ease-in-out;
  `
      : `opacity: 0; width: 10vw; 
      z-index: -1; 
      transition: all 0.5s ease-in-out, z-index 0s ease-in-out 0.5s;`}

  @media (min-width: 650px) {
    box-shadow: 2px 2px 15px #0008;
    border-radius: 10px 0 0 10px;

    ${({ isShowing }) =>
      isShowing
        ? `
      opacity: 13;
      width: 600px;
  `
        : `opacity: 0; width: 10vw;`}
  }

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

const CloseContainer = styled.div`
  position: relative;
  height: 50px;
  & > button {
    position: absolute;
    top: 0;
    right: 0;
    margin: 20px;
    height: 25px;
  }
`;
const ColumnDiv = styled.div`
  width: 90%;
  display: flex;
  flex-flow: column nowrap;
  padding: 10px;
  align-items: flex-start;
  h1 {
    font-size: 25px;
  }
`;

const RowDiv = styled.div`
  width: 90%;
  position: relative;
  display: flex;
  flex-flow: row no-wrap;
  align-items: center;
  justify-content: flex-start;
`;

const MediaContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const MenuImage = styled.div`
  width: 120px;
  height: 120px;
  margin: 10px 10px 10px 30px;
  margin-bottom: 0px;
  filter: drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.25));
  border-radius: 100px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) =>
    props.src ||
    "https://usra-quantum.s3.amazonaws.com/assets/images/user-avatar-icon.png"});

  &:hover,
  &:focus {
    border: 2px solid ${colors.WHITE};
    outline: none;
  }
`;

const UserNameMenu = styled.div`
  font-size: 30px;
  font-weight: bold;

  &:hover,
  &:focus {
    text-decoration: underline;
    outline: none;
  }
`;

const FullName = styled.div`
  font-size: 16px;
  font-weight: thin;
  color: ${colors.SMOOTH};

  &:hover,
  &:focus {
    text-decoration: underline;
    outline: none;
  }
`;

export {
  Background,
  Back,
  ColumnDiv,
  RowDiv,
  MenuImage,
  UserNameMenu,
  CloseContainer,
  FullName,
  MediaContainer,
};
