import styled from "styled-components";

const Container = styled.section`
  width: 1000px;

  @media (max-width: 1000px) {
    width: calc(100vw - 4rem);
    margin: 0 2rem;
  }
  @media (max-width: 500px) {
    width: calc(100vw - 2rem);
    margin: 0 1rem;
  }
`;
const SongsContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 0 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  & > div + div {
    margin-left: 1.5rem;
  }
  @media (max-width: 800px) {
    padding: 2px;
  }
  @media (max-width: 620px) {
    & > div + div {
      margin-left: 1rem;
    }
  }
  @media (max-width: 500px) {
    & > div + div {
      margin-left: 0.5rem;
    }
  }
`;

const Title = styled.h2`
  font-size: 30px;
`;

const TitleContainer = styled.div`
  margin-top: 2rem;
  padding: 0 1rem;
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
