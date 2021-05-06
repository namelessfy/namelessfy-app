import styled from "styled-components";
import * as colors from "../../styles/colors";

const Back = styled.section`
  @media (min-width: 650px) {
    position: absolute;
    height: 100vh;
    right: 0;
    top: 0;
    background-color: #0004;
    ${({ isShowing }) =>
      isShowing
        ? `
      opacity: 1;
      width: 100vw;
      z-index: 2;
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
      z-index: 3;
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
      opacity: 1;
      width: 600px;
  `
        : `opacity: 0; width: 10vw;`}
  }
`;

const CloseContainer = styled.div`
  position: relative;
  height: 50px;
  * {
    position: absolute;
    top: 0;
    right: 0;
    margin: 20px;
    height: 25px;
    width: auto;
    &:hover {
      cursor: pointer;
      stroke-width: 25px;
    }
  }
`;
const ColumnDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 10px;
  align-items: center;
  h1 {
    font-size: 25px;
  }
`;

const RowDiv = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
`;

const MediaContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 10px;
  align-items: center;
  margin-top: 60px;
`;

const MenuImage = styled.div`
  width: 150px;
  height: 150px;
  margin: 20px;
  margin-bottom: 0px;
  filter: drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.25));
  border-radius: 100px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.src || "https://usra-quantum.s3.amazonaws.com/assets/images/user-avatar-icon.png"});
`;

const UserNameMenu = styled.div`
  font-size: 45px;
  font-weight: bold;
`;

const FullName = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: ${colors.SMOOTH};
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
