import * as UserTypes from "./user-types";
import api from "../../api";
import * as auth from "../../services/auth";

export function editUser(formData) {
  return async function editUserThunk(dispatch) {
    dispatch(editUserRequest());
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return dispatch(editUserError("Error Getting the token"));
    }

    const response = await api.editUser(
      {
        Authorization: `Bearer ${token}`,
      },
      formData,
    );

    if (response.errorMessage) {
      return dispatch(editUserError(response.errorMessage));
    }
    return dispatch(editUserSuccess(response.data));
  };
}

export const editUserRequest = () => ({
  type: UserTypes.EDIT_USER_REQUEST,
});

export const editUserError = (message) => ({
  type: UserTypes.EDIT_USER_ERROR,
  payload: message,
});

export const editUserSuccess = (user) => ({
  type: UserTypes.EDIT_USER_SUCCESS,
  payload: user,
});

export const setUser = (user) => ({
  type: UserTypes.SET_USER,
  payload: user,
});

export const getFavorites = () => {
  return async function getFavoritesThunk(dispatch) {
    dispatch(getFavoritesRequest());
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return dispatch(getFavoritesError("Error Getting the token"));
    }

    const response = await api.getFavorites({
      Authorization: `Bearer ${token}`,
    });

    if (response.errorMessage) {
      return dispatch(getFavoritesError(response.errorMessage));
    }

    return dispatch(getFavoritesSuccess(response.data.data));
  };
};

export const getFavoritesRequest = () => ({
  type: UserTypes.SET_FAVORITES_REQUEST,
});

export const getFavoritesError = (error) => ({
  type: UserTypes.SET_FAVORITES_ERROR,
  payload: error,
});

export const getFavoritesSuccess = (favorites) => ({
  type: UserTypes.SET_FAVORITES_SUCCESS,
  payload: favorites,
});

export const likeSong = (trackId) => {
  return async function likeSongThunk(dispatch) {
    dispatch(likeSongRequest());
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return dispatch(likeSongError("Error Getting the token"));
    }

    const response = await api.likeSong(
      {
        Authorization: `Bearer ${token}`,
      },
      trackId,
    );

    if (response.errorMessage) {
      return dispatch(likeSongError(response.errorMessage));
    }

    return dispatch(likeSongSuccess(response.data.data));
  };
};

export const likeSongRequest = () => ({
  type: UserTypes.LIKE_REQUEST,
});

export const likeSongError = (error) => ({
  type: UserTypes.LIKE_ERROR,
  payload: error,
});

export const likeSongSuccess = (song) => ({
  type: UserTypes.LIKE_SUCCESS,
  payload: song,
});

export const dislikeSong = (trackId) => {
  return async function dislikeSongThunk(dispatch) {
    dispatch(dislikeSongRequest());
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return dispatch(dislikeSongError("Error Getting the token"));
    }

    const response = await api.dislikeSong(
      {
        Authorization: `Bearer ${token}`,
      },
      trackId,
    );

    if (response.errorMessage) {
      return dispatch(dislikeSongError(response.errorMessage));
    }

    return dispatch(dislikeSongSuccess(response.data.data));
  };
};

export const dislikeSongRequest = () => ({
  type: UserTypes.DISLIKE_REQUEST,
});

export const dislikeSongError = (error) => ({
  type: UserTypes.DISLIKE_ERROR,
  payload: error,
});

export const dislikeSongSuccess = (song) => ({
  type: UserTypes.DISLIKE_SUCCESS,
  payload: song,
});

export const getMySongs = () => {
  return async function getMySongsThunk(dispatch) {
    dispatch(getMySongsRequest());
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return dispatch(getMySongsError("Error Getting the token"));
    }

    const response = await api.getSongs({
      Authorization: `Bearer ${token}`,
    });

    if (response.errorMessage) {
      return dispatch(getMySongsError(response.errorMessage));
    }

    return dispatch(getMySongsSuccess(response.data.data));
  };
};

export const getMySongsRequest = () => ({
  type: UserTypes.GET_MYSONGS_REQUEST,
});

export const getMySongsError = (error) => ({
  type: UserTypes.GET_MYSONGS_ERROR,
  payload: error,
});

export const getMySongsSuccess = (mySongs) => ({
  type: UserTypes.GET_MYSONGS_SUCCESS,
  payload: mySongs,
});

export const resetUser = () => ({
  type: UserTypes.RESET_USER,
});
