import styled from "styled-components";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background: radial-gradient(circle, #1b242b 65px, #1b242b00 100%);

  @media (max-width: 540px) {
    background: radial-gradient(circle, #1b242b 55px, #1b242b00 100%);
  }

  @media (max-width: 375px) {
    background: radial-gradient(circle, #1b242b 45px, #1b242b00 100%);
  }
`;

const Gif = styled.img`
  width: 100px;
  height: 100px;

  @media (max-width: 540px) {
    width: 80px;
    height: 80px;
  }

  @media (max-width: 375px) {
    width: 60px;
    height: 60px;
  }
`;

export { Gif, Background };
