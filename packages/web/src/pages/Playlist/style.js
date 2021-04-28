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

export { SongsContainer };
