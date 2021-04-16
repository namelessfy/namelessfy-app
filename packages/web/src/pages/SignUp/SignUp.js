import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import {
  Input,
  Label,
  Form,
  Button,
  Title,
  Separation,
  ForgotPassword,
  Login,
  Error,
  NamelessfyLogo
} from "./styles";

import namelessfyLogo from "../../img/namelessfyLogo.svg";

import { Main } from "../../styles/mainStyles";

import * as ROUTES from "../../routes";

import {
  resetAuthState,
  signUpWithEmailRequest,
  signUpWithGoogleRequest,
} from "../../redux/auth/auth-actions";

import { authSelector } from "../../redux/auth/auth-selectors";

function SignUp() {
  const dispatch = useDispatch();
  const { isSigningUp, signUpError, isAuthenticated } = useSelector(
    authSelector,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    dispatch(signUpWithGoogleRequest());
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(signUpWithEmailRequest(email, password));

    setEmail("");
    setPassword("");
  }

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }

  function handleSetPassword(e) {
    setPassword(e.target.value);
  }

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <>
      <Main>
        <section>
          <NamelessfyLogo type="svg" src={namelessfyLogo} alt="Namelessfy logo"/>
          <Title>Sign Up</Title>
          <Separation />
          <Form>
            <Button
              type="button"
              onClick={handleLoginWithGoogle}
              disabled={isSigningUp}
            >
              Sign up with Google
            </Button>
          </Form>
          <Separation />
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              id="email"
              value={email}
              onChange={handleSetEmail}
            />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={handleSetPassword}
            />
            <ForgotPassword>
              {" "}
              Forgot your password?
              <div>
                <Link to={ROUTES.RESET_PASSWORD}>Reset password</Link>
              </div>
            </ForgotPassword>
            <Button type="submit" disabled={isSigningUp}>
              Sign up
            </Button>
            {signUpError && <Error>Error: {signUpError}</Error>}
          </Form>

          <section>
            <Separation />
            <Login>
              Alredy have an account?
              <div>
                <Link to={ROUTES.RESET_PASSWORD}>Log in</Link>
              </div>
            </Login>
          </section>
        </section>
      </Main>
    </>
  );
}

export default SignUp;
