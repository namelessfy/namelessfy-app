import styled from "styled-components";
import * as colors from "../../styles/colors";

const Container = styled.section`
  width: calc(100vw - 60px);

  @media (min-width: 600px) {
    width: calc(600px - 60px);
  }
`;
const SongsContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  padding: 0 10px 60px;
  overflow: hidden;
  overflow-x: auto;

  & > div + div {
    margin-left: 1rem;
  }

  & > div:last-of-type {
    margin-right: 40px;
  }
  ::-webkit-scrollbar {
    height: 5px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
    width: 90%;
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.SMOOTH};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.LIGHT};
  }
`;

const Title = styled.h2`
  font-size: 24px;
`;

const TitleContainer = styled.div`
  margin: 0 10px;
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 800px) {
    padding: 0;
  }
`;

const Buttons = styled.div`
  width: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export { SongsContainer, Title, TitleContainer, Buttons, Container };
