import styled from "styled-components";
import * as colors from "../../styles/colors";

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 0 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  & > div + div {
    margin-left: 1.5rem;
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
`;

const Buttons = styled.div`
  width: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export { Container, Title, TitleContainer, Buttons };
