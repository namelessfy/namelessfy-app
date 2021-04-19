import React from "react";
import styled from "styled-components";

const WrapperHeader = styled.div`
  background: linear-gradient(127.21deg, #182628 0%, #0c1314 99.51%);
  margin: auto;
  padding: auto;
  * {
    padding: 5px;
    text-align: center;
  }
`;

const StyledLogin = () => {
  return (
    <>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <h1> Log in to Browse Music </h1>
          <Input
            type="text"
            id="email"
            placeholder="Insert your email or username"
            value={email}
            onChange={handleSetEmail}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleSetPassword}
          />
          <RowDiv>
            <h6>Remember me</h6>
            <button type="button">Yes/No</button>
          </RowDiv>

          <LoginButton> Login </LoginButton>
        </Form>

        <hr />

        <ColumnDiv>
          <SocialButton> Continue with Facebook</SocialButton>
          <SocialButton
            type="button"
            onClick={handleLoginWithGoogle}
            disabled={isSigningUp}
          >
            {" "}
            Continue with Google
          </SocialButton>
          <SocialButton> Continue with Apple</SocialButton>
        </ColumnDiv>

        <ColumnDiv>Hi</ColumnDiv>
      </Wrapper>
    </>
  );
};

export default StyledLogin;
