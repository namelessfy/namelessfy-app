import styled from "styled-components";
import * as colors from "../../styles/colors";

const SongsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  width: min(1000px, 100vw);
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 10rem;
  padding: 0 1rem;

  & > div + div {
    margin-left: 1.5rem;
  }

  & >div:nth-child(5n + 1){
    margin-left: 0rem;
  }

  @media (max-width: 1000px) {
    justify-content: flex-start;
    padding: 0 2.75rem;
  }
  @media (max-width: 800px) {
    padding: 0 2rem;
    width: fit-content;
    & >div:nth-child(5n + 1){
      margin-left: 1.5rem;
    }
    & >div:nth-child(4n + 1){
      margin-left: 0rem;
    }
  }
  @media (max-width: 620px) {
    & > div + div {
      margin-left: 1rem;
    }
    & >div:nth-child(5n + 1){
      margin-left: 1rem;
    }
    & >div:nth-child(4n + 1){
      margin-left: 0rem;
    }

  }
  @media (max-width: 500px) {
    padding: 0 1rem;
    & > div + div {
      margin-left: 0.5rem;
    }
    & >div:nth-child(5n + 1){
      margin-left: 0.5rem;
    }
    & >div:nth-child(4n + 1){
      margin-left: 0rem;
    }
  }
  @media (max-width: 350px) {
    & >div:nth-child(4n + 1){
      margin-left: 0.5rem;
    }
    & >div:nth-child(3n + 1){
      margin-left: 0rem;
    }
`;

const TitleContainer = styled.div`
  width: min(1000px, 100vw);
  padding: 2rem 2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;
const Title = styled.h1`
  max-width: calc(100% - 80px);
  font-size: 36px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    font-size: 30px;
    max-width: calc(100% - 70px);
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;
const ToggleContainer = styled.div`
  width: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 480px) {
    width: 70px;
  }
`;

const Separation = styled.hr`
  width: min(1000px, 100vw - 2rem);
  margin: 0 auto;
`;

const Thumbnail = styled.div`
  border-radius: 10px;
  padding: min(40%, 150px);
  margin: 2em 0 1rem;
  background-size: cover;
  background-position: center;
  box-shadow: 2px 2px 5px #0008;
  background-image: url(${(props) =>
    props.src ||
    "https://i.pinimg.com/originals/ee/87/15/ee871547fa4b959307a8776cd61aad6d.jpg"});
`;

const Author = styled.div`
  width: fit-content;
  margin: 0 auto;
  & > a {
    color: ${colors.LIGHT};
    font-size: 1.1em;
  }
`;

const PlaylistInfo = styled.div`
  margin: 1rem auto;
  width: min(80%, 300px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export {
  SongsContainer,
  TitleContainer,
  Title,
  ToggleContainer,
  Separation,
  Thumbnail,
  Author,
  PlaylistInfo,
};
