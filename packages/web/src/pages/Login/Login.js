import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
/* import * as Yup from "yup"; */

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

/* import { Formik, Form, MyTextInput } from "../../utils/utils"; */

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

          {/* <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email addresss`")
                .required("Required"),
              password: Yup.string()
                .password("Incorrect password")
                .required("Required"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              await new Promise((r) => setTimeout(r, 500));
              setSubmitting(false);
            }}
          >
            <Form>
              <MyTextInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="jane@formik.com"
              />
              <MyTextInput
                label="Password"
                name="password"
                type="password"
                placeholder="*******"
              />
              <button type="submit">Login</button>
            </Form>
          </Formik> */}

          {signUpError && <Error>{signUpError}</Error>}
          <RedirectMessage>
            <hr />
            <Link to={ROUTES.RESET_PASSWORD}>Reset password</Link>
          </RedirectMessage>
        </section>
      </Main>
    </>
  );
}

export default Login;
