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
    return dispatch(editUserSuccess(response.data.data));
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

export function setUserView(view) {
  return {
    type: UserTypes.SET_USER_VIEW,
    payload: view,
  };
}

export const getUserRequest = () => ({
  type: UserTypes.GET_USER_REQUEST,
});

export const getUserError = (message) => ({
  type: UserTypes.GET_USER_ERROR,
  payload: message,
});

export const getUserSuccess = (user) => ({
  type: UserTypes.GET_USER_SUCCESS,
  payload: user,
});

export function getUser(userName) {
  return async function getUserThunk(dispatch) {
    dispatch(getUserRequest());
    const token = await auth.getCurrentUserToken();
    if (!token) {
      return dispatch(getUserError("Error Getting the token"));
    }

    const response = await api.getUserByUsername(
      {
        Authorization: `Bearer ${token}`,
      },
      userName,
    );

    if (response.errorMessage) {
      return dispatch(getUserError(response.errorMessage));
    }
    return dispatch(getUserSuccess(response.data.data));
  };
}

export const getUserReset = (user) => ({
  type: UserTypes.GET_USER_RESET,
  payload: user,
});

export const resetUser = () => ({
  type: UserTypes.RESET_USER,
});
