import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ResetPassword.scss";

import Header from "../../components/Header";

import {
  sendPasswordResetEmail,
  resetAuthState,
} from "../../redux/auth/auth-actions";
import { authSelector } from "../../redux/auth/auth-selectors";
import { Form, Input, LoginButton } from "../Login/LoginStyled";
import { ResetButton } from "./ResetStyled";
import { Wrapper } from "../styledComponentsConfig/config";

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
      <main className="ResetPassword">
        <Header />
        <Wrapper className="Login__wrapper">
          <h1 className="text-2xl font-bold mb-6">Password Reset</h1>
          <hr className="my-4" />
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
            <ResetButton
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSendingPasswordReset || passwordResetSent}
            >
              {buttonText(isSendingPasswordReset, passwordResetSent)}
            </ResetButton>
          </Form>
          {passwordResetError && (
            <section className="mt-4">{passwordResetError}</section>
          )}
        </Wrapper>
      </main>
    </>
  );
}

export default ResetPassword;
