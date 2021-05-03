import styled from "styled-components";

const PrivacityContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin: 1rem 0 0 0.5rem;
  & > * + * {
    margin-left: 0.5rem;
    font-size: 16px;
  }
`;

export { PrivacityContainer };
