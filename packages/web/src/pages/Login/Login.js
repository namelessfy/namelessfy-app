import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

// import "./Login.scss";

import Header from "../../components/Header";
import * as ROUTES from "../../routes";
import {
  ColumnDiv,
  RowDiv,
  Form,
  Input,
  LoginButton,
  SocialButton,
} from "./LoginStyled";

import {
  resetAuthState,
  signInWithEmailRequest,
  signUpWithGoogleRequest,
} from "../../redux/auth/auth-actions";

import { authSelector } from "../../redux/auth/auth-selectors";
import { Logo, Wrapper } from "../styledComponentsConfig/config";

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
      <Header />
      <Wrapper>
        <Logo />
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

          <LoginButton type="submit" disabled={isSigningUp}>
            Login
          </LoginButton>
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

        <section className="mt-4">
          <hr className="mt-1 mb-4" />
          <Link
            to={ROUTES.RESET_PASSWORD}
            className="underline text-blue-gray-200 w-full text-center block"
          >
            Reset password
          </Link>{" "}
        </section>
      </Wrapper>
    </>
  );
  // return (
  //   <>
  //     <main className="Login">
  //       <Header />
  //       <section className="Login__wrapper">
  //         <h1 className="text-2xl font-bold mb-6">Login</h1>
  //         <hr className="my-4" />
  //         <button
  //           className="btn btn-primary w-full"
  //           type="button"
  //           onClick={handleLoginWithGoogle}
  //           disabled={isSigningUp}
  //         >
  //           Login with Google
  //         </button>
  //         <hr className="mt-1 mb-4" />
  //         <form onSubmit={handleSubmit}>
  //           <label htmlFor="email" className="form-label">
  //             Email
  //           </label>
  //           <input
  //             type="text"
  //             id="email"
  //             className="form-input"
  //             value={email}
  //             onChange={handleSetEmail}
  //           />
  //           <label htmlFor="password" className="form-label">
  //             Password
  //           </label>
  //           <input
  //             type="password"
  //             id="password"
  //             className="form-input"
  //             value={password}
  //             onChange={handleSetPassword}
  //           />
  //           <button
  //             className="btn btn-primary w-full"
  //             type="submit"
  //             disabled={isSigningUp}
  //           >
  //             Login
  //           </button>
  //         </form>
  //         {signUpError && <section className="mt-4">{signUpError}</section>}
  //         <section className="mt-4">
  //           <hr className="mt-1 mb-4" />
  //           <Link
  //             to={ROUTES.RESET_PASSWORD}
  //             className="underline text-blue-gray-200 w-full text-center block"
  //           >
  //             Reset password
  //           </Link>
  //         </section>
  //       </section>
  //     </main>
  //   </>
  // );

  // return (
  //   <>
  //     <Header />
  //     <StyledLogin />
  //   </>
  // );
}

export default Login;
