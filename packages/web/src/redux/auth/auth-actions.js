import api from "../../api";

import * as auth from "../../services/auth";

import * as AuthTypes from "./auth-types";

import { resetUser, setUser } from "../user/user-actions";
import { songReset } from "../song/song-actions";
import { playlistReset } from "../playlist/playlist-actions";
import { resetPlayer } from "../musicPlayer/player-actions";

export const resetStoreAndLogOut = () => ({
  type: AuthTypes.RESET_STORE_AND_LOG_OUT,
});

export const signUpRequest = () => ({
  type: AuthTypes.SIGN_UP_REQUEST,
});

export const signUpError = (message) => ({
  type: AuthTypes.SIGN_UP_ERROR,
  payload: message,
});

export function signUpWithGoogleRequest() {
  return async function signUpThunk(dispatch) {
    dispatch(signUpRequest());
    try {
      await auth.singInWithGoogle();
    } catch (error) {
      dispatch(signUpError(error.message));
    }
  };
}

export function signUpWithEmailRequest(email, password) {
  return async function signUpThunk(dispatch) {
    dispatch(signUpRequest());
    try {
      await auth.singUpWithEmailAndPassword(email, password);
    } catch (error) {
      dispatch(signUpError(error.message));
    }
  };
}

export function signInWithEmailRequest(email, password) {
  return async function signUpThunk(dispatch) {
    dispatch(signUpRequest());
    try {
      await auth.singInWithEmailAndPassword(email, password);
    } catch (error) {
      dispatch(signUpError(error.message));
    }
  };
}

export function syncSignIn() {
  return async function syncSignInThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    const response = await api.signUp({
      Authorization: `Bearer ${token}`,
    });

    if (response.errorMessage) {
      return dispatch(signUpError(response.errorMessage));
    }

    dispatch(setUser(response.data.data));
    return dispatch(signUpSuccess(response.data.data));
  };
}

export const signUpSuccess = (user) => ({
  type: AuthTypes.SIGN_UP_SUCCESS,
  payload: user,
});

export const signOutRequest = () => ({
  type: AuthTypes.SIGN_OUT_REQUEST,
});

export function signOut() {
  return async function signOutThunk(dispatch) {
    dispatch(signOutRequest());

    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    const response = await api.signOut({
      Authorization: `Bearer ${token}`,
    });

    if (response.errorMessage) {
      return dispatch(signOutError(response.errorMessage));
    }

    dispatch(resetUser());
    dispatch(songReset());
    dispatch(playlistReset());
    dispatch(resetPlayer());
    dispatch(resetAuthState());

    auth.signOut();
    return dispatch(signOutSuccess());
  };
}

export const signOutError = (message) => ({
  type: AuthTypes.SIGN_OUT_ERROR,
  payload: message,
});

export const signOutSuccess = () => ({
  type: AuthTypes.SIGN_OUT_SUCCESS,
});

export function sendPasswordResetEmail(email) {
  return async function sendPasswordResetEmailRequestThunk(dispatch) {
    dispatch(sendPasswordResetEmailRequest());
    try {
      await auth.sendPasswordResetEmail(email);
      dispatch(sendPasswordResetEmailSuccess());
    } catch (error) {
      dispatch(sendPasswordResetEmailError(error.message));
    }
    return dispatch(sendPasswordResetEmailSuccess());
  };
}

export const sendPasswordResetEmailRequest = () => ({
  type: AuthTypes.SEND_PASSWORD_RESET_EMAIL_REQUEST,
});

export const sendPasswordResetEmailError = (message) => ({
  type: AuthTypes.SEND_PASSWORD_RESET_EMAIL_ERROR,
  payload: message,
});

export const sendPasswordResetEmailSuccess = () => ({
  type: AuthTypes.SEND_PASSWORD_RESET_EMAIL_SUCCESS,
});

export const resetAuthState = () => ({
  type: AuthTypes.RESET_AUTH_STATE,
});
