/* import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import {
  Button,
  Error,
  ErrorInput,
  Form,
  Input,
  Label,
  NamelessfyLogo,
  RedirectMessage,
  Separation,
  Title,
} from "../../styles/formStyles";

import namelessfyLogo from "../../img/namelessfyLogo.svg";

import { Main } from "../../styles/mainStyles";

import * as ROUTES from "../../routes";

import {
  resetAuthState,
  signUpWithGoogleRequest,
} from "../../redux/auth/auth-actions";

import { authSelector } from "../../redux/auth/auth-selectors";

function SignUp() {
  const dispatch = useDispatch();
  const { isSigningUp, signUpError, isAuthenticated } = useSelector(
    authSelector,
  );

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    dispatch(signUpWithGoogleRequest());
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

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Invalid email addresss")
                .required("Email is a required"),
              password: Yup.string()
                .required("Password is required")
                .min(6, 'Password must contain at least 6 characters')
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  console.log(values);
                  setSubmitting(false);
                }, 500);
            }}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              handleSubmit,
              handleChange,
              handleBlur,
            }) => {
              return (
                <>
                { JSON.stringify(errors, null, 2)}
                  <Form onSubmit={() => {
                    handleSubmit();
                    isSubmitting(false);
                  }}>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={touched.email && !errors.email}
                      error={errors.email && touched.email && "error"}
                    />
                    {errors.email && touched.email && (
                      <ErrorInput>{errors.email}</ErrorInput>
                    )}

                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      valid={touched.password && !errors.password}
                      error={errors.password && touched.password && "error"}
                    />
                    {errors.password && touched.password && (
                      <ErrorInput>{errors.password}</ErrorInput>
                    )}

                    <Button type="submit" disabled={isSubmitting}>
                      Sign up
                    </Button>
                    {signUpError && <Error>Error: {signUpError}</Error>}
                  </Form>
                </>
              );
            }}
          </Formik>

          <section>
            <Separation />
            <RedirectMessage>
              Already have an account?
              <div>
                <Link to={ROUTES.LOGIN}>Log in</Link>
              </div>
            </RedirectMessage>
          </section>
        </section>
      </Main>
    </>
  );
}

export default SignUp; */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

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
          <NamelessfyLogo
            type="svg"
            src={namelessfyLogo}
            alt="Namelessfy logo"
          />
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
            <Button type="submit" disabled={isSigningUp}>
              Sign up
            </Button>
            {signUpError && <Error>Error: {signUpError}</Error>}
          </Form>

          <section>
            <Separation />
            <RedirectMessage>
              Alredy have an account?
              <div>
                <Link to={ROUTES.LOGIN}>Log in</Link>
              </div>
            </RedirectMessage>
          </section>
        </section>
      </Main>
    </>
  );
}

export default SignUp;
