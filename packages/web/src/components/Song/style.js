import styled from "styled-components";
import * as colors from "../../styles/colors";
import playIcon from "../../img/play.svg";

const calculateContainerWidth = "calc(calc(1000px - 8rem) / 5)";
const calculateContainerWidth5SongsResponsive = "calc(calc(100vw - 12rem) / 5)";
const calculateContainerWidth4SongsResponsiveBig =
  "calc(calc(100vw - 8.5rem) / 4)";
const calculateContainerWidth4SongsResponsiveNormal =
  "calc(calc(100vw - 7rem) / 4)";
const calculateContainerWidth4SongsResponsiveSmall =
  "calc(calc(100vw - 3.5rem) / 4)";
const calculateContainerWidth3SongsResponsive = "calc(calc(100vw - 3rem) / 3)";

const containerWidthMenu = "120px";

const SongCover = styled.button`
  display: inline-block;
  position: relative;
  border-radius: 10px;
  width: ${calculateContainerWidth5SongsResponsive};
  height: ${calculateContainerWidth5SongsResponsive};
  margin-bottom: 1em;
  align-self: center;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  /* box-shadow: 2px 2px 5px #0008; */
  cursor: pointer;
  transition: box-shadow 0.1s ease-in-out;

  &::after {
    content: "";
    background: url("${playIcon}");
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 1;
    position: absolute;
    display: block;
    height: 40px;
    width: 40px;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  &::before {
    content: "";
    z-index: 1;
    background: radial-gradient(
      circle,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    position: absolute;
    display: block;
    height: 100%;
    width: 100%;
    border-radius: 10px;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  ${({ isMenu }) =>
    isMenu
      ? `width: ${containerWidthMenu};
    height: ${containerWidthMenu};`
      : `
      @media (min-width: 1000px) {
        width: ${calculateContainerWidth};
        height: ${calculateContainerWidth};
      }
      @media (max-width: 800px) {
      width: ${calculateContainerWidth4SongsResponsiveBig};
      height: ${calculateContainerWidth4SongsResponsiveBig};
    }
    @media (max-width: 620px) {
      width: ${calculateContainerWidth4SongsResponsiveNormal};
      height: ${calculateContainerWidth4SongsResponsiveNormal};
    }
    @media (max-width: 500px) {
      width: ${calculateContainerWidth3SongsResponsive};
      height: ${calculateContainerWidth3SongsResponsive};
    }`}

  &:hover,
  &:focus {
    outline: none;
    box-shadow: inset 0px 0px 0 2px ${colors.WHITE};
  }

  @media (min-width: 1000px) {
    &:hover {
      &::before,
      &::after {
        opacity: 1;
      }
    }
    &:focus {
      outline: none;
      &::before,
      &::after {
        opacity: 0;
      }
    }
  }
`;

const SongTitle = styled.h3`
  ${({ isMenu }) => (isMenu ? `font-size: small;` : `font-size: 14px;`)}
  margin: 0;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 620px) {
    font-size: 14px;
  }

  @media (max-width: 500px) {
    font-size: small;
  }

  &:hover,
  &:focus {
    outline: none;
    text-decoration: underline;
  }
`;

const SongArtists = styled.div`
  font-weight: 200;
  width: 100%;
  margin: -0.2rem 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  & > a {
    color: ${colors.LIGHT};
    cursor: pointer;
    margin-top: 0.5em;
    ${({ isMenu }) => (isMenu ? `font-size: small;` : `font-size: 14px;`)}

    @media (max-width: 620px) {
      font-size: 14px;
    }

    @media (max-width: 500px) {
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
  }
`;

const SongContainer = styled.div`
  width: ${calculateContainerWidth};
  padding-bottom: 0.5rem;
  margin: 1.5rem 0 0;
  border-radius: 10px;

  ${({ isMenu }) =>
    isMenu
      ? `width: ${containerWidthMenu};
    height: ${containerWidthMenu};`
      : `@media (max-width: 1000px) {
        width: ${calculateContainerWidth5SongsResponsive};
      }
      @media (max-width: 800px) {
        width: ${calculateContainerWidth4SongsResponsiveBig};
      }
      @media (max-width: 620px) {
        width: ${calculateContainerWidth4SongsResponsiveNormal};
      }
      @media (max-width: 500px) {
        width: ${calculateContainerWidth3SongsResponsive};
      }
      @media (max-width: 350px) {
        width: ${calculateContainerWidth3SongsResponsive};
      }`}
`;

const BottomContainer = styled.div`
  width: 100%;
  margin-left: 0.2rem;
  display: flex;
  align-items: center;
  margin-top: -0.5rem;

  ${({ isMenu }) =>
    isMenu &&
    `&>#dialogueButton {
    display: none;
  }`}

  @media (max-width: 620px) {
    padding: 0;
    & #dialogueButton {
      display: none;
    }
  }
`;

const InfoContainer = styled.div`
  padding: 0 0.5rem;
  ${({ isMenu }) => {
    return isMenu
      ? `width: calc(100% - 0.5rem);`
      : `width: calc(calc(100% - 20px) - 0.5rem);`;
  }}

  @media (max-width: 620px) {
    width: 100%;
  }
`;

export {
  SongCover,
  SongTitle,
  SongArtists,
  SongContainer,
  BottomContainer,
  InfoContainer,
};
