import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "../../components/Loader";

import * as ROUTES from "../../routes";

import {
  sendPasswordResetEmail,
  resetAuthState,
} from "../../redux/auth/auth-actions";
import { authSelector } from "../../redux/auth/auth-selectors";

import {
  Button,
  Error,
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

function buttonText(loading, sent) {
  if (loading) {
    return "Sending...";
  }

  if (sent) {
    return "Email Sent!";
  }

  return "Send password reset email";
}

function ResetPassword() {
  const dispatch = useDispatch();
  const {
    isSendingPasswordReset,
    passwordResetError,
    passwordResetSent,
  } = useSelector(authSelector);

  const [email, setEmail] = useState("");

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(sendPasswordResetEmail(email));
    setEmail("");
  }

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }

  return (
    <>
      {isSendingPasswordReset && <Loader />}
      <Main>
        <section>
          <NamelessfyLogo
            type="svg"
            src={namelessfyLogo}
            alt="Namelessfy logo"
          />
          <Title>Password Reset</Title>
          <Separation />
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              id="email"
              value={email}
              onChange={handleSetEmail}
            />
            <Button
              type="submit"
              disabled={isSendingPasswordReset || passwordResetSent}
            >
              {buttonText(isSendingPasswordReset, passwordResetSent)}
            </Button>
          </Form>
          {passwordResetError && (
            <Error className="mt-4">{passwordResetError}</Error>
          )}
          <Separation />
          <RedirectMessage>
            First time here?
            <div>
              <Link to={ROUTES.SIGN_UP}>Sign up</Link>
            </div>
          </RedirectMessage>
          <RedirectMessage>
            Alredy have an account?
            <div>
              <Link to={ROUTES.LOGIN}>Log in</Link>
            </div>
          </RedirectMessage>
        </section>
      </Main>
    </>
  );
}

export default ResetPassword;
