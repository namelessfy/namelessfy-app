import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import Loader from "../../components/Loader";

import * as ROUTES from "../../routes";

import {
  resetAuthState,
  signUpWithGoogleRequest,
  signInWithEmailRequest,
} from "../../redux/auth/auth-actions";
import { authSelector } from "../../redux/auth/auth-selectors";

import {
  Button,
  Error,
  ErrorInput,
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

function Login() {
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

  function handleLoginWithEmailAndPassword(email, password) {
    dispatch(signInWithEmailRequest(email, password));
  }

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <>
      {isSigningUp && <Loader />}
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

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Invalid email addresss")
                .required("Email is required"),
              password: Yup.string()
                .required("Password is required")
                .min(6, "Password must contain at least 6 characters"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                handleLoginWithEmailAndPassword(values.email, values.password);
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
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                      /* isSubmitting(false); */
                    }}
                  >
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
                    <ForgotPassword>
                      {" "}
                      Forgot your password?
                      <div>
                        <Link to={ROUTES.RESET_PASSWORD}>Reset password</Link>
                      </div>
                    </ForgotPassword>
                    {errors.password && touched.password && (
                      <ErrorInput>{errors.password}</ErrorInput>
                    )}
                    <Button type="submit">
                      {isSubmitting ? `Submiting...` : `Login`}
                    </Button>
                    {signUpError && <Error>Error: {signUpError}</Error>}
                  </Form>
                </>
              );
            }}
          </Formik>
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
