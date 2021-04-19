import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

// import "./SignUp.scss";

import Header from "../../components/Header";
import * as ROUTES from "../../routes";
import { Wrapper } from "../styledComponentsConfig/config";
import { SocialButton, Form, LoginButton, Input } from "../Login/LoginStyled";

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
      <main className="SignUp">
        <Wrapper>
          <Header />
          <section className="Login__wrapper">
            <h1 className="text-2xl font-bold mb-6">SignUp</h1>
            <hr className="my-4" />
            <SocialButton
              // className="btn btn-primary w-full"
              type="button"
              onClick={handleLoginWithGoogle}
              disabled={isSigningUp}
            >
              SignUp with Google
            </SocialButton>
            <hr className="mt-1 mb-4" />
            <Form onSubmit={handleSubmit}>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Input
                type="text"
                id="email"
                className="form-input"
                value={email}
                onChange={handleSetEmail}
              />
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <Input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={handleSetPassword}
              />
              <LoginButton
                className="btn btn-primary w-full"
                type="submit"
                disabled={isSigningUp}
              >
                Sign Up
              </LoginButton>
            </Form>
            {signUpError && <section className="mt-4">{signUpError}</section>}
            <section className="mt-4">
              <hr className="mt-1 mb-4" />
              <Link
                to={ROUTES.RESET_PASSWORD}
                className="underline text-blue-gray-200 w-full text-center block"
              >
                Reset password
              </Link>
            </section>
          </section>
        </Wrapper>
      </main>
    </>
  );
}

export default SignUp;
