import styled from "styled-components";
import * as colors from "../../styles/colors";

const calculateContainerWidht = "calc(calc(1000px - 8rem) / 5)";
const calculateContainerWidht5PlaylistsResponsive =
  "calc(calc(100vw - 12rem) / 5)";
const calculateContainerWidht4PlaylistsResponsiveBig =
  "calc(calc(100vw - 8.5rem) / 4)";
const calculateContainerWidht4PlaylistsResponsiveNormal =
  "calc(calc(100vw - 7rem) / 4)";
const calculateContainerWidht3PlaylistsResponsive =
  "calc(calc(100vw - 3rem) / 3)";

const PlaylistCover = styled.button`
  display: inline-block;
  position: relative;
  border-radius: 10px;
  width: ${calculateContainerWidht5PlaylistsResponsive};
  height: ${calculateContainerWidht5PlaylistsResponsive};
  margin-bottom: 1em;
  align-self: center;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  box-shadow: 2px 2px 5px #0008;
  cursor: pointer;
  transition: box-shadow 0.1s ease-in-out;

  &:hover,
  &:focus {
    outline: none;
    box-shadow: inset 0px 0px 0 2px ${colors.WHITE};
  }

  @media (min-width: 1000px) {
    width: ${calculateContainerWidht};
    height: ${calculateContainerWidht};
    &:focus {
      outline: none;
    }
  }

  @media (max-width: 800px) {
    width: ${calculateContainerWidht4PlaylistsResponsiveBig};
    height: ${calculateContainerWidht4PlaylistsResponsiveBig};
  }
  @media (max-width: 620px) {
    width: ${calculateContainerWidht4PlaylistsResponsiveNormal};
    height: ${calculateContainerWidht4PlaylistsResponsiveNormal};
  }
  @media (max-width: 500px) {
    width: ${calculateContainerWidht3PlaylistsResponsive};
    height: ${calculateContainerWidht3PlaylistsResponsive};
  }
`;

const PlaylistTitle = styled.h3`
  font-size: 18px;
  font-weight: 400;
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

const PlaylistContainer = styled.div`
  width: ${calculateContainerWidht};
  margin-top: 1.5rem;

  @media (max-width: 1000px) {
    width: ${calculateContainerWidht5PlaylistsResponsive};
  }
  @media (max-width: 800px) {
    width: ${calculateContainerWidht4PlaylistsResponsiveBig};
  }
  @media (max-width: 620px) {
    width: ${calculateContainerWidht4PlaylistsResponsiveNormal};
  }
  @media (max-width: 500px) {
    width: ${calculateContainerWidht3PlaylistsResponsive};
  }
`;

const BottomContainer = styled.div`
  width: 100%;
  padding: 0 0.2rem;
  margin-top: -0.4rem;
  margin-left: 0.2rem;
  display: flex;
  align-items: center;
  @media (max-width: 620px) {
    & #dialogueButton {
      display: none;
    }
  }
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 20px);
  @media (max-width: 620px) {
    width: 100%;
  }
`;

export {
  PlaylistCover,
  PlaylistTitle,
  PlaylistContainer,
  BottomContainer,
  InfoContainer,
};
