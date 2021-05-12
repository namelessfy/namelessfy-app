import styled from "styled-components";

const Container = styled.section`
  width: calc(100vw - 60px);

  @media (min-width: 600px) {
    width: calc(600px - 60px);
  }
`;
const PlaylistsContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 0 10px;

  & > div {
    margin-top: 1rem;
  }
  & > div:first-of-type {
    margin-top: 2rem;
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

export { PlaylistsContainer, Title, TitleContainer, Container };
