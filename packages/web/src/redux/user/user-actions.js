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
