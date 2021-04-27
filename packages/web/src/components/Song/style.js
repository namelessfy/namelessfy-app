import styled from "styled-components";
import * as colors from "../../styles/colors";
import playIcon from "../../img/play.svg";

const calculateContainerWidht = "calc(calc(1000px - 8rem) / 5)";
const calculateContainerWidht5SongsResponsive = "calc(calc(100vw - 12rem) / 5)";
const calculateContainerWidht4SongsResponsiveBig =
  "calc(calc(100vw - 8.5rem) / 4)";
const calculateContainerWidht4SongsResponsiveNormal =
  "calc(calc(100vw - 7rem) / 4)";
const calculateContainerWidht4SongsResponsiveSmall =
  "calc(calc(100vw - 3.5rem) / 4)";
const calculateContainerWidht3SongsResponsive = "calc(calc(100vw - 3rem) / 3)";

const SongCover = styled.button`
  display: inline-block;
  position: relative;
  border-radius: 10px;
  width: ${calculateContainerWidht5SongsResponsive};
  height: ${calculateContainerWidht5SongsResponsive};
  margin: 1em 0;
  align-self: center;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  box-shadow: 2px 2px 5px #0008;
  cursor: pointer;
  transition: box-shadow 0.1s ease-in-out;

  &::before {
    content: "";
    background: url("${playIcon}");
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 2;
    position: absolute;
    display: block;
    height: 40px;
    width: 40px;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  &::after {
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

  &:hover,
  &:focus {
    outline: none;
    box-shadow: 0px 0px 0 2px ${colors.WHITE};
  }

  @media (min-width: 1000px) {
    width: ${calculateContainerWidht};
    height: ${calculateContainerWidht};
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

  @media (max-width: 800px) {
    width: ${calculateContainerWidht4SongsResponsiveBig};
    height: ${calculateContainerWidht4SongsResponsiveBig};
  }
  @media (max-width: 620px) {
    width: ${calculateContainerWidht4SongsResponsiveNormal};
    height: ${calculateContainerWidht4SongsResponsiveNormal};
  }
  @media (max-width: 500px) {
    width: ${calculateContainerWidht4SongsResponsiveSmall};
    height: ${calculateContainerWidht4SongsResponsiveSmall};
  }
  @media (max-width: 350px) {
    width: ${calculateContainerWidht3SongsResponsive};
    height: ${calculateContainerWidht3SongsResponsive};
  }
`;

const SongTitle = styled.h3`
  font-size: 18px;
  margin: -0.5rem 0 0;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 620px) {
    font-size: medium;
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
  font-size: 16px;
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

    @media (max-width: 620px) {
      font-size: medium;
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
  width: ${calculateContainerWidht};
  @media (max-width: 1000px) {
    width: ${calculateContainerWidht5SongsResponsive};
  }
  @media (max-width: 800px) {
    width: ${calculateContainerWidht4SongsResponsiveBig};
  }
  @media (max-width: 620px) {
    width: ${calculateContainerWidht4SongsResponsiveNormal};
  }
  @media (max-width: 500px) {
    width: ${calculateContainerWidht4SongsResponsiveSmall};
  }
  @media (max-width: 350px) {
    width: ${calculateContainerWidht3SongsResponsive};
  }
`;

const BottomContainer = styled.div`
  width: 100%;
  padding: 0 0.2rem;
  margin-left: 0.2rem;
  display: flex;
  align-items: start;
  @media (max-width: 620px) {
    & #dialogueButton {
      display: none;
    }
  }
`;

const InfoContainer = styled.div`
  width: calc(100% - 20px);
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
