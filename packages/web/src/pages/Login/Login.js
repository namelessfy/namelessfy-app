import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import * as ROUTES from "../../routes";
import {
  Button,
  Error,
  ForgotPassword,
  Form,
  Input,
  Label,
  NamelessfyLogo,
  RedirectMessage,
  Separation,
  Title,
} from "../../styles/formStyles";

import { Main } from "../../styles/mainStyles";

import namelessfyLogo from "../../img/namelessfyLogo.svg";

import {
  resetAuthState,
  signInWithEmailRequest,
  signUpWithGoogleRequest,
} from "../../redux/auth/auth-actions";

import { authSelector } from "../../redux/auth/auth-selectors";

function Login() {
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

    dispatch(signInWithEmailRequest(email, password));

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
          <NamelessfyLogo
            type="svg"
            src={namelessfyLogo}
            alt="Namelessfy logo"
          />
          <Title>Login</Title>
          <Separation />
          <Form>
            <Button
              type="button"
              onClick={handleLoginWithGoogle}
              disabled={isSigningUp}
            >
              Login with Google
            </Button>
          </Form>
          <Separation />
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
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
              Login
            </Button>
          </Form>
          {signUpError && <Error>{signUpError}</Error>}
          <Separation />
          <RedirectMessage>
            First time here?
            <div>
              <Link to={ROUTES.SIGN_UP}>Sign up</Link>
            </div>
          </RedirectMessage>
        </section>
      </Main>
    </>
  );
}

export default Login;
